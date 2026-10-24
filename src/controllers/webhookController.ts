import { Request, Response } from 'express';
import { Zap } from '../models/Zap';
import { Octokit } from '@octokit/rest';
import User from '../models/User';
import { Types } from 'mongoose';

export const webhook = async (req: Request, res: Response) => {
  const eventName = req.headers['x-github-event'];
  const payload = req.body;

  //console.log(`webhook hit ${JSON.stringify(payload)}`);
  console.log(`webhook eventName ${eventName}`);
  console.log(`webhook payload.action ${payload.action}`);
  // Verificar si es un PR abierto[cite: 1]
  if (eventName === 'pull_request' && payload.action === 'opened') {
    //const repoName = payload.repository.full_name;
    const repoName = payload.repository.name;
    const prNumber = payload.pull_request.number;
    
    // Buscar Zaps activos configurados para este repositorio
    const zaps = await Zap.find({ 
      isActive: true, 
      'trigger.app': 'github',
      'trigger.event': 'pull_request_opened',
      'trigger.repoName': repoName 
    });

    console.log(`webhook for `);
    for (const zap of zaps) {
      // Recuperar el token del usuario dueño del Zap (omitido en este fragmento por brevedad)
      // Convert string ID to a Mongoose ObjectId
      console.log(`webhook zap.userId ${zap.userId}`);
      const objectId = new Types.ObjectId(zap.userId);
      // Query using _id
      const user = await User.findOne({ _id: objectId }).exec();
      let userToken:string|undefined = "";
      if (!user) {
        res.status(400).send('not user found');
      } else {
        userToken = user?.accessToken; 
      }

      //const userToken = user.accessToken; 
      console.log(`webhook userToken ${userToken}`);
      const octokit = new Octokit({ auth: userToken });
      
      // Acción: Comentar en el PR[cite: 1]
      await octokit.issues.createComment({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        issue_number: prNumber,
        body: zap.action.message || '¡Gracias por abrir este Pull Request!'
      });
    }
  }
  res.status(200).send('Webhook recibido');
};
import { Request, Response } from 'express';
import { Zap } from '../models/Zap';
import { Octokit } from '@octokit/rest';

export const webhook = async (req: Request, res: Response) => {
  const eventName = req.headers['x-github-event'];
  const payload = req.body;

  // Verificar si es un PR abierto[cite: 1]
  if (eventName === 'pull_request' && payload.action === 'opened') {
    const repoName = payload.repository.full_name;
    const prNumber = payload.pull_request.number;
    
    // Buscar Zaps activos configurados para este repositorio
    const zaps = await Zap.find({ 
      isActive: true, 
      'trigger.app': 'github',
      'trigger.event': 'pull_request_opened',
      'trigger.repoName': repoName 
    });

    for (const zap of zaps) {
      // Recuperar el token del usuario dueño del Zap (omitido en este fragmento por brevedad)
      const userToken = "TOKEN_DEL_USUARIO_GUARDADO_EN_BD"; 
      
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
import { Request, Response } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Ruta para iniciar el flujo de GitHub
export const authGithub = (req: Request, res: Response) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=read:user`;
  res.redirect(githubAuthUrl);
};

// Ruta de Callback (GitHub redirige aquí)
export const authCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  
  if (!code) {
    return res.redirect('http://localhost:4200/login/error');
  }

  try {
    // Intercambiar código por Access Token
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    }, { headers: { Accept: 'application/json' } });

    const accessToken = tokenResponse.data.access_token;

    // Obtener información del usuario en GitHub
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const { id, login, avatar_url } = userResponse.data;

    // Buscar o crear usuario en MongoDB
    let user = await User.findOne({ githubId: id.toString() });
    if (!user) {
      user = await User.create({ 
        githubId: id.toString(), 
        username: login, 
        avatarUrl: avatar_url 
      });
    }

    // Generar JWT propio de la aplicación
    const jwtSecret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '8h' });

    // Redirigir al frontend de Angular pasando el token en la URL
    res.redirect(`http://localhost:4200/login/success?token=${token}`);
  } catch (error) {
    console.error('Error en autenticación:', error);
    res.redirect('http://localhost:4200/login/error');
  }
};
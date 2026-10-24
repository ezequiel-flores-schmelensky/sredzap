import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// 1. Define the shape of your expected JWT payload
export interface CustomJwtPayload extends jwt.JwtPayload {
  userId: any;
  // Add other properties stored in your token (e.g., role: string)
}

// 2. Extend the Express Request object globally to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload;
    }
  }
}

// 3. Create the typed middleware
export const authenticateToken = (
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || 'your_secret_key';
    const decoded = jwt.verify(token, secret) as CustomJwtPayload;

    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};
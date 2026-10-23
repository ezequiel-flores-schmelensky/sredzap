import { Request} from 'express';

export interface AuthRequest extends Request {
  isAuthenticated(): boolean;
  user?: {
    profile: {
      id: string;
      [key: string]: any;
    };
    accessToken?: string;
  };
}
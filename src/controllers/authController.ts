import { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

// Route to initiate the GitHub flow
// We request access to the email and repositories
export const authGithub = passport.authenticate('github', { 
  scope: ['user:email', 'repo'], 
  session: false 
});


// Callback route (GitHub redirects here)
// We use an array of middlewares: first Passport, then our final handler
export const authCallback = [
  // 1. Passport handles the 'code', obtains the token from GitHub, and executes the strategy defined in app.ts
  passport.authenticate('github', { 
    session: false, 
    failureRedirect: 'http://localhost:4200/login/error' 
  }),
  
  // 2. If successful, Passport injects the user from the DB into req.user
  (req: Request, res: Response) => {
    // We tell TypeScript that req.user follows the format of our model (it requires an _id)
    const user = req.user as any; 

    // Generate an application-specific JWT
    const jwtSecret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '8h' });

    // Redirect to the Angular frontend, passing the token in the URL (identical to your original code)
    res.redirect(`http://localhost:4200/login/success?token=${token}`);
  }
];

import express from 'express';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './services/db';
import routes from './routes/index';
import User from './models/User';


dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(passport.initialize());
app.use('/api', routes);

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: "http://localhost:3000/api/auth/github/callback"
  },
  async function(accessToken: string, refreshToken: string, profile: any, done: any) {
    try {
    // Extracting avatarUrl
      const avatarUrl = (profile.photos && profile.photos[0] && profile.photos[0].value) 
                        || profile._json?.avatar_url 
                        || '';
      
      const user = await User.findOneAndUpdate(
        { githubId: profile.id }, 
        { 
          githubId: profile.id, 
          username: profile.username, 
          avatarUrl: avatarUrl, 
          accessToken: accessToken 
        },
        { new: true, upsert: true }
      );
      
      // Pass the saved user document so that Passport can attach it to the session.
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Express con TypeScript en puerto ${port}`);
});
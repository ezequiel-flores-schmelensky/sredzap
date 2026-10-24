import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './services/db';
import routes from './routes/index';

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.use('/api', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Express con TypeScript en puerto ${port}`);
});
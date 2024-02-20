import express from 'express';
import taskRoutes from './routes/task.routes.js';
import { connectDatabase } from './database/database.js';
import { config } from 'dotenv';

config();
connectDatabase();
const app = express();
const PORT = process.env['EXPRESS_PORT'] || 3000;

app.set('port', PORT);

app.use(express.json());

app.use('/task', taskRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the application.');
});

export default app;

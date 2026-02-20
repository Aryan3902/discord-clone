import express, { type Request, type Response } from 'express';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;


app.use(express.json());
app.use(cookieParser()); // Add this middleware BEFORE routes

app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
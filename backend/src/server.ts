import 'dotenv/config';
import express from 'express';
import { Request, Response } from 'express';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

app.get('/api', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello from the server! nice' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

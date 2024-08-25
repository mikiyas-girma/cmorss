import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import express from 'express';
import { initSocketIo } from './io.js';
import apiRouter from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

initSocketIo(server)

const app = express();
app.use(express.json());

app.use((err: any, req: any, res: any, next: any) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';


  res.status(statusCode).json({ 
    success: false,
    statusCode,
    message
   });
});

function startServer() {
  mongoose.connect(process.env.MONGODB!).then(()=>{
    console.log("Connected to MongoDB");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err)=>{
    console.log("Connection failed");
    console.log(err);
  });
}

startServer();


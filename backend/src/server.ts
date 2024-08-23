import http from 'http';
import express from 'express';
import { Server } from 'socket.io'
import apiRouter from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
const socket = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', apiRouter);

async function startServer() {
  try {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch(error) {
    console.error('Error starting the server:', error);
  }
}

startServer();

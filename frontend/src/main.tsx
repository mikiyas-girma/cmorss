import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { SocketProvider } from './contexts/SocketContext.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root.tsx';
import App from './App.tsx';
import Login from './routes/Login.tsx';
import Register from './routes/Register.tsx';
import Room from './routes/GameRoom.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/game/:id",
        element: <Room />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </React.StrictMode>,
)

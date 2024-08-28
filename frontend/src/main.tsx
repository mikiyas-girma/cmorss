import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { SocketProvider } from "./contexts/SocketContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root.tsx";
import App from "./App.tsx";
import Login from "./routes/Login.tsx";
import Register from "./routes/Register.tsx";
import Room from "./routes/GameRoom.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import { AppStateProvider } from "./contexts/AppStateContext.tsx";
import JoinRoom from "./routes/JoinRoom.tsx";
import CreateRoom from "./routes/CreateRoom.tsx";
import { GameProvider } from "./contexts/GameContext.tsx";

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
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      { path: "/room/create", element: <CreateRoom /> },
      { path: "/room/join", element: <JoinRoom /> },
      {
        path: "/game/:id",
        element: <Room />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GameProvider>
      <SocketProvider>
        <AppStateProvider>
          <RouterProvider router={router} />
        </AppStateProvider>
      </SocketProvider>
    </GameProvider>
  </React.StrictMode>
);

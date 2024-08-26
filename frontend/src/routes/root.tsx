import { Outlet } from "react-router-dom";
import AppLogo from "../components/common/AppLogo";
import TeamMark from "../components/common/TeamMark";
import { gameLoungeBg, gameSceneBg } from "../assets";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SplashScreen from "../components/SplashScreen";
import AudioPlayer from "../components/feature/AudioPlayer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../components/common/BackButton";

const Root = () => {
  // Set up Loader
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const path = location.pathname;

  const backgroundImage =
    path == "/dashboard" || path.startsWith("/room/")
      ? `url(${gameLoungeBg})`
      : path.includes("/game/") || path.includes("/play/")
      ? `url(${gameSceneBg})`
      : "";

  // Hehe... don't mind me I like the loader
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="py-4 min-h-screen overflow-x-hidden flex flex-col items-center justify-between relative">
      {/* Page Background */}
      <div
        style={{ backgroundImage }}
        className="absolute inset-0 -z-10 sm:bg-cover"
      />
      {/* Dim Background Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 -z-10 bg-black opacity-30" />
      )}

      <SplashScreen loading={loading && path === "/"} />

      <AppLogo className="self-start" size="small" position="left" />
      <AudioPlayer audioSrc="/music.mp3" />
      {/* Page Content */}
      <Outlet />
      <ToastContainer />
      <TeamMark light={!!backgroundImage} />
      <BackButton />
    </div>
  );
};

export default Root;

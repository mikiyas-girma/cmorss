import { Outlet } from 'react-router-dom';
import AppLogo from '../components/common/AppLogo';
import TeamMark from '../components/common/TeamMark';
import { gameLoungeBg, gameSceneBg } from '../assets';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SplashScreen from '../components/SplashScreen';

const Root = () => {
  // Set up Loader
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const path = location.pathname;

  const backgroundImage =
    path == '/dashboard'
      ? `url(${gameLoungeBg})`
      : path.includes('/game/')
      ? `url(${gameSceneBg})`
      : '';

  // Hehe... don't mind me I like the loader
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="py-4 min-h-screen overflow-x-hidden flex flex-col items-center justify-between relative">
      {/* Page Background */}
      <div style={{ backgroundImage }} className="absolute inset-0 -z-10" />
      {/* Dim Background Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 -z-10 bg-black opacity-30" />
      )}

      <SplashScreen loading={loading} />

      {/* Page Content */}

      <AppLogo className="self-start" size="small" position="left" />
      <Outlet />
      <TeamMark light={!!backgroundImage} />
    </div>
  );
};

export default Root;

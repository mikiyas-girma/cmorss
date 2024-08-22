import { Outlet } from 'react-router-dom'
import AppLogo from '../components/common/AppLogo'
import TeamMark from '../components/common/TeamMark'
import { gameLoungeBg, gameSceneBg } from '../assets'
import { useLocation } from 'react-router-dom';

const Root = () => {

  const location = useLocation();
  const path = location.pathname;
  const backgroundImage = path == '/dashboard' ? `url(${gameLoungeBg})` : path.includes('/game/') ? `url(${gameSceneBg})` : '';
  return (
    <div className='p-4 min-h-screen flex flex-col items-center justify-between relative'>

      {/* Page Background */}
      <div style={{ backgroundImage }} className='absolute inset-0 -z-10' />
      {/* Dim Background Overlay */}
      {backgroundImage && <div className="absolute inset-0 -z-10 bg-black opacity-30" />}
      
      {/* Page Content */}
      <AppLogo className='self-start' size='small' position='left' />
      <Outlet />
      <TeamMark light={!!backgroundImage} />
    </div>

  )
}

export default Root
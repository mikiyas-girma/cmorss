import { Outlet } from 'react-router-dom'
import AppLogo from '../components/common/AppLogo'
import TeamMark from '../components/common/TeamMark'
import { gameLoungeBg } from '../assets'
import { useLocation } from 'react-router-dom';

const Root = () => {

  const location = useLocation();
  const path = location.pathname;
  const backgroundImage = path == '/dashboard'? `url(${gameLoungeBg})` : '';
  return (
    <div style={{backgroundImage}} className='p-4 min-h-screen flex flex-col items-center justify-between'>
      <AppLogo className='self-start' size='small' position='left' />
      <Outlet />
      <TeamMark />
    </div>
  )
}

export default Root
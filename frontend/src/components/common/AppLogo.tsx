import { Logo } from '../../assets';

type AppLogo = {
  size: 'large' | 'small';
  position: 'left' | 'center';
};

/**
 * Logo Mark of the Application
 * @param size - large or small
 * @param position left or center
 * @returns JSX
 */

const AppLogo: React.FC<AppLogo> = ({ size, position }) => {
  const width =
    size === 'large' ? 'w-[250px] md:w-[300px]' : 'w-[80px] md:w-[120px]';
  const place = position === 'center' ? 'mx-auto' : '';

  //   Return JSX of the Appropriate 3d Logo
  return (
    <div className={`overflow-hidden mx-auto ${place}  ${width}`}>
      <img src={Logo} alt="3d Logo Tic-Tac" className="w-full object-contain" />
    </div>
  );
};

export default AppLogo;

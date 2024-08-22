import AppLogo from './common/AppLogo';
import Loader from './common/Loader';

const SplashScreen = ({ loading }: { loading: boolean }) => {
  return (
    <div
      className={`h-screen min-h-screen w-full bg-white flex flex-col justify-center items-center transition-all duration-700 ease-in-out absolute top-0 left-0 z-10 ${
        loading ? 'translate-x-0 opacity-100' : ' opacity-30 translate-x-[300%]'
      }`}
    >
      <AppLogo size="large" position="center" />
      <Loader />
    </div>
  );
};

export default SplashScreen;

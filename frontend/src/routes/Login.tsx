import { useState } from 'react';
import Input from '../components/common/Input';
import ThreeDLogoComp from '../components/common/ThreeDLogo';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

const Login = () => {
  // Define States
  const initial = { username: '', password: '', confirmPassword: '' };
  const [userData, setUserData] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle User Registration
  const handleRegistration = () => {
    setError(null);
    setLoading(true);

    setTimeout(() => setLoading(false), 2000);
  };

  // Return JSX;
  return (
    <div className="font-poppins md:bg-white md:rounded-md md:p-10  md:shadow-slate-300 md:shadow-2xl">
      <ThreeDLogoComp size="small" animate={false} />
      <div className="my-5 text-center">
        <p className="font-bold text-text-gray">Welcome to</p>
        <h1 className="font-semibold text-primary-blue text-5xl">CMORSS</h1>
        <p className="font-semibold text-xs leading-tight">
          Cross Platform Game
        </p>
      </div>

      {/* Registration Form */}
      <h3 className="text-center font-bold mb-2 text-slate-600">
        Good to see you again! 😁
      </h3>
      <Input
        value={userData.username}
        placeholder="Enter your username"
        otherProps={{ autoComplete: 'off' }}
        onChange={(text) =>
          setUserData((prev) => ({ ...prev, username: text }))
        }
      />

      {/* Password Input Field */}
      <Input
        value={userData.password}
        placeholder="Enter Your Password"
        otherProps={{ minLength: 8, type: 'password', autoComplete: 'off' }}
        onChange={(text) =>
          setUserData((prev) => ({ ...prev, password: text }))
        }
      />

      {error && (
        <p className="text-center text-[10px] text-red-600">❌❌ {error}</p>
      )}

      {/* Submit User Entry */}
      <Button
        disabled={loading}
        loading={loading}
        color="blue"
        size="full"
        text={loading ? 'Loading. Please wait...' : 'Login Now'}
        onClick={handleRegistration}
      />

      <Link to={'/signup'}>
        <p className="text-center text-xs sm:text-sm cursor-pointer">
          New User?{' '}
          <span className="font-semibold text-primary-blue">Register Here</span>
        </p>
      </Link>

      <hr className="my-2" />

      <p className="text-center text-sm">
        Sign In With{' '}
        <span className="text-primary-blue font-semibold">Goo</span>
        <span className="text-primary-orange font-semibold">gle!</span>
      </p>
    </div>
  );
};

export default Login;

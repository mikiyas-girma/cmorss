import { useState } from 'react';
import Input from '../components/common/Input';
import ThreeDLogoComp from '../components/common/ThreeDLogo';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  // Define States
  const initial = { pseudo: '', password: '', confirmPassword: '' };
  const [userData, setUserData] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async () => {
    setError(null);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(true);
        return setError(data.error);
      }
      if (res.ok) {
        navigate('/dashboard');
      }
    } catch (error) {
      setLoading(false);
      setError((error as Error).message);
    }
  };
  
  // Handle User Registration
  // const handleLogin = () => {
  //   setError(null);
    
  
  //   setLoading(true);

  //   setTimeout(() => setLoading(false), 2000);
  // };

  // Return JSX;
  
  return (
    <div className="font-poppins md:bg-white md:rounded-md md:p-10 md:shadow-slate-300 md:shadow-2xl">
      <ThreeDLogoComp size="small" animate={false} />
      <div className="my-5 text-center">
        <p className="font-bold text-text-gray">Welcome to</p>
        <h1 className="text-5xl font-semibold text-primary-blue">CMORSS</h1>
        <p className="text-xs font-semibold leading-tight">
          Cross Platform Game
        </p>
      </div>

      {/* Registration Form */}
      <h3 className="mb-2 font-bold text-center text-slate-600">
        Good to see you again! 😁
      </h3>
      <Input
        value={userData.pseudo}
        placeholder="Enter your pseudo"
        otherProps={{ autoComplete: 'off' }}
        onChange={(text) =>
          setUserData((prev) => ({ ...prev, pseudo: text }))
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
        onClick={handleLogin}
      />

      <Link to={'/signup'}>
        <p className="text-xs text-center cursor-pointer sm:text-sm">
          New User?{' '}
          <span className="font-semibold text-primary-blue">Register Here</span>
        </p>
      </Link>

      <hr className="my-2" />

      <p className="text-sm text-center">
        Sign In With{' '}
        <span className="font-semibold text-primary-blue">Goo</span>
        <span className="font-semibold text-primary-orange">gle!</span>
      </p>
    </div>
  );
};

export default Login;

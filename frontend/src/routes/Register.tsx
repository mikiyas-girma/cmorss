import { useState } from "react";
import Input from "../components/common/Input";
import ThreeDLogoComp from "../components/common/ThreeDLogo";
import Button from "../components/common/Button";
import validateRegistrationForm from "../utils/validateRegistrationForm";
import { Link, useNavigate } from "react-router-dom";
import { toastError } from "../utils/toast";

const Register = () => {
  // Define States
  const initial = { pseudo: "", password: "", confirmPassword: "" };
  const [userData, setUserData] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle User Registration
  const handleRegistration = async () => {
    setError(null);
    const errorMsg = validateRegistrationForm(userData);
    if (errorMsg) {
      toastError(errorMsg);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        // Check for MongoDB duplicate key error specifically for username (pseudo)
        let customErrorMsg =
          "An error occurred during registration. Please try again.";
        if (data.message && data.message.includes("E11000")) {
          if (data.message.includes("pseudo")) {
            customErrorMsg =
              "This username is already taken. Please choose another one.";
          }
        }
        toastError(customErrorMsg);
        return;
      }
      if (res.ok) {
        navigate("/login");
      }
    } catch (error) {
      setTimeout(() => setLoading(false), 2000);
      setError((error as Error).message);
    }
  };

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
        Register and Have Fun!
      </h3>
      <Input
        value={userData.pseudo}
        placeholder="Choose a username"
        otherProps={{ autoComplete: "off" }}
        onChange={(text) => setUserData((prev) => ({ ...prev, pseudo: text }))}
      />

      {/* Password Input Field */}
      <Input
        value={userData.password}
        placeholder="Choose a Strong Password"
        otherProps={{ minLength: 8, type: "password", autoComplete: "off" }}
        onChange={(text) =>
          setUserData((prev) => ({ ...prev, password: text }))
        }
      />
      <p className="text-[10px] -mt-2 mb-2 text-center">
        Password: Min 8 Characters
      </p>

      <Input
        value={userData.confirmPassword}
        placeholder="Confirm Password"
        otherProps={{ minLength: 8, type: "password", autoComplete: "off" }}
        onChange={(text) =>
          setUserData((prev) => ({ ...prev, confirmPassword: text }))
        }
      />

      {error && (
        <p className="text-center text-[10px] text-red-600">❌❌ {error}</p>
      )}

      {/* Submit User Entry */}
      <Button
        disabled={loading}
        loading={loading}
        color="green"
        size="full"
        text={loading ? "Registration in progress..." : "Create Account"}
        onClick={handleRegistration}
      />

      <Link to={"/login"}>
        <p className="text-xs text-center cursor-pointer sm:text-sm">
          Already have an account?{" "}
          <span className="font-semibold text-primary-green">Sign In</span>
        </p>
      </Link>

      <hr className="my-1 mx-auto w-[70%] max-w-[200px] sm:max-w-[500px]" />

      <p className="text-sm text-center">
        Sign In With{" "}
        <span className="font-semibold text-primary-blue">Goo</span>
        <span className="font-semibold text-primary-orange">gle!</span>
      </p>
    </div>
  );
};

export default Register;

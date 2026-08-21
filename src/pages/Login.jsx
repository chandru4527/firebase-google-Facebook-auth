import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  loginWithGoogle,
  loginWithFacebook,
} from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      await loginWithGoogle();

      navigate("/profile");
    } catch (error) {
      console.error("Google login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setLoading(true);

      await loginWithFacebook();

      navigate("/profile");
    } catch (error) {
      console.error("Facebook login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-2xl font-bold">
          Welcome Back
        </h1>

        <p className="mb-6 text-gray-500">
          Login to continue
        </p>

        <div className="space-y-3">

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full rounded-lg border px-4 py-3 font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Please wait..." : "Continue with Google"}
          </button>

          {/* Facebook */}
          <button
            type="button"
            onClick={handleFacebookLogin}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Please wait..." : "Continue with Facebook"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Login;
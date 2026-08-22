import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MdFacebook,
  MdLock,
  MdLogin,
  MdSecurity,
  MdSpeed,
} from "react-icons/md";

import {
  loginWithGoogle,
  loginWithFacebook,
} from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const user = await loginWithGoogle();

      navigate("/profile", {
        state: {
          user: {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            provider: "google.com",
          },
        },
      });
    } catch (error) {
      console.error("Google login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Facebook Login
  const handleFacebookLogin = async () => {
    try {
      setLoading(true);

      const user = await loginWithFacebook();

      console.log("Facebook user:", user);

      navigate("/profile", {
        state: {
          user,
        },
      });
    } catch (error) {
      console.error("Facebook login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">

      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl sm:min-h-[calc(100vh-3rem)]">

        {/* LEFT SIDE */}
        <div className="relative hidden w-1/2 overflow-hidden bg-slate-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">

          {/* Decorative circles */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/5" />

          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/5" />

          {/* Logo / Brand */}
          <div className="relative">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-900">
              <MdLogin className="text-2xl" />
            </div>

            <h1 className="mt-6 text-3xl font-bold">
              Welcome back.
            </h1>

            <p className="mt-3 max-w-sm leading-7 text-slate-400">
              Sign in to your account and continue
              where you left off.
            </p>

          </div>

          {/* Features */}
          <div className="relative space-y-5">

            <div className="flex items-center gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <MdSecurity className="text-xl" />
              </div>

              <div>
                <p className="font-medium">
                  Secure Authentication
                </p>

                <p className="text-sm text-slate-500">
                  Your account is securely protected
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <MdSpeed className="text-xl" />
              </div>

              <div>
                <p className="font-medium">
                  Fast & Simple
                </p>

                <p className="text-sm text-slate-500">
                  Sign in with your existing account
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <MdLock className="text-xl" />
              </div>

              <div>
                <p className="font-medium">
                  Private & Secure
                </p>

                <p className="text-sm text-slate-500">
                  We keep your account information safe
                </p>
              </div>

            </div>

          </div>

          <p className="relative text-xs text-slate-600">
            © 2026 Your App. All rights reserved.
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2 lg:p-16">

          <div className="w-full max-w-md">

            {/* Heading */}
            <div className="mb-10">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white lg:hidden">
                <MdLogin className="text-2xl" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Sign in
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Choose an account to continue
              </p>

            </div>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="flex w-full items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-3.5 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                <span className="text-lg font-bold">
                  G
                </span>
              </div>

              <span className="flex-1 text-left">
                Continue with Google
              </span>

              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-800" />
              )}

            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">

              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-xs text-slate-400">
                OR
              </span>

              <div className="h-px flex-1 bg-slate-200" />

            </div>

            {/* Facebook */}
            <button
              type="button"
              onClick={handleFacebookLogin}
              disabled={loading}
              className="flex w-full items-center gap-4 rounded-xl bg-[#1877F2] px-5 py-3.5 font-medium text-white transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:opacity-50"
            >

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                <MdFacebook className="text-2xl" />
              </div>

              <span className="flex-1 text-left">
                Continue with Facebook
              </span>

              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              )}

            </button>

            {/* Bottom info */}
            <div className="mt-8 rounded-xl bg-slate-50 p-4">

              <div className="flex gap-3">

                <MdSecurity className="mt-0.5 shrink-0 text-lg text-slate-400" />

                <p className="text-xs leading-5 text-slate-500">
                  Your login is handled securely by
                  Google and Facebook. We never see or
                  store your social account password.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;
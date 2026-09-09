import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";


function Login() {
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  // Synchronize with your app's theme attribute changes
  useEffect(() => {
    const checkTheme = () => {
      const themeAttr = document.documentElement.getAttribute('data-theme');
      const hasDarkClass = document.documentElement.classList.contains('dark');
      setIsDark(themeAttr === 'dark' || hasDarkClass);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });

    return () => observer.disconnect();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    /*
      Demo authentication for now.

      Later we will replace this with a real
      authentication backend/provider.
    */
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", formData.email);

    navigate("/dashboard");
  };

  const handleGoogleLogin = () => {
    setError("Google authentication will be connected later.");
  };


  return (
    <main className={`min-h-[calc(100vh-5rem)] transition-colors duration-300 px-4 py-12 ${isDark ? 'bg-[#0c0a09] text-[#f5f5f4]' : 'bg-[#F7F2EB] text-[#231F20]'}`}>
      <div className="mx-auto flex w-full max-w-md flex-col">
        {/* Brand / Heading */}
        <div className="mb-8 text-center">
          <div className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg ${isDark ? 'bg-red-600 text-white' : 'bg-[#8B1E24] text-white'}`}>
            <Activity size={30} strokeWidth={2.2} />
          </div>

          <h1 className={`text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#211A1A]'}`}>
            Welcome back
          </h1>

          <p className={`mt-2 text-sm ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
            Sign in to continue to CardioPredict-AI
          </p>
        </div>

        {/* Login Card */}
        <div className={`rounded-2xl border p-6 shadow-xl sm:p-8 ${isDark ? 'border-[#2A2725] bg-[#171717]' : 'border-[#E8DDD0] bg-[#FFFDFC]'}`}>
          {/* Google / GitHub */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className={`flex h-11 items-center justify-center gap-2 rounded-lg border text-sm font-medium transition ${isDark ? 'border-[#2A2725] bg-[#101010] text-white hover:border-red-400' : 'border-[#E8DDD0] bg-background text-[#211A1A] hover:border-[#8B1E24]'}`}
            >
              <span className="text-base font-bold">G</span>
              Google
            </button>

          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className={`h-px flex-1 ${isDark ? 'bg-[#2A2725]' : 'bg-[#E8DDD0]'}`} />

            <span className={`text-xs ${isDark ? 'text-stone-500' : 'text-[#6B6663]'}`}>OR</span>

            <div className={`h-px flex-1 ${isDark ? 'bg-[#2A2725]' : 'bg-[#E8DDD0]'}`} />
          </div>

          {/* Error */}
          {error && (
            <div className={`mb-5 rounded-lg border px-4 py-3 text-sm ${isDark ? 'border-red-500/30 bg-red-500/10 text-red-400' : 'border-[#8B1E24]/30 bg-[#8B1E24]/10 text-[#8B1E24]'}`}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className={`mb-2 block text-sm font-medium ${isDark ? 'text-white' : 'text-[#211A1A]'}`}
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-stone-500' : 'text-[#6B6663]'}`}
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`h-11 w-full rounded-lg border pl-10 pr-4 text-sm outline-none transition placeholder:text-stone-500 ${isDark ? 'border-[#2A2725] bg-[#101010] text-white focus:border-red-400' : 'border-[#E8DDD0] bg-background text-[#211A1A] focus:border-[#8B1E24]'}`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-[#211A1A]'}`}
                >
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setError("Password recovery will be connected later.");
                  }}
                  className={`text-xs font-medium transition ${isDark ? 'text-red-400 hover:text-red-300' : 'text-[#8B1E24] hover:text-[#70151B]'}`}
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-stone-500' : 'text-[#6B6663]'}`}
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`h-11 w-full rounded-lg border pl-10 pr-11 text-sm outline-none transition placeholder:text-stone-500 ${isDark ? 'border-[#2A2725] bg-[#101010] text-white focus:border-red-400' : 'border-[#E8DDD0] bg-background text-[#211A1A] focus:border-[#8B1E24]'}`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition ${isDark ? 'text-stone-400 hover:text-white' : 'text-[#6B6663] hover:text-[#8B1E24]'}`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className={`h-4 w-4 rounded border ${isDark ? 'border-[#2A2725] bg-[#101010] accent-red-600' : 'border-[#E8DDD0] accent-[#8B1E24]'}`}
              />

              <label
                htmlFor="rememberMe"
                className={`text-sm ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}
              >
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className={`flex h-11 w-full items-center justify-center rounded-lg px-5 text-sm font-semibold text-white transition shadow-lg ${isDark ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20' : 'bg-[#8B1E24] hover:bg-[#70151B] shadow-[#8B1E24]/20'}`}
            >
              Sign In
            </button>
          </form>

          {/* Register */}
          <p className={`mt-7 text-center text-sm ${isDark ? 'text-stone-400' : 'text-[#6B6663]'}`}>
            Don't have an account?{" "}
            <Link
              to="/register"
              className={`font-semibold transition ${isDark ? 'text-red-400 hover:text-red-300' : 'text-[#8B1E24] hover:text-[#70151B]'}`}
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Disclaimer */}
        <p className={`mt-6 text-center text-xs leading-5 ${isDark ? 'text-stone-500' : 'text-[#6B6663]/80'}`}>
          CardioPredict-AI provides informational predictions and does not
          replace professional medical advice.
        </p>
      </div>
    </main>
  );
}

export default Login;
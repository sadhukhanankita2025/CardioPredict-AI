import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";


function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

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
    <main className="min-h-[calc(100vh-5rem)] bg-background px-4 py-12">
      <div className="mx-auto flex w-full max-w-md flex-col">
        {/* Brand / Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
            <Activity size={30} strokeWidth={2.2} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-text-primary">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-text-secondary">
            Sign in to continue to CardioPredict-AI
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-xl sm:p-8">
          {/* Google / GitHub */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-background text-sm font-medium text-text-primary transition hover:border-primary hover:bg-surface-secondary"
            >
              <span className="text-base font-bold">G</span>
              Google
            </button>

          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />

            <span className="text-xs text-text-muted">OR</span>

            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-text-primary"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-text-primary"
                >
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setError("Password recovery will be connected later.");
                  }}
                  className="text-xs font-medium text-primary transition hover:text-primary-hover"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-11 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition hover:text-primary"
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
                className="h-4 w-4 accent-primary"
              />

              <label
                htmlFor="rememberMe"
                className="text-sm text-text-secondary"
              >
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-hover hover:shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* Register */}
          <p className="mt-7 text-center text-sm text-text-secondary">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-primary transition hover:text-primary-hover"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs leading-5 text-text-muted">
          CardioPredict-AI provides informational predictions and does not
          replace professional medical advice.
        </p>
      </div>
    </main>
  );
}

export default Login;
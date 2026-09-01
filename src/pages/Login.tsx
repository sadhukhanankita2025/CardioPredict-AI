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
    <main className="min-h-[calc(100vh-5rem)] bg-[var(--background)] px-4 py-12">
      <div className="mx-auto flex w-full max-w-md flex-col">
        {/* Brand / Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)] text-white shadow-lg">
            <Activity size={30} strokeWidth={2.2} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Sign in to continue to CardioPredict-AI
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl sm:p-8">
          {/* Google / GitHub */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--primary)] hover:bg-[var(--surface-secondary)]"
            >
              <span className="text-base font-bold">G</span>
              Google
            </button>
            
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--border)]" />

            <span className="text-xs text-[var(--text-muted)]">OR</span>

            <div className="h-px flex-1 bg-[var(--border)]" />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-3 text-sm text-[var(--primary)]">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[var(--text-primary)]"
                >
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setError("Password recovery will be connected later.");
                  }}
                  className="text-xs font-medium text-[var(--primary)] transition hover:text-[var(--primary-hover)]"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] pl-10 pr-11 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition hover:text-[var(--primary)]"
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
                className="h-4 w-4 accent-[var(--primary)]"
              />

              <label
                htmlFor="rememberMe"
                className="text-sm text-[var(--text-secondary)]"
              >
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center rounded-lg bg-[var(--primary)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)] hover:shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* Register */}
          <p className="mt-7 text-center text-sm text-[var(--text-secondary)]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[var(--primary)] transition hover:text-[var(--primary-hover)]"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs leading-5 text-[var(--text-muted)]">
          CardioPredict-AI provides informational predictions and does not
          replace professional medical advice.
        </p>
      </div>
    </main>
  );
}

export default Login;

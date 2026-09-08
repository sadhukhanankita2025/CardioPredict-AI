import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from 'lucide-react';

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    /*
      Demo authentication for now.

      Later we will replace this with a real authentication
      backend / authentication provider.
    */
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('userEmail', formData.email);

    navigate('/dashboard');
  };

  const handleGoogleRegister = () => {
    setError('Google authentication will be connected later.');
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-background px-4 py-12">

      <div className="mx-auto flex w-full max-w-md flex-col">

        {/* Brand */}
        <div className="mb-8 text-center">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
            <Activity size={30} strokeWidth={2.2} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-text-primary">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-text-secondary">
            Start using CardioPredict-AI today
          </p>

        </div>


        {/* Register Card */}
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-xl sm:p-8">

          {/* Google / GitHub */}
          <div className="grid grid-cols-2 gap-3">

            <button
              type="button"
              onClick={handleGoogleRegister}
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-background text-sm font-medium text-text-primary transition hover:border-primary hover:bg-surface-secondary"
            >
              <span className="text-base font-bold">G</span>
              Google
            </button>

          </div>


          {/* Divider */}
          <div className="my-6 flex items-center gap-4">

            <div className="h-px flex-1 bg-border" />

            <span className="text-xs text-text-muted">
              OR
            </span>

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

            {/* Name */}
            <div>

              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-text-primary"
              >
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                />

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

              </div>

            </div>


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

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-text-primary"
              >
                Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-11 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition hover:text-primary"
                  aria-label={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>


            {/* Confirm Password */}
            <div>

              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-text-primary"
              >
                Confirm Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                />

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-11 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition hover:text-primary"
                  aria-label={
                    showConfirmPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>


            {/* Terms */}
            <div className="flex items-start gap-3">

              <input
                id="terms"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 accent-primary"
              />

              <label
                htmlFor="terms"
                className="text-xs leading-5 text-text-secondary"
              >
                I agree to the terms of use and understand that
                CardioPredict-AI provides informational predictions
                and does not replace professional medical advice.
              </label>

            </div>


            {/* Submit */}
            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-hover hover:shadow-lg"
            >
              Create Account
            </button>

          </form>


          {/* Login */}
          <p className="mt-7 text-center text-sm text-text-secondary">

            Already have an account?{' '}

            <Link
              to="/login"
              className="font-semibold text-primary transition hover:text-primary-hover"
            >
              Sign in
            </Link>

          </p>

        </div>


        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs leading-5 text-text-muted">
          By creating an account, you agree to use CardioPredict-AI
          responsibly.
        </p>

      </div>

    </main>
  );
}

export default Register;
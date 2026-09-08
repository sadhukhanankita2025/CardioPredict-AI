import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import lightLogo from './logo/logolight.png';
import darkLogo from './logo/logodark.png';

function Footer() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  });

  // Watch for theme changes made by Navbar
  useEffect(() => {
    const checkTheme = () => {
      setDarkMode(
        document.documentElement.getAttribute('data-theme') === 'dark'
      );
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface text-text-primary">

      <div className="mx-auto w-[92%] max-w-350 py-14">

        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">

            <button
              onClick={() => navigate('/')}
              className="mb-5 block"
              aria-label="Go to CardioPredict-AI home"
            >
              <img
                src={darkMode ? darkLogo : lightLogo}
                alt="CardioPredict-AI"
                className="h-auto w-47.5"
              />
            </button>

            <p className="max-w-md text-sm leading-7 text-text-secondary">
              CardioPredict-AI is an AI-powered heart disease risk
              prediction platform designed to help users understand
              cardiovascular risk through data-driven insights.
            </p>

            <p className="mt-5 max-w-md text-xs leading-6 text-text-muted">
              For informational and educational purposes only.
              This platform does not replace professional medical advice.
            </p>

          </div>


          {/* Quick Links */}
          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Quick Links
            </h3>

            <div className="flex flex-col items-start gap-3">

              <button
                onClick={() => navigate('/')}
                className="text-sm text-text-secondary transition-colors hover:text-primary"
              >
                Home
              </button>

              <button
                onClick={() => navigate('/about')}
                className="text-sm text-text-secondary transition-colors hover:text-primary"
              >
                About AI
              </button>

              <button
                onClick={() => navigate('/prevention')}
                className="text-sm text-text-secondary transition-colors hover:text-primary"
              >
                Prevention
              </button>

              <button
                onClick={() => navigate('/contact')}
                className="text-sm text-text-secondary transition-colors hover:text-primary"
              >
                Contact
              </button>

            </div>

          </div>


          {/* Platform */}
          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Platform
            </h3>

            <div className="flex flex-col items-start gap-3">

              <button
                onClick={() => navigate('/login')}
                className="text-sm text-text-secondary transition-colors hover:text-primary"
              >
                Heart Prediction
              </button>

              <button
                onClick={() => navigate('/login')}
                className="text-sm text-text-secondary transition-colors hover:text-primary"
              >
                Login
              </button>

              <button
                onClick={() => navigate('/register')}
                className="text-sm text-text-secondary transition-colors hover:text-primary"
              >
                Create Account
              </button>

            </div>

          </div>

        </div>


        {/* Divider */}
        <div className="my-10 h-px bg-border" />


        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 text-xs text-text-muted md:flex-row md:items-center md:justify-between">

          <p>
            © {currentYear} CardioPredict-AI. All rights reserved.
          </p>

          <p>
            Powered by AI • Built for smarter cardiovascular insights
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
import { useEffect, useRef, useState } from 'react';
import {
  LogOut,
  Moon,
  Sun,
  User,
  UserCog,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import lightLogo from '../components/logo/logolight.png';
import darkLogo from '../components/logo/logodark.png';

function DashboardHeader() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.getAttribute('data-theme') === 'dark' || document.documentElement.classList.contains('dark');
  });

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem(
      'theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // Switch Account
  const handleSwitchAccount = () => {
    setProfileOpen(false);
    navigate('/login');
  };


  // Logout
  const handleLogout = () => {
    // Remove authentication information
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');

    setProfileOpen(false);

    // Go to Home
    navigate('/');
  };


  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-20 bg-background transition-colors duration-300">

      <div className="flex h-full items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <a
          href="/dashboard"
          className="flex items-center"
        >
          <img
            src={darkMode ? darkLogo : lightLogo}
            alt="CardioPredict-AI"
            className="w-46.25"
          />
        </a>


        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Profile */}
          <div
            ref={profileRef}
            className="relative"
          >

            <button
              type="button"
              onClick={() => setProfileOpen((previous) => !previous)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-text-secondary transition hover:bg-surface hover:text-[#8B1E24] hover:[text-shadow:0_0_12px_rgba(139,30,36,0.5)] dark:hover:text-red-400 dark:hover:[text-shadow:0_0_12px_rgba(239,68,68,0.5)]"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              <User size={19} />

              <span className="hidden text-sm font-medium sm:block">
                Profile
              </span>
            </button>


            {/* Profile Dropdown */}
            {profileOpen && (
              <div
                className="absolute right-0 top-12 w-52 overflow-hidden rounded-xl border border-border bg-surface shadow-lg"
                role="menu"
              >

                {/* Switch Account */}
                <button
                  type="button"
                  onClick={handleSwitchAccount}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-text-secondary transition hover:bg-background hover:text-[#8B1E24] hover:[text-shadow:0_0_12px_rgba(139,30,36,0.5)] dark:hover:text-red-400 dark:hover:[text-shadow:0_0_12px_rgba(239,68,68,0.5)]"
                  role="menuitem"
                >
                  <UserCog size={18} />

                  <span>
                    Switch Account
                  </span>
                </button>


                {/* Divider */}
                <div className="h-px bg-border" />


                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-text-secondary transition hover:bg-background hover:text-[#8B1E24] hover:[text-shadow:0_0_12px_rgba(139,30,36,0.5)] dark:hover:text-red-400 dark:hover:[text-shadow:0_0_12px_rgba(239,68,68,0.5)]"
                  role="menuitem"
                >
                  <LogOut size={18} />

                  <span>
                    Log Out
                  </span>
                </button>

              </div>
            )}

          </div>


          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => setDarkMode((previous) => !previous)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-primary transition hover:border-[#8B1E24] hover:text-[#8B1E24] hover:shadow-[0_0_10px_rgba(139,30,36,0.5)] dark:hover:border-red-400 dark:hover:text-red-400 dark:hover:shadow-[0_0_10px_rgba(239,68,68,0.5)]"
            aria-label={
              darkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
          >
            {darkMode ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

        </div>

      </div>

    </header>
  );
}

export default DashboardHeader;
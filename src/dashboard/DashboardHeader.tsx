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
    return document.documentElement.getAttribute('data-theme') === 'dark';
  });

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );

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
    <header className="fixed left-0 right-0 top-0 z-50 h-20 border-b border-[var(--border)] bg-[var(--background)]">

      <div className="flex h-full items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <a
          href="/dashboard"
          className="flex items-center"
        >
          <img
            src={darkMode ? darkLogo : lightLogo}
            alt="CardioPredict-AI"
            className="w-[185px]"
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
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-[var(--text-secondary)] transition hover:bg-[var(--surface)] hover:text-[var(--text-primary)]"
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
                className="absolute right-0 top-12 w-52 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-lg"
                role="menu"
              >

                {/* Switch Account */}
                <button
                  type="button"
                  onClick={handleSwitchAccount}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--background)] hover:text-[var(--text-primary)]"
                  role="menuitem"
                >
                  <UserCog size={18} />

                  <span>
                    Switch Account
                  </span>
                </button>


                {/* Divider */}
                <div className="h-px bg-[var(--border)]" />


                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--background)] hover:text-[var(--primary)]"
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
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
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
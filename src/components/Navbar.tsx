import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import lightLogo from "./logo/logolight.png";
import darkLogo from "./logo/logodark.png";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.getAttribute("data-theme") === "dark";
  });

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    } else if (savedTheme === "light") {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About AI", path: "/about" },
    { name: "Prevention", path: "/prevention" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 w-[92%] max-w-350 items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavigation("/")}
          className="flex items-center"
          aria-label="CardioPredict-AI Home"
        >
          <img
            src={darkMode ? darkLogo : lightLogo}
            alt="CardioPredict-AI"
            className="h-auto w-47.5"
          />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "text-primary"
                    : "text-text-secondary hover:text-primary"
                }`}
              >
                {link.name}

                {active && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}

          {/* Sign In */}
          <button
            onClick={() => handleNavigation("/login")}
            className={`ml-2 rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium text-primary transition-all hover:border-primary-hover hover:text-primary ${
              location.pathname === "/login"
                ? "border-primary-hover"
                : ""
            }`}
          >
            Sign In
          </button>

          {/* Create Account */}
          <button
            onClick={() => handleNavigation("/register")}
            className="rounded-lg border border-transparent px-4 py-2.5 text-sm font-semibold text-primary transition-all hover:border-primary-hover hover:text-primary"
          >
            Sign Up
          </button>

          {/* Predict Now */}
          <button
            onClick={() => handleNavigation("/login")}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-hover hover:shadow-lg"
          >
            Predict Now
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode((previous) => !previous)}
            className="ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-lg transition-all hover:border-primary"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? "☀️" : "☾"}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode((previous) => !previous)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-lg"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? "☀️" : "☾"}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((previous) => !previous)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-xl"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex w-[92%] max-w-350 flex-col py-4">
            {navLinks.map((link) => {
              const active = isActive(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-text-secondary hover:bg-surface hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Sign In */}
            <button
              onClick={() => handleNavigation("/login")}
              className="mt-2 rounded-lg border border-transparent px-4 py-3 text-left text-sm font-medium text-primary transition-all hover:border-primary-hover hover:text-primary"
            >
              Sign In
            </button>

            {/* Mobile Sign Up */}
            <button
              onClick={() => handleNavigation("/register")}
              className="mt-1 rounded-lg border border-transparent px-4 py-3 text-left text-sm font-semibold text-primary transition-all hover:border-primary-hover hover:text-primary"
            >
              Sign Up
            </button>

            {/* Mobile Predict */}
            <button
              onClick={() => handleNavigation("/login")}
              className="mt-3 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Predict Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
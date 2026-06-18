import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, Menu, Search, UserRound, X } from 'lucide-react';

import { useAuth } from '../context/AuthContext.jsx';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Cars', href: '/cars' },
  { label: 'Booking', href: '/booking' },
  { label: 'Media', href: '/media' },
  { label: 'About', href: '/about' }
];

const linkClasses = ({ isActive }) =>
  `text-sm font-medium transition ${
    isActive ? 'text-champagne' : 'text-white/78 hover:text-white'
  }`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleSearch = (event) => {
    event.preventDefault();
    const normalizedQuery = query.trim();

    if (normalizedQuery) {
      navigate(`/cars?search=${encodeURIComponent(normalizedQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-white/10 bg-night/72 shadow-glass backdrop-blur-2xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
          <span className="grid h-11 w-11 place-items-center rounded-full border border-champagne/40 bg-white/5 text-lg font-black text-champagne shadow-glow transition group-hover:border-champagne">
            L
          </span>
          <span className="font-display text-2xl font-semibold tracking-normal text-white">
            LuxDrive
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} className={linkClasses}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <form
            onSubmit={handleSearch}
            className="flex h-11 w-64 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm text-white/80 transition focus-within:border-champagne/60"
          >
            <Search className="h-4 w-4 text-champagne" />
            <input
              aria-label="Search cars"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search cars"
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/42"
            />
          </form>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="max-w-32 truncate text-sm text-white/74">{user?.name}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:border-ember/60 hover:text-ember"
                aria-label="Log out"
                title="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-champagne px-5 text-sm font-bold text-night transition hover:-translate-y-0.5 hover:bg-white"
            >
              <UserRound className="h-4 w-4" />
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white lg:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="border-t border-white/10 bg-night/95 px-5 pb-6 pt-3 shadow-glass backdrop-blur-2xl lg:hidden"
          >
            <form
              onSubmit={handleSearch}
              className="mb-5 flex h-12 items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 text-sm text-white/80"
            >
              <Search className="h-4 w-4 text-champagne" />
              <input
                aria-label="Search cars"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search cars"
                className="w-full bg-transparent outline-none placeholder:text-white/42"
              />
            </form>

            <div className="grid gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-base font-semibold transition ${
                      isActive
                        ? 'bg-champagne text-night'
                        : 'bg-white/[0.04] text-white/80 hover:bg-white/[0.08]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-ember/40 px-4 py-3 text-base font-semibold text-ember"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-champagne px-4 py-3 text-base font-bold text-night"
                >
                  <UserRound className="h-4 w-4" />
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '@/lib/types';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/hooks/useAdmin';
import { KSLogo } from './KSLogo';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const { isAdmin } = useAdmin();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-card/95 backdrop-blur-xl shadow-sm border-b border-border'
          : 'bg-background/90 backdrop-blur-xl'
      }`}
    >
      <div className="container flex items-center justify-between h-20 md:h-24">
        <Link to="/">
          <KSLogo />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <Link
              key={key}
              to={`/categoria/${cat.slug}`}
              className={`px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-secondary ${
                location.pathname === `/categoria/${cat.slug}`
                  ? 'bg-secondary text-foreground font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link
              to="/admin"
              className="hidden md:inline-flex text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground px-3 py-2 rounded-xl hover:bg-secondary transition-all"
            >
              Admin
            </Link>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-foreground rounded-xl hover:bg-secondary transition-colors"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-border overflow-hidden bg-card/95 backdrop-blur-xl"
          >
            <div className="container py-4 flex flex-col gap-1">
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <Link
                  key={key}
                  to={`/categoria/${cat.slug}`}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-sm font-semibold rounded-xl hover:bg-secondary text-foreground flex items-center gap-3 transition-colors"
                >
                  <span className="text-lg">{cat.icon}</span>
                  {cat.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
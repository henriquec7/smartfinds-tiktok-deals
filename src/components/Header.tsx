import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES } from '@/lib/types';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-card/95 backdrop-blur-xl shadow-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl tracking-tight text-foreground">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <ShoppingBag size={16} className="text-primary-foreground" />
          </div>
          <span>
            SMART<span className="text-gradient">FINDS</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <Link
              key={key}
              to={`/categoria/${cat.slug}`}
              className={`px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-secondary ${
                location.pathname === `/categoria/${cat.slug}`
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/admin"
            className="hidden md:inline-flex text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground px-3 py-2 rounded-xl hover:bg-secondary transition-all"
          >
            Admin
          </Link>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-foreground rounded-xl hover:bg-secondary transition-colors">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
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
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-semibold rounded-xl hover:bg-secondary text-muted-foreground flex items-center gap-3 transition-colors"
              >
                ⚙️ Admin
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

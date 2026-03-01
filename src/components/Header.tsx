import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES, Category } from '@/lib/types';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-14">
        <Link to="/" className="font-extrabold text-lg tracking-tight text-foreground">
          <span className="text-primary">Smart</span>Finds
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <Link
              key={key}
              to={`/categoria/${cat.slug}`}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-secondary ${
                location.pathname === `/categoria/${cat.slug}` ? 'bg-secondary text-foreground' : 'text-muted-foreground'
              }`}
            >
              {cat.icon} {cat.label}
            </Link>
          ))}
          <Link
            to="/admin"
            className="ml-2 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-secondary transition-colors"
          >
            ⚙️ Admin
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border overflow-hidden bg-card"
          >
            <div className="container py-3 flex flex-col gap-1">
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <Link
                  key={key}
                  to={`/categoria/${cat.slug}`}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-secondary text-muted-foreground"
                >
                  {cat.icon} {cat.label}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-secondary text-muted-foreground"
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

import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, History } from 'lucide-react';

export function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight">Humanizer</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Button
            variant={location.pathname === '/app' ? 'secondary' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/app">
              <Sparkles className="h-4 w-4" />
              Humanize
            </Link>
          </Button>
          <Button
            variant={location.pathname === '/history' ? 'secondary' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/history">
              <History className="h-4 w-4" />
              History
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}


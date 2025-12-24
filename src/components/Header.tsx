import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Sparkles, History, LogOut, User } from 'lucide-react';

export function Header() {
  const { user, signOut, loading } = useAuth();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight">Humanizer AI</span>
        </Link>

        <nav className="flex items-center gap-2">
          {!loading && (
            <>
              {user ? (
                <>
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
                  <div className="ml-2 h-6 w-px bg-border" />
                  <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {user.email?.split('@')[0]}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={signOut}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button variant="default" size="sm" asChild>
                    <Link to="/auth?mode=signup">Get Started</Link>
                  </Button>
                </>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

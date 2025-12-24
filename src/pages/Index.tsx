import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { 
  Sparkles, 
  Zap, 
  Shield, 
  History, 
  ArrowRight,
  Wand2,
  SlidersHorizontal,
  FileText
} from 'lucide-react';

const features = [
  {
    icon: Wand2,
    title: 'Smart Rewriting',
    description: 'AI-powered humanization that preserves your message while making it sound naturally written.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Adjustable Intensity',
    description: 'Control how much the text is modified - from light touch-ups to complete rewrites.',
  },
  {
    icon: FileText,
    title: 'Multiple Tones',
    description: 'Choose from neutral, professional, casual, academic, or storytelling styles.',
  },
  {
    icon: Shield,
    title: 'Detection Bypass',
    description: 'Designed to help your content pass AI detection tools with confidence.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get humanized text in seconds with our optimized processing pipeline.',
  },
  {
    icon: History,
    title: 'Conversion History',
    description: 'Access your last 10 conversions anytime to review or reuse your work.',
  },
];

export default function Index() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      {/* Hero Section */}
      <main className="pt-16">
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                AI Text Humanizer
              </span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-slide-up">
              Make AI Text Sound{' '}
              <span className="text-gradient">Naturally Human</span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Transform AI-generated content into authentic, human-sounding text. 
              Bypass AI detectors while preserving your message's original meaning.
            </p>
            
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button variant="hero" size="xl" asChild>
                <Link to={user ? '/app' : '/auth?mode=signup'}>
                  Start Humanizing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              {!user && (
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/auth">
                    Sign In
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border/50 bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Everything You Need
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                A complete toolkit for transforming AI content into authentic human writing.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-card animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-gradient-card p-8 text-center shadow-elevated sm:p-12">
              <Sparkles className="mx-auto mb-6 h-12 w-12 text-primary" />
              <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
                Ready to Humanize Your Content?
              </h2>
              <p className="mb-8 text-muted-foreground">
                Join thousands of users who trust Humanizer AI to make their content undetectable.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to={user ? '/app' : '/auth?mode=signup'}>
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Humanizer AI. Built with care.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

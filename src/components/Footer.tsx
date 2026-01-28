import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="py-8 mt-12 border-t border-border/40 bg-card/30 backdrop-blur-sm">
            <div className="container mx-auto px-4 text-center">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Humanizer AI. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">
                            Terms of Service
                        </Link>
                    </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground/60 max-w-2xl mx-auto">
                    Disclaimer: This tool is for educational and creative purposes only.
                    Use responsibly and in accordance with academic integrity guidelines.
                </p>
            </div>
        </footer>
    );
}

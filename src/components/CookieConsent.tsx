import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consented = localStorage.getItem('cookie-consent');
        if (!consented) {
            setTimeout(() => setIsVisible(true), 1000); // Delay appearance
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md z-50 animate-slide-up">
            <div className="bg-popover/95 backdrop-blur-lg border border-border shadow-2xl rounded-xl p-5 flex flex-col gap-4">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <h3 className="font-semibold text-foreground mb-1">We use cookies</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            We use cookies to improve your experience and analyze our traffic.
                            By clicking "Accept", you agree to our use of cookies.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
                <div className="flex gap-3 justify-end">
                    <Button variant="outline" size="sm" onClick={() => setIsVisible(false)}>
                        Decline
                    </Button>
                    <Button size="sm" onClick={acceptCookies}>
                        Accept
                    </Button>
                </div>
            </div>
        </div>
    );
}

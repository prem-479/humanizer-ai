import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export function StickyBottomAd() {
    const [isVisible, setIsVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isVisible && isMobile) {
            try {
                if (window.adsbygoogle) {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            } catch (err) {
                console.error('Sticky ad loading error:', err);
            }
        }
    }, [isVisible, isMobile]);

    if (!isVisible || !isMobile) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-charcoal-950 border-t border-amber-500/20 p-2 flex justify-center items-center min-h-[50px] z-50 shadow-lg">
            <button
                onClick={() => setIsVisible(false)}
                className="absolute top-1 right-1 p-1 text-charcoal-200 hover:text-amber-400 transition-colors"
                aria-label="Close ad"
            >
                <X className="h-3 w-3" />
            </button>
            <ins
                className="adsbygoogle"
                style={{ display: 'inline-block', width: '320px', height: '50px' }}
                data-ad-client="ca-pub-XXXXXXXXXX"
                data-ad-slot="XXXXXXXXXX"
            />
        </div>
    );
}

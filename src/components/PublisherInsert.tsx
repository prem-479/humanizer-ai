import { useEffect, useRef } from 'react';

interface PublisherInsertProps {
    slot: string;
    format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
    className?: string;
}

export function PublisherInsert({
    slot,
    format = 'auto',
    className = ''
}: PublisherInsertProps) {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            if (window.adsbygoogle && adRef.current) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.error('Ad loading error:', err);
        }
    }, []);

    return (
        <div className={`publisher-insert ${className}`}>
            <div className="publisher-label">
                Supported by our partners
            </div>
            <div className="publisher-content">
                <ins
                    ref={adRef}
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-XXXXXXXXXX" // Replace with actual AdSense ID
                    data-ad-slot={slot}
                    data-ad-format={format}
                    data-full-width-responsive="true"
                />
            </div>
        </div>
    );
}

// Type declaration for AdSense
declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

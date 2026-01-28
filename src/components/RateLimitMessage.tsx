import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface RateLimitMessageProps {
    retryAfter: number; // seconds
    onRetryReady?: () => void;
}

export function RateLimitMessage({ retryAfter, onRetryReady }: RateLimitMessageProps) {
    const [timeLeft, setTimeLeft] = useState(retryAfter);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                const newTime = Math.max(0, prev - 1);
                if (newTime === 0 && onRetryReady) {
                    onRetryReady();
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onRetryReady]);

    return (
        <div className="ink-well-empty" role="alert" aria-live="polite">
            <div className="flex justify-center mb-2">
                <AlertCircle className="h-8 w-8 text-error" />
            </div>
            <div className="ink-well-empty-title">
                The Ink Well Has Run Dry
            </div>
            <p className="ink-well-empty-message">
                You've reached your humanization limit. Our editorial process needs a moment to refill.
            </p>
            <div className="refill-timer" aria-label={`${timeLeft} seconds remaining`}>
                {timeLeft}s
            </div>
            <div className="refill-label">
                Until Next Request
            </div>
        </div>
    );
}

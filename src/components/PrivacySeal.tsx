import { Lock } from 'lucide-react';
import { useState } from 'react';

export function PrivacySeal() {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            className="privacy-seal"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            role="status"
            aria-label="Privacy indicator"
        >
            <Lock className="w-3 h-3" />
            <span>Private & Secure</span>
            {showTooltip && (
                <div
                    className="absolute top-full right-0 mt-2 px-3 py-2 bg-charcoal-900 text-cream-50 text-xs rounded whitespace-nowrap z-20 shadow-lg"
                    role="tooltip"
                >
                    Your text is encrypted and never stored
                </div>
            )}
        </div>
    );
}

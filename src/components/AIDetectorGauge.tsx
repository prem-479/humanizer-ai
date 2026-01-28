import { useEffect, useState } from 'react';

interface AIDetectorGaugeProps {
    score: number;
    label: string;
}

export function AIDetectorGauge({ score, label }: AIDetectorGaugeProps) {
    const [offset, setOffset] = useState(251); // 2 * PI * r = 2 * PI * 40 approx 251

    useEffect(() => {
        // Calculate stroke-dashoffset based on score
        // Full circle (100) = 0 offset
        // 0 = 251 offset
        const progress = (100 - score) / 100;
        const newOffset = progress * 251;
        setOffset(newOffset);
    }, [score]);

    const getScoreColor = (s: number) => {
        if (s <= 20) return 'stroke-green-500';
        if (s <= 35) return 'stroke-yellow-500';
        return 'stroke-orange-500';
    };

    const getBgColor = (s: number) => {
        if (s <= 20) return 'bg-green-500/10 text-green-600 dark:text-green-400';
        if (s <= 35) return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
        return 'bg-orange-500/10 text-orange-600 dark:text-orange-400';
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-card border border-border/50 shadow-sm animate-fade-in">
            <div className="relative h-32 w-32">
                {/* Background Circle */}
                <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                        className="stroke-muted/20"
                        strokeWidth="8"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                    />
                    {/* Progress Circle */}
                    <circle
                        className={`transition-all duration-1000 ease-out ${getScoreColor(score)}`}
                        strokeWidth="8"
                        strokeDasharray="251"
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                        transform="rotate(-90 50 50)"
                    />
                </svg>

                {/* Central Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-display font-bold text-foreground leading-none">
                        {score}%
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/60">
                        DETECTED
                    </span>
                </div>
            </div>

            <div className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${getBgColor(score)}`}>
                {label}
            </div>
        </div>
    );
}

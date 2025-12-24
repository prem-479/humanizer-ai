import { cn } from '@/lib/utils';

const tones = [
  { id: 'neutral', label: 'Neutral', description: 'Balanced, everyday tone' },
  { id: 'professional', label: 'Professional', description: 'Business-appropriate' },
  { id: 'casual', label: 'Casual', description: 'Relaxed, friendly' },
  { id: 'academic', label: 'Academic', description: 'Scholarly, precise' },
  { id: 'storytelling', label: 'Storytelling', description: 'Engaging, narrative' },
] as const;

export type Tone = typeof tones[number]['id'];

interface ToneSelectorProps {
  value: Tone;
  onChange: (tone: Tone) => void;
  disabled?: boolean;
}

export function ToneSelector({ value, onChange, disabled }: ToneSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        Writing Tone
      </label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {tones.map((tone) => (
          <button
            key={tone.id}
            type="button"
            onClick={() => onChange(tone.id)}
            disabled={disabled}
            className={cn(
              'group relative flex flex-col items-start rounded-lg border p-3 text-left transition-all duration-200',
              'hover:border-primary/50 hover:bg-accent/50',
              'focus:outline-none focus:ring-2 focus:ring-ring',
              value === tone.id
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-input bg-card',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <span className={cn(
              'text-sm font-medium transition-colors',
              value === tone.id ? 'text-primary' : 'text-foreground'
            )}>
              {tone.label}
            </span>
            <span className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
              {tone.description}
            </span>
            {value === tone.id && (
              <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary animate-scale-in" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

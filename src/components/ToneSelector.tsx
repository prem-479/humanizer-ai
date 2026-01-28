import { useState } from 'react';
import { ToneSelector as ToneSelectorType } from './ToneSelector';
import { motion } from 'framer-motion';

export type Tone = 'neutral' | 'professional' | 'casual' | 'academic' | 'storytelling';

interface ToneSelectorProps {
  value: Tone;
  onChange: (tone: Tone) => void;
  disabled?: boolean;
}

const tones: { value: Tone; label: string; description: string; example: string }[] = [
  {
    value: 'neutral',
    label: 'Neutral',
    description: 'Balanced, everyday tone',
    example: 'Clear and straightforward'
  },
  {
    value: 'professional',
    label: 'Professional',
    description: 'Business-appropriate',
    example: 'Polished and formal'
  },
  {
    value: 'casual',
    label: 'Casual',
    description: 'Relaxed and friendly',
    example: 'Easy-going conversation'
  },
  {
    value: 'academic',
    label: 'Academic',
    description: 'Scholarly and precise',
    example: 'Research-oriented style'
  },
  {
    value: 'storytelling',
    label: 'Storytelling',
    description: 'Engaging narrative',
    example: 'Vivid and compelling'
  }
];

export function ToneSelector({ value, onChange, disabled }: ToneSelectorProps) {
  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold text-charcoal-900 tracking-tight">
        Writing Tone
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tones.map((tone, index) => (
          <motion.button
            key={tone.value}
            type="button"
            onClick={() => onChange(tone.value)}
            disabled={disabled}
            data-selected={value === tone.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={`
              relative p-5 rounded-xl border-2 text-left transition-colors duration-300
              hover:border-primary/50 hover:shadow-card
              focus:outline-none focus:ring-2 focus:ring-ring
              disabled:opacity-50 disabled:cursor-not-allowed
              ${value === tone.value
                ? 'border-primary bg-gradient-to-br from-amber-50 to-white shadow-md'
                : 'border-border bg-card/50'
              }
            `}
          >
            {/* Editorial Stamp for selected */}
            {value === tone.value && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 w-5 h-5 flex items-center justify-center border-2 border-primary rounded-full"
              >
                <div className="w-2 h-2 bg-primary rounded-full" />
              </motion.div>
            )}

            <div className="flex flex-col gap-1 pr-6">
              <span className="font-display font-bold text-base text-charcoal-950">
                {tone.label}
              </span>
              <span className="text-xs text-muted-foreground leading-relaxed">
                {tone.description}
              </span>
              <span className="text-[11px] italic text-primary/80 mt-1 font-mono">
                "{tone.example}"
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export type { Tone as ToneType };

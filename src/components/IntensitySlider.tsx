interface IntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const getIntensityLabel = (value: number): string => {
  if (value < 30) return 'Light Touch';
  if (value < 70) return 'Moderate';
  return 'Heavy Rewrite';
};

const getIntensityDescription = (value: number): string => {
  if (value < 30) return 'Minimal changes, preserve structure';
  if (value < 70) return 'Natural rephrasing, varied structure';
  return 'Complete rewrite, maximum variation';
};

export function IntensitySlider({ value, onChange, disabled }: IntensitySliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          Humanization Intensity
        </label>
        <span className="font-mono text-sm font-semibold text-primary">
          {value}%
        </span>
      </div>

      <div className="relative">
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          disabled={disabled}
          className="w-full h-2 rounded-full appearance-none cursor-pointer
            bg-gradient-to-r from-muted via-primary/30 to-primary
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-webkit-slider-thumb]:hover:shadow-glow
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-primary
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:transition-all
            [&::-moz-range-thumb]:hover:scale-110
            [&::-moz-range-thumb]:hover:shadow-glow"
          style={{
            background: `linear-gradient(to right, 
              hsl(var(--muted)) 0%, 
              hsl(var(--primary)) ${value}%, 
              hsl(var(--muted)) ${value}%)`
          }}
        />
      </div>

      <div className="flex items-center justify-between px-1 text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">
        <span>Light</span>
        <span>Heavy</span>
      </div>

      <div className="rounded-lg bg-primary/5 p-4 border border-primary/10">
        <div className="text-center space-y-1">
          <div className="font-display font-bold text-charcoal-950 text-sm">
            {getIntensityLabel(value)}
          </div>
          <div className="text-xs text-muted-foreground leading-tight">
            {getIntensityDescription(value)}
          </div>
        </div>
      </div>
    </div>
  );
}

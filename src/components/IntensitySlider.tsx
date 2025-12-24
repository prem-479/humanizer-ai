import { Slider } from '@/components/ui/slider';

interface IntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const intensityLabels = [
  { min: 0, max: 30, label: 'Light', description: 'Minimal changes, preserves most of the original' },
  { min: 31, max: 70, label: 'Moderate', description: 'Balanced rewriting with natural touches' },
  { min: 71, max: 100, label: 'Heavy', description: 'Significant rewording for maximum humanization' },
];

export function IntensitySlider({ value, onChange, disabled }: IntensitySliderProps) {
  const currentLevel = intensityLabels.find(
    (l) => value >= l.min && value <= l.max
  ) || intensityLabels[1];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          Humanization Intensity
        </label>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-primary/10 px-2.5 py-1 text-sm font-medium text-primary">
            {currentLevel.label}
          </span>
          <span className="text-sm font-mono text-muted-foreground">
            {value}%
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Slider
          value={[value]}
          onValueChange={([v]) => onChange(v)}
          min={0}
          max={100}
          step={1}
          disabled={disabled}
          className="py-2"
        />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Light</span>
          <span>Moderate</span>
          <span>Heavy</span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        {currentLevel.description}
      </p>
    </div>
  );
}

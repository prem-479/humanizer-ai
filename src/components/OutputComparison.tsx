import { useState } from 'react';
import { Copy, Download, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface OutputComparisonProps {
  original: string;
  humanized: string;
  aiScore?: number;
}

export function OutputComparison({ original, humanized, aiScore }: OutputComparisonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(humanized);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([humanized], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'humanized-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('File downloaded');
  };

  const getScoreColor = (score: number) => {
    if (score <= 15) return 'text-green-500';
    if (score <= 25) return 'text-yellow-500';
    return 'text-orange-500';
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* AI Score Badge */}
      {aiScore !== undefined && (
        <div className="flex items-center justify-center gap-3 rounded-lg border border-border bg-card p-4">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">
              AI Detection Score (Simulated)
            </div>
            <div className={`text-3xl font-bold ${getScoreColor(aiScore)}`}>
              {aiScore}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Lower is better
            </div>
          </div>
          <div className="h-12 w-px bg-border" />
          <p className="text-xs text-muted-foreground max-w-[200px]">
            This is a heuristic simulation, not a real AI detector. Actual results may vary.
          </p>
        </div>
      )}

      {/* Comparison Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Original */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Original</h3>
            <span className="text-xs text-muted-foreground">
              {original.length.toLocaleString()} chars
            </span>
          </div>
          <div className="min-h-[200px] rounded-lg border border-input bg-muted/30 p-4">
            <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-muted-foreground">
              {original}
            </p>
          </div>
        </div>

        {/* Arrow for desktop */}
        <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow">
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>

        {/* Humanized */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-primary">Humanized</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {humanized.length.toLocaleString()} chars
              </span>
              <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7">
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-green-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDownload} className="h-7">
                <Download className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          <div className="min-h-[200px] rounded-lg border border-primary/30 bg-primary/5 p-4">
            <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground">
              {humanized}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

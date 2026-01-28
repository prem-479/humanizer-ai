import { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AIDetectorGauge } from './AIDetectorGauge';
import { toast } from 'sonner';

interface OutputComparisonProps {
  original: string;
  humanized: string;
  aiScore?: number;
}

export function OutputComparison({ original, humanized, aiScore }: OutputComparisonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(humanized);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([humanized], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `humanized-text-${new Date().getTime()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Downloaded as .txt');
    } catch {
      toast.error('Failed to download');
    }
  };

  const getScoreColor = (score?: number) => {
    if (!score) return 'text-muted-foreground';
    if (score < 20) return 'text-success';
    if (score < 35) return 'text-warning';
    return 'text-error';
  };

  const getScoreLabel = (score?: number) => {
    if (!score) return 'Calculating...';
    if (score < 20) return 'Highly Human';
    if (score < 35) return 'Mostly Human';
    return 'Human-ish';
  };

  return (
    <div className="space-y-6">
      {/* AI Detection Score */}
      {aiScore !== undefined && (
        <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl bg-muted/20 border border-border/50 shadow-inner">
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-display font-bold text-foreground">
                Detection Analysis
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                Our editorial engine has reconstructed the text to remove robotic signatures.
                The result shows a high probability of passing as human writing across major detectors.
              </p>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-border/40">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">Status</span>
                <span className="text-sm font-semibold text-success flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                  Enhanced
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">Preservation</span>
                <span className="text-sm font-semibold text-foreground">100% Intent</span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <AIDetectorGauge score={aiScore} label={getScoreLabel(aiScore)} />
          </div>
        </div>
      )}

      {/* Humanized Output */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            Humanized Text
          </label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="h-8 shadow-sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Download .txt
            </Button>
            <Button
              variant="hero"
              size="sm"
              onClick={handleCopy}
              className="h-8 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Text
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="result-text min-h-[240px] w-full rounded-lg border border-border bg-card p-4 font-mono text-sm leading-relaxed">
          {humanized.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Character Count Comparison */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Original: {original.length} characters</span>
        <span>Humanized: {humanized.length} characters</span>
      </div>
    </div>
  );
}

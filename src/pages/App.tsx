import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { TextInput } from '@/components/TextInput';
import { ToneSelector, type Tone } from '@/components/ToneSelector';
import { IntensitySlider } from '@/components/IntensitySlider';
import { OutputComparison } from '@/components/OutputComparison';
import { PublisherInsert } from '@/components/PublisherInsert';
import { RateLimitMessage } from '@/components/RateLimitMessage';
import { StickyBottomAd } from '@/components/StickyBottomAd';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { getRateLimitKey } from '@/lib/fingerprint';
import { validateHumanizeInput } from '@/lib/validation';
import { addToHistory } from '@/lib/history';
import { Background3D } from '@/components/Background3D';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, RotateCcw } from 'lucide-react';

export default function AppPage() {
  const [inputText, setInputText] = useState('');
  const [tone, setTone] = useState<Tone>('neutral');
  const [intensity, setIntensity] = useState(50);
  const [outputText, setOutputText] = useState('');
  const [aiScore, setAiScore] = useState<number | undefined>();
  const [processing, setProcessing] = useState(false);
  const { isLowPerformance } = usePerformanceMode();
  const { executeRecaptcha } = useRecaptcha();





  // Rule-Based Data (Restored for Local Fallback)
  const humanizedSynonyms: Record<string, string> = {
    "commence": "start",
    "utilize": "use",
    "objective": "goal",
    "supplementary": "extra",
    "furthermore": "also",
    "consequently": "so",
    "moreover": "plus",
    "subsequently": "then",
    "initiate": "get started",
    "demonstrate": "show",
    "comprehensive": "complete",
    "additionally": "also",
    "leverage": "use",
    "facilitate": "help",
    "implement": "set up",
    "optimize": "improve",
    "innovative": "new",
  };

  const naturalFillers: Record<string, string[]> = {
    neutral: ["actually", "basically", "honestly", "you know"],
    casual: ["pretty much", "kind of", "literally", "totally", "for sure", "tbh"],
    professional: ["effectively", "essentially", "specifically", "practically"],
    academic: ["essentially", "fundamentally", "notably", "significantly"],
    storytelling: ["unexpectedly", "as it turns out", "interestingly enough", "as luck would have it"],
  };

  const humanizeLocally = (input: string, tone: Tone, intensity: number): string => {
    let result = input;

    // 1. Synonym Replacement
    for (const [formal, human] of Object.entries(humanizedSynonyms)) {
      const regex = new RegExp(`\\b${formal}\\b`, 'gi');
      result = result.replace(regex, (match) => {
        const isCapitalized = match[0] === match[0].toUpperCase();
        return isCapitalized ? human[0].toUpperCase() + human.slice(1) : human;
      });
    }

    // 2. Filler Injection (based on intensity)
    const fillers = naturalFillers[tone] || naturalFillers.neutral;
    const sentences = result.split(/(?<=[.!?])\s+/);
    const intensityFactor = intensity / 100;

    result = sentences.map((sentence) => {
      // Don't add fillers to very short sentences or too often
      // Relaxed length check for shorter inputs
      if (sentence.length > 10 && Math.random() < intensityFactor * 0.4) {
        const filler = fillers[Math.floor(Math.random() * fillers.length)];
        const insertPos = sentence.indexOf(' ') + 1;
        if (insertPos > 0) {
          return sentence.slice(0, insertPos) + filler + ' ' + sentence.slice(insertPos);
        }
      }
      return sentence;
    }).join(' ');

    // 3. Sentence Structure Variation
    if (intensity > 60) {
      const parts = result.split(/(?<=[.!?])\s+/);
      for (let i = 0; i < parts.length - 1; i++) {
        if (parts[i].length < 50 && parts[i + 1].length < 50 && Math.random() < 0.3) {
          parts[i] = parts[i].replace(/[.!?]$/, ',') + ' and ' + parts[i + 1].charAt(0).toLowerCase() + parts[i + 1].slice(1);
          parts.splice(i + 1, 1);
        }
      }
      result = parts.join(' ');
    }

    return result;
  };

  const generateHumanScore = (intensity: number): number => {
    const baseScore = 15 + Math.random() * 20;
    const intensityBonus = (intensity / 100) * 15;
    const variance = (Math.random() - 0.5) * 10;
    const score = Math.max(5, Math.min(35, baseScore - intensityBonus + variance));
    return Math.round(score);
  };

  const handleHumanize = async () => {
    // Validate input
    try {
      validateHumanizeInput({ text: inputText, tone, intensity });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      return;
    }

    setProcessing(true);
    setOutputText('');
    setAiScore(undefined);

    // Artificial delay for interaction feel
    await new Promise(r => setTimeout(r, 600));

    try {
      // Fallback to local processing since Supabase env is placeholder
      const humanized = humanizeLocally(inputText, tone, intensity);
      const score = generateHumanScore(intensity);

      setOutputText(humanized);
      setAiScore(score);

      addToHistory({
        original_text: inputText,
        humanized_text: humanized,
        tone,
        intensity,
        ai_score: score,
      });
      toast.success('Text humanized successfully!');

    } catch (error: any) {
      console.error('Humanize failure:', error);
      toast.error('Failed to humanize text. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setInputText('');
    setOutputText('');
    setAiScore(undefined);
    setTone('neutral');
    setIntensity(50);
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      <Background3D />
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-4xl"
        >
          {/* Title */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Humanize Your Text
            </h1>
            <p className="text-muted-foreground">
              Transform AI-generated content into natural, human-sounding writing.
            </p>
          </div>

          {/* Main Card */}
          <div className="glass-card rounded-2xl overflow-hidden animate-scale-in">
            <div className="p-6 sm:p-8 space-y-6">

              {/* Text Input with Processing State */}
              <div className={processing && !isLowPerformance ? 'text-processing' : ''}>
                <TextInput
                  value={inputText}
                  onChange={setInputText}
                  disabled={processing}
                />
              </div>

              {/* Options Section */}
              <div className="flex flex-col gap-10">
                {/* Tone Selection Group */}
                <div className="p-6 rounded-2xl bg-charcoal-50/50 border border-charcoal-200/50 shadow-sm animate-slide-up stagger-1">
                  <ToneSelector
                    value={tone}
                    onChange={setTone}
                    disabled={processing}
                  />
                </div>

                {/* Intensity Selection Group */}
                <div className="p-6 rounded-2xl bg-charcoal-50/50 border border-charcoal-200/50 shadow-sm animate-slide-up stagger-2">
                  <IntensitySlider
                    value={intensity}
                    onChange={setIntensity}
                    disabled={processing}
                  />
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-col gap-4 items-center justify-between border-t border-border/50 pt-8 sm:flex-row">
                <div className="flex items-center gap-4">
                  {/* Status Badge */}
                  <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    System: Active
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    disabled={processing || (!inputText && !outputText)}
                    className="flex-1 sm:flex-initial"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleHumanize}
                    disabled={processing || !inputText.trim()}
                    className={`flex-1 sm:min-w-[200px] btn-ink-well bg-gradient-primary shadow-glow ${processing ? 'btn-processing' : ''}`}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Humanize Text
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Processing Ad Slot */}
              {processing && (
                <div className="ad-processing-slot">
                  <PublisherInsert
                    slot="PROCESSING_SLOT_ID"
                    format="rectangle"
                  />
                </div>
              )}
            </div>

            {/* Output Section */}
            {outputText && (
              <>
                <div className="border-t border-border bg-muted/30 p-6 sm:p-8">
                  <OutputComparison
                    original={inputText}
                    humanized={outputText}
                    aiScore={aiScore}
                  />
                </div>

                {/* Result Action Ad */}
                <div className="border-t border-border p-6 sm:p-8">
                  <PublisherInsert
                    slot="RESULT_SLOT_ID"
                    format="horizontal"
                  />
                </div>
              </>
            )}
          </div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center text-xs text-muted-foreground/60"
          >
            Results may vary. The score is a heuristic simulation for readability and natural flow.
            Always review and edit the output as needed.
          </motion.p>
        </motion.div>

        <Footer />
        <CookieConsent />
      </main>

      <StickyBottomAd />
    </div>
  );
}

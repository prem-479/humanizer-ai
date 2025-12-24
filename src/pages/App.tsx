import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { TextInput } from '@/components/TextInput';
import { ToneSelector, type Tone } from '@/components/ToneSelector';
import { IntensitySlider } from '@/components/IntensitySlider';
import { OutputComparison } from '@/components/OutputComparison';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Sparkles, Loader2, RotateCcw } from 'lucide-react';

export default function AppPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [inputText, setInputText] = useState('');
  const [tone, setTone] = useState<Tone>('neutral');
  const [intensity, setIntensity] = useState(50);
  const [outputText, setOutputText] = useState('');
  const [aiScore, setAiScore] = useState<number | undefined>();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to humanize');
      return;
    }

    if (inputText.trim().length < 20) {
      toast.error('Please enter at least 20 characters');
      return;
    }

    setProcessing(true);
    setOutputText('');
    setAiScore(undefined);

    try {
      const response = await supabase.functions.invoke('humanize', {
        body: { text: inputText, tone, intensity },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to humanize text');
      }

      const { humanizedText, aiScore: score } = response.data;
      
      setOutputText(humanizedText);
      setAiScore(score);

      // Save to history
      if (user) {
        const { error: historyError } = await supabase
          .from('humanization_history')
          .insert({
            user_id: user.id,
            original_text: inputText,
            humanized_text: humanizedText,
            tone,
            intensity,
            ai_score: score,
          });

        if (historyError) {
          console.error('Failed to save history:', historyError);
        }
      }

      toast.success('Text humanized successfully!');
    } catch (error) {
      console.error('Humanize error:', error);
      if (error instanceof Error) {
        if (error.message.includes('429') || error.message.includes('Rate limit')) {
          toast.error('Rate limit exceeded. Please wait a moment and try again.');
        } else if (error.message.includes('402') || error.message.includes('credits')) {
          toast.error('AI credits exhausted. Please add credits to continue.');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error('Failed to humanize text. Please try again.');
      }
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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mx-auto max-w-4xl">
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
          <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
            <div className="p-6 sm:p-8 space-y-6">
              {/* Text Input */}
              <TextInput
                value={inputText}
                onChange={setInputText}
                disabled={processing}
              />

              {/* Options */}
              <div className="grid gap-6 lg:grid-cols-2">
                <ToneSelector
                  value={tone}
                  onChange={setTone}
                  disabled={processing}
                />
                <IntensitySlider
                  value={intensity}
                  onChange={setIntensity}
                  disabled={processing}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <Button
                  variant="secondary"
                  onClick={handleReset}
                  disabled={processing || (!inputText && !outputText)}
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleHumanize}
                  disabled={processing || !inputText.trim()}
                  className="sm:min-w-[200px]"
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Humanizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Humanize Text
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Output */}
            {outputText && (
              <div className="border-t border-border bg-muted/30 p-6 sm:p-8">
                <OutputComparison
                  original={inputText}
                  humanized={outputText}
                  aiScore={aiScore}
                />
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Results may vary. The AI detection score is a heuristic simulation and not a guarantee.
            Always review and edit the output as needed.
          </p>
        </div>
      </main>
    </div>
  );
}

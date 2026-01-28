import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Loader2,
  Trash2,
  Copy,
  Clock,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { format } from 'date-fns';
import { getCleanHistory, deleteFromHistory, type HistoryItem } from '@/lib/history';

export default function HistoryPage() {
  const navigate = useNavigate();

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    try {
      const data = getCleanHistory();
      setHistory(data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    try {
      const updatedHistory = deleteFromHistory(id);
      setHistory(updatedHistory);
      toast.success('Deleted successfully');
    } catch (error) {
      console.error('Failed to delete:', error);
      toast.error('Failed to delete');
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getScoreColor = (score: number | null) => {
    if (score === null) return 'text-muted-foreground';
    if (score <= 15) return 'text-green-500';
    if (score <= 25) return 'text-yellow-500';
    return 'text-orange-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
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
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Conversion History
            </h1>
            <p className="text-muted-foreground">
              Your last 10 text humanizations.
            </p>
          </div>

          {/* History List */}
          {history.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-12 text-center">
              <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                No history yet
              </h2>
              <p className="mb-6 text-muted-foreground">
                Start humanizing text to see your conversion history here.
              </p>
              <Button onClick={() => navigate('/app')}>
                Start Humanizing
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => {
                const isExpanded = expandedId === item.id;

                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-border bg-card overflow-hidden transition-all duration-200 hover:shadow-card"
                  >
                    {/* Header */}
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {item.original_text.slice(0, 60)}
                            {item.original_text.length > 60 ? '...' : ''}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {format(new Date(item.created_at), 'MMM d, yyyy h:mm a')}
                            </span>
                            <span className="capitalize">{item.tone}</span>
                            <span>{item.intensity}% intensity</span>
                            {item.ai_score !== null && (
                              <span className={getScoreColor(item.ai_score)}>
                                {item.ai_score}% Hum
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </button>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="border-t border-border p-4 bg-muted/20 animate-fade-in">
                        <div className="grid gap-4 lg:grid-cols-2">
                          {/* Original */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-muted-foreground">
                                Original
                              </h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopy(item.original_text)}
                                className="h-7"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                            <div className="rounded-lg border border-input bg-card p-3 max-h-[200px] overflow-y-auto">
                              <p className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
                                {item.original_text}
                              </p>
                            </div>
                          </div>

                          {/* Humanized */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-primary">
                                Humanized
                              </h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopy(item.humanized_text)}
                                className="h-7"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 max-h-[200px] overflow-y-auto">
                              <p className="text-sm text-foreground whitespace-pre-wrap font-mono">
                                {item.humanized_text}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <Footer />
        <CookieConsent />
      </main>
    </div>
  );
}

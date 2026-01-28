import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Shield, Zap, Sparkles } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';

export default function Index() {
  const navigate = useNavigate();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Humanizer AI",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Transform AI-generated content into natural human writing with our advanced editorial engine.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container px-4 mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/50 text-amber-700 text-sm font-medium mb-6 animate-fade-in border border-amber-200">
            <Sparkles className="w-4 h-4" />
            <span>Advanced AI Humanization Technology</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 animate-slide-up">
            Transform AI Text into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">
              Natural Human Writing
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up stagger-1 leading-relaxed">
            Bypass AI detectors and preserve your original meaning with our advanced
            editorial engine. Secure, private, and undetectable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up stagger-2">
            <Button
              size="xl"
              className="font-semibold text-lg h-14 px-8 btn-ink-well bg-gradient-primary shadow-glow hover:shadow-elevated"
              onClick={() => navigate('/app')}
            >
              Start Humanizing Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="h-14 px-8 border-2 hover:bg-muted/50"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              How It Works
            </Button>
          </div>
        </div>

        {/* Abstract Background Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-amber-200/20 via-teal-200/10 to-transparent rounded-[100%] blur-3xl -z-10 pointer-events-none" />
      </section>

      {/* Trust Badges */}
      <section className="py-10 border-y border-border/50 bg-card/30">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale transition-all hover:grayscale-0">
            {['Undetectable.ai', 'Turnitin', 'GPTZero', 'Originality.ai'].map((detector) => (
              <div key={detector} className="flex items-center gap-2 font-display font-semibold text-xl text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>Bypasses {detector}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content & SEO Area */}
      <section id="how-it-works" className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* Editorial Content (Left Column) */}
            <div className="lg:col-span-8 space-y-12">

              {/* Introduction */}
              <article className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                  The Art of Humanizing AI Content
                </h2>
                <p className="lead text-xl text-muted-foreground mb-6">
                  In an era dominated by artificial intelligence, the value of authentic human expression has never been higher.
                  While AI tools like ChatGPT and Claude can generate text instantly, they often leave behind subtle digital fingerprints—robotic phrasing,
                  repetitive structures, and a distinct lack of nuance that readers (and detection algorithms) can spot from a mile away.
                </p>
                <p>
                  That's where <strong>Humanizer AI</strong> bridges the gap. We don't just "spin" content with simple synonym replacement.
                  Our "Editorial Intelligence" engine reconstructs your text sentence by sentence, infusing it with the natural
                  variability, idiomatic warmth, and structural complexity that characterizes genuine human writing.
                </p>
              </article>

              {/* Feature Grid */}
              <div className="grid md:grid-cols-2 gap-6 my-12">
                <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                  <Shield className="w-10 h-10 text-teal-600 mb-4" />
                  <h3 className="font-display text-xl font-bold mb-2">Bypass Detection</h3>
                  <p className="text-muted-foreground">
                    Our algorithms are trained against top detectors to ensure your content passes as 100% human.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                  <Zap className="w-10 h-10 text-amber-500 mb-4" />
                  <h3 className="font-display text-xl font-bold mb-2">Preserve Meaning</h3>
                  <p className="text-muted-foreground">
                    Unlike basic spinners, we understand context. Your core message remains intact while the delivery improves.
                  </p>
                </div>
              </div>

              {/* Editorial Section 2 */}
              <article className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                  Why Students and Professionals Choose Us
                </h2>
                <p>
                  For academics, maintaining academic integrity while using AI for research assistance is a delicate balance.
                  Our tool helps ensure that your final submission reflects your own voice, free from the mechanical cadence of LLMs.
                </p>
                <p>
                  For content marketers and SEO professionals, "human" content is king. Search engines like Google prioritize
                  helpful, people-first content. Robotic, AI-generated articles often suffer from poor engagement and lower rankings.
                  Humanizing your copy isn't just about evasion—it's about connecting with your audience on an emotional level.
                </p>
              </article>

              {/* FAQ Section */}
              <div className="pt-12 border-t border-border">
                <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {[
                    { q: "Is this tool free to use?", a: "Yes, we offer a generous free tier supported by our publisher partners. You can humanize up to 500 words per request with no daily limits." },
                    { q: "Does it work with ChatGPT and Claude?", a: "Absolutely. Our engine is specifically tuned to recognize and rewrite the patterns common to GPT-4, Claude 3, and Gemini outputs." },
                    { q: "Is my text private?", a: "Yes. We operate on a strict Zero-Trust architecture. Your inputs are encrypted, processed, and immediately discarded. We never store or learn from your private data." },
                    { q: "Will this affect my SEO?", a: "Positively! By making your content more engaging and readable (increasing dwell time) and removing AI signals, you're likely to see better search performance." }
                  ].map((faq, i) => (
                    <div key={i} className="rounded-lg border border-border p-6 bg-card/50">
                      <h4 className="font-bold text-lg mb-2">{faq.q}</h4>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar (Right Column - Ads) */}
            <div className="hidden lg:block lg:col-span-4 space-y-8">
              <div className="sticky top-24">
                <div className="bg-card border border-border rounded-xl p-6 mb-8 text-center bg-gradient-to-b from-amber-50/50 to-transparent">
                  <h3 className="font-display font-bold text-lg mb-2">Ready to start?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Join thousands of writers refining their content today.
                  </p>
                  <Button className="w-full" onClick={() => navigate('/app')}>
                    Launch Editor
                  </Button>
                </div>

                {/* Sidebar Ad Placeholder 1 */}
                <div className="publisher-insert min-h-[300px] flex items-center justify-center">
                  <div className="text-center opacity-50">
                    <span className="font-mono text-xs uppercase tracking-widest block mb-2">Advertisement</span>
                    {/* Real ad code goes here */}
                  </div>
                </div>

                {/* Sidebar Table of Contents or Links could go here */}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <CookieConsent />
    </div >
  );
}

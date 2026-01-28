import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';

export default function PrivacyPolicy() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-hero">
            <Header />
            <div className="container max-w-3xl mx-auto pt-32 pb-12 px-4 md:pt-40">
                <Button variant="ghost" className="mb-8" onClick={() => navigate('/')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Button>

                <article className="prose prose-lg dark:prose-invert max-w-none">
                    <h1 className="font-display font-bold mb-2">Privacy Policy</h1>
                    <p className="text-muted-foreground text-sm mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to Humanizer AI ("we," "our," or "us"). We are committed to protecting your privacy
                        and ensuring the security of the content you process through our "Editorial Intelligence" engine.
                        This Privacy Policy explains how we collect, use, and safeguard your information.
                    </p>

                    <h2>2. Zero-Trust Architecture & Data Processing</h2>
                    <p>
                        Our service handles sensitive text data. To ensure your privacy, we operate on a strict <strong>Zero-Trust Architecture</strong>:
                    </p>
                    <ul>
                        <li><strong>No Storage of Input/Output:</strong> Text you submit for humanization is processed in memory and explicitly discarded immediately after the response is sent. We do not store your essays, emails, or articles in any database.</li>
                        <li><strong>Encryption:</strong> All data transmitted between your browser and our servers is encrypted using industry-standard TLS 1.2+ protocols.</li>
                        <li><strong>No Model Training:</strong> We do NOT use your submitted text to train our AI models. Your intellectual property remains yours.</li>
                    </ul>

                    <h2>3. Information We Collect</h2>
                    <p>While we do not collect your content, we collect metadata to ensure service stability and security:</p>
                    <ul>
                        <li><strong>Device Fingerprint:</strong> To prevent API abuse and enforce rate limits, we generate a unique, anonymized hash of your device configuration. This cannot be reverse-engineered to identify you personally.</li>
                        <li><strong>Usage Metrics:</strong> We track anonymous aggregated statistics (e.g., "5,000 words processed today") to monitor system performance.</li>
                        <li><strong>Cookies:</strong> We use essential cookies for authentication and preference storage (like Dark Mode settings).</li>
                    </ul>

                    <h2>4. Third-Party Services</h2>
                    <p>We rely on trusted third-party providers to deliver our service:</p>
                    <ul>
                        <li><strong>Google AdSense:</strong> Serves advertisements. Google may use cookies to serve ads based on your prior visits to our website.</li>
                        <li><strong>Supabase:</strong> Provides our backend infrastructure and authentication services.</li>
                        <li><strong>Google reCAPTCHA:</strong> Protects our site from spam and abuse.</li>
                    </ul>

                    <h2>5. Your Rights</h2>
                    <p>
                        Depending on your location, you may have rights regarding your data, including the right to request deletion of your account (if you created one).
                        Since we do not store your content, there is no content data to export or delete.
                    </p>

                    <h2>6. Contact Us</h2>
                    <p>
                        If you have questions about this policy, please contact us at privacy@humanizer-ai.app.
                    </p>
                </article>
            </div>
            <Footer />
            <CookieConsent />
        </div>
    );
}

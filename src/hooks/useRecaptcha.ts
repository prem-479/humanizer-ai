import { useEffect, useState, useCallback } from 'react';

// This key should be in your .env file
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Test key

interface UseRecaptchaReturn {
    isReady: boolean;
    executeRecaptcha: (action: string) => Promise<string>;
}

export function useRecaptcha(): UseRecaptchaReturn {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Check if script is already present
        if (document.getElementById('recaptcha-script')) {
            setIsReady(true);
            return;
        }

        // Load reCAPTCHA script
        const script = document.createElement('script');
        script.id = 'recaptcha-script';
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            setIsReady(true);
        };

        script.onerror = (err) => {
            console.error('Failed to load reCAPTCHA:', err);
        };

        document.head.appendChild(script);

        return () => {
            // We don't remove the script on unmount to reuse it across pages
        };
    }, []);

    const executeRecaptcha = useCallback(async (action: string): Promise<string> => {
        if (!isReady || !window.grecaptcha) {
            console.warn('reCAPTCHA not ready, returning mock token');
            return 'mock-token-not-ready';
        }

        return new Promise((resolve, reject) => {
            try {
                window.grecaptcha.ready(() => {
                    window.grecaptcha
                        .execute(RECAPTCHA_SITE_KEY, { action })
                        .then(resolve)
                        .catch((err: any) => {
                            console.error('reCAPTCHA execution error:', err);
                            // Fail open for UX if reCAPTCHA fails
                            resolve('fallback-token-error');
                        });
                });
            } catch (err) {
                reject(err);
            }
        });
    }, [isReady]);

    return { isReady, executeRecaptcha };
}

// Type declaration
declare global {
    interface Window {
        grecaptcha: any;
    }
}

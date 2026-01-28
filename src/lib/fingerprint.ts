import FingerprintJS from '@fingerprintjs/fingerprintjs';

let fpPromise: Promise<any> | null = null;

export async function getDeviceFingerprint(): Promise<string> {
    try {
        if (!fpPromise) {
            fpPromise = FingerprintJS.load();
        }

        const fp = await fpPromise;
        const result = await fp.get();

        return result.visitorId;
    } catch (error) {
        console.error('Fingerprinting failed:', error);
        // Fallback to a random ID in case of failure (e.g. ad blockers)
        // ensuring the app doesn't break
        return 'fallback-' + Math.random().toString(36).substring(2, 15);
    }
}

// Combine fingerprint with user ID (deprecated) for guest-only rate limiting
export async function getRateLimitKey(_userId?: string): Promise<string> {
    const fingerprint = await getDeviceFingerprint();
    return `device:${fingerprint}`;
}

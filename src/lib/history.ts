export interface HistoryItem {
    id: string;
    original_text: string;
    humanized_text: string;
    tone: string;
    intensity: number;
    ai_score: number | null;
    created_at: string;
}

const STORAGE_KEY = 'humanization_history';
const TTL_MS = 60 * 60 * 1000; // 1 hour

export const getCleanHistory = (): HistoryItem[] => {
    try {
        const rawData = localStorage.getItem(STORAGE_KEY);
        if (!rawData) return [];

        const history: HistoryItem[] = JSON.parse(rawData);
        const now = Date.now();

        // Filter out items older than 1 hour
        const cleanHistory = history.filter((item) => {
            const createdAt = new Date(item.created_at).getTime();
            return now - createdAt < TTL_MS;
        });

        // If items were removed, update localStorage
        if (cleanHistory.length !== history.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanHistory));
        }

        return cleanHistory;
    } catch (error) {
        console.error('Failed to parse history:', error);
        return [];
    }
};

export const addToHistory = (item: Omit<HistoryItem, 'id' | 'created_at'>) => {
    const history = getCleanHistory();
    const newItem: HistoryItem = {
        ...item,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
    };

    const newHistory = [newItem, ...history].slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    return newHistory;
};

export const deleteFromHistory = (id: string) => {
    const history = getCleanHistory();
    const newHistory = history.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    return newHistory;
};

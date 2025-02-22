import { create } from 'zustand';

interface Highlight {
    id: string;
    text: string;
    from: number;
    to: number;
}

interface HighlightStore {
    highlights: Highlight[];
    addHighlight: (highlight: Highlight) => void;
    removeHighlight: (id: string) => void;
    clearHighlights: () => void;
}

// Helper function to safely get stored highlights
const getStoredHighlights = (): Highlight[] => {
    if (typeof window === 'undefined') return [];
    
    try {
        const stored = localStorage.getItem('highlights');
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error loading highlights from localStorage:', error);
        return [];
    }
};

export const useHighlightStore = create<HighlightStore>((set, get) => ({
    // Initialize with stored highlights
    highlights: getStoredHighlights(),
    
    addHighlight: (highlight) => {
        try {
            set((state) => ({
                highlights: [...state.highlights, highlight],
            }));
            localStorage.setItem('highlights', JSON.stringify(get().highlights));
        } catch (error) {
            console.error('Error adding highlight:', error);
        }
    },
    
    removeHighlight: (id) => {
        try {
            set((state) => ({
                highlights: state.highlights.filter((h) => h.id !== id),
            }));
            localStorage.setItem('highlights', JSON.stringify(get().highlights));
        } catch (error) {
            console.error('Error removing highlight:', error);
        }
    },
    
    clearHighlights: () => {
        try {
            set({ highlights: [] });
            localStorage.removeItem('highlights');
        } catch (error) {
            console.error('Error clearing highlights:', error);
        }
    },
}));
import { useQuery } from '@tanstack/react-query';

interface Entity {
    text: string;
    type: 'event' | 'person' | 'cause' | 'political' | 'economic' | 'social' | 'cultural';
    relatedTo?: string[];
}

interface EntityAnalysisResponse {
    entities: Entity[];
    relationships: Array<{
        source: string;
        target: string;
        type: string;
    }>;
}

async function analyzeText(text: string): Promise<EntityAnalysisResponse> {
    const response = await fetch('/api/analyze', { // Calling backend API route
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to analyze text: ${response.status} - ${errorData.error || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;
}

export function useTextAnalysis(text: string) {
    return useQuery<EntityAnalysisResponse, Error>({ // Explicit type definitions and Error type
        queryKey: ['textAnalysis', text],
        queryFn: () => analyzeText(text),
        enabled: !!text && text.length > 0,
        retry: false,
    });
}

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
    const { data, error } = await supabase.functions.invoke('analyze-text', {
        body: { text },
    });

    if (error) {
        throw new Error(`Failed to analyze text: ${error.message}`);
    }

    return data;
}

export function useTextAnalysis(text: string) {
    return useQuery({
        queryKey: ['textAnalysis', text],
        queryFn: () => analyzeText(text),
        enabled: !!text && text.length > 0,
        retry: false,
    });
}

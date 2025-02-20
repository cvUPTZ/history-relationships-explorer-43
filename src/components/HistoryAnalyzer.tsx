
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface AnalysisResult {
  events: Array<{ date?: string; description: string }>;
  people: string[];
  locations: string[];
  terms: string[];
  relationships: Array<{ from: string; to: string; type: string }>;
}

export const HistoryAnalyzer = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const analyzeText = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyzeHistory', {
        body: { text },
      });

      if (error) throw error;

      const parsedAnalysis = JSON.parse(data.analysis);
      setAnalysis(parsedAnalysis);
      toast({
        title: "Analysis Complete",
        description: "Text has been successfully analyzed",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Error",
        description: "Failed to analyze text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter historical text to analyze..."
          className="min-h-[200px]"
        />
      </div>
      <Button 
        onClick={analyzeText} 
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Analyzing..." : "Analyze Text"}
      </Button>

      {analysis && (
        <div className="space-y-6 mt-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Events</h3>
            <ul className="space-y-2">
              {analysis.events.map((event, index) => (
                <li key={index} className="p-2 bg-muted rounded-md">
                  {event.date ? `${event.date}: ` : ''}{event.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">People</h3>
              <ul className="space-y-1">
                {analysis.people.map((person, index) => (
                  <li key={index} className="p-2 bg-muted rounded-md">{person}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Locations</h3>
              <ul className="space-y-1">
                {analysis.locations.map((location, index) => (
                  <li key={index} className="p-2 bg-muted rounded-md">{location}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Key Terms</h3>
              <ul className="space-y-1">
                {analysis.terms.map((term, index) => (
                  <li key={index} className="p-2 bg-muted rounded-md">{term}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Relationships</h3>
            <ul className="space-y-2">
              {analysis.relationships.map((rel, index) => (
                <li key={index} className="p-2 bg-muted rounded-md">
                  {rel.from} → {rel.to} ({rel.type})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};


import { Button } from "@/components/ui/button";
import { Panel } from "@xyflow/react";
import { NodeType } from "../HistoricalNode";

interface RightPanelProps {
    highlights: Array<{ id: string; text: string }>;
    onCreateNodeFromHighlight: (highlight: { id: string; text: string }, type: NodeType) => void;
}

export function RightPanel({ highlights, onCreateNodeFromHighlight }: RightPanelProps) {
    if (highlights.length === 0) return null;

    return (
        <Panel position="top-right" className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Highlights</h3>
            <div className="space-y-2">
                {highlights.map((highlight) => (
                    <div key={highlight.id} className="flex items-center justify-between gap-2">
                        <span>{highlight.text}</span>
                        <div className="flex gap-1">
                            <Button size="sm" onClick={() => onCreateNodeFromHighlight(highlight, 'event')}>
                                Event
                            </Button>
                            <Button size="sm" onClick={() => onCreateNodeFromHighlight(highlight, 'person')}>
                                Person
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </Panel>
    );
}

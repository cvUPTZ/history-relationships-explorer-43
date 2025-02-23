
import { Button } from "@/components/ui/button";
import { Panel } from "@xyflow/react";
import { NodeType } from "../HistoricalNode";

interface LeftPanelProps {
    onFitView: () => void;
    onDownloadPDF: () => void;
    onAddNode: (type: NodeType) => void;
}

export function LeftPanel({ onFitView, onDownloadPDF, onAddNode }: LeftPanelProps) {
    return (
        <Panel position="top-left" className="flex gap-2">
            <Button onClick={onFitView}>Fit View</Button>
            <Button onClick={onDownloadPDF}>Download PDF</Button>
            <Button onClick={() => onAddNode('event')}>Add Event</Button>
            <Button onClick={() => onAddNode('person')}>Add Person</Button>
        </Panel>
    );
}

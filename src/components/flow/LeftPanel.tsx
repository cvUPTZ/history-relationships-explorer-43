
import React from 'react';
import { Node, Edge } from '@xyflow/react';
import { NodeData, EdgeData } from '@/lib/types';

export interface LeftPanelProps {
  onFitView: () => void;
  onDownloadPDF: () => void;
  onAddNode: () => void;
  onAnalyzeText: (text: string) => void;
  nodes: Node<NodeData>[];
  edges: Edge<EdgeData>[];
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  onFitView,
  onDownloadPDF,
  onAddNode,
  onAnalyzeText,
  nodes,
  edges,
}) => {
  return (
    <div className="left-panel">
      <button onClick={onFitView}>Fit View</button>
      <button onClick={onDownloadPDF}>Download PDF</button>
      <button onClick={onAddNode}>Add Node</button>
      <button onClick={() => onAnalyzeText("Sample text")}>Analyze Text</button>
      <div>
        <h3>Statistics</h3>
        <p>Nodes: {nodes.length}</p>
        <p>Edges: {edges.length}</p>
      </div>
    </div>
  );
};

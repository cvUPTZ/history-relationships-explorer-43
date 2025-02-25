
import React from 'react';
import { Node } from '@xyflow/react';
import { NodeData } from '@/lib/types';

export interface RightPanelProps {
  selectedNode: Node<NodeData> | null;
  onNodeUpdate: (node: Node<NodeData>) => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({ selectedNode, onNodeUpdate }) => {
  return (
    <div className="right-panel">
      {selectedNode ? (
        <div>
          <h3>Selected Node</h3>
          <p>ID: {selectedNode.id}</p>
          <p>Label: {selectedNode.data.label}</p>
          {selectedNode.data.description && (
            <p>Description: {selectedNode.data.description}</p>
          )}
        </div>
      ) : (
        <p>No node selected</p>
      )}
    </div>
  );
};

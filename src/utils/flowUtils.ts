
import { Node } from '@xyflow/react';
import { HistoricalNodeData } from '../components/HistoricalNode';

export const getNodePosition = (nodes: Node[]): { x: number; y: number } => {
  if (nodes.length === 0) return { x: 100, y: 100 };

  const lastNode = nodes[nodes.length - 1];
  return {
    x: lastNode.position.x + 250,
    y: lastNode.position.y,
  };
};

export const getNodesBounds = (nodes: Node[]): { x: number; y: number; width: number; height: number } => {
  if (nodes.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  nodes.forEach((node) => {
    const x = node.position.x;
    const y = node.position.y;
    const width = node.width || 240;
    const height = node.height || 100;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x + width);
    maxY = Math.max(maxY, y + height);
  });

  const padding = 50;
  return {
    x: minX - padding,
    y: minY - padding,
    width: maxX - minX + 2 * padding,
    height: maxY - minY + 2 * padding,
  };
};

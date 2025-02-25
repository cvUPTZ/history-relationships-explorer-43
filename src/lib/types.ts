
import { Node, Edge } from "@xyflow/react";

export type NodeType = "default" | "input" | "output" | "custom";
export type EdgeType = "default" | "smooth" | "step" | "smoothstep";

export interface Position {
  x: number;
  y: number;
}

export interface NodeData {
  label: string;
  type: NodeType;
  position: Position;
  description?: string;
  context?: string;
  [key: string]: unknown; // Add index signature for additional properties
}

export interface EdgeData {
  label?: string;
  type?: EdgeType;
  description?: string;
  [key: string]: unknown; // Add index signature for additional properties
}

export interface Entity {
  id: string;
  text: string;
  type: string;
  context?: string;
}

export type { Node, Edge };


import ReactFlow, { Edge, Node, Position } from "reactflow";
import "reactflow/dist/style.css";
import { useMemo } from "react";

interface RelationshipGraphProps {
  relationships: Array<{ from: string; to: string; type: string }>;
  people: string[];
  locations: string[];
  terms: string[];
}

export const RelationshipGraph = ({ relationships, people, locations, terms }: RelationshipGraphProps) => {
  const { nodes, edges } = useMemo(() => {
    const allEntities = new Set([
      ...people,
      ...locations,
      ...terms,
      ...relationships.map((r) => r.from),
      ...relationships.map((r) => r.to),
    ]);

    const entityArray = Array.from(allEntities);
    const radius = Math.min(400, entityArray.length * 50);
    const angleStep = (2 * Math.PI) / entityArray.length;

    const nodes: Node[] = entityArray.map((entity, index) => {
      const angle = index * angleStep;
      const x = radius * Math.cos(angle) + radius;
      const y = radius * Math.sin(angle) + radius;

      let nodeType = "default";
      let style = {};

      if (people.includes(entity)) {
        style = { backgroundColor: "#ff6b6b", color: "white" };
      } else if (locations.includes(entity)) {
        style = { backgroundColor: "#4ecdc4", color: "white" };
      } else if (terms.includes(entity)) {
        style = { backgroundColor: "#45b7d1", color: "white" };
      }

      return {
        id: entity,
        position: { x, y },
        data: { label: entity },
        type: nodeType,
        style: {
          padding: 10,
          borderRadius: "8px",
          ...style,
        },
      };
    });

    const edges: Edge[] = relationships.map((rel, index) => ({
      id: `${rel.from}-${rel.to}-${index}`,
      source: rel.from,
      target: rel.to,
      label: rel.type,
      type: "smoothstep",
      animated: true,
      style: { stroke: "#9b9b9b" },
    }));

    return { nodes, edges };
  }, [relationships, people, locations, terms]);

  return (
    <div className="h-[600px] border rounded-lg overflow-hidden bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        className="bg-muted/20"
      />
    </div>
  );
};

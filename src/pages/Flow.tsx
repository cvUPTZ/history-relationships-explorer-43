
import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Node,
  Position,
  MarkerType
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Handle } from "reactflow";
import { NodeData } from "@/lib/types";
import { LeftPanel } from "@/components/flow/LeftPanel";
import { RightPanel } from "@/components/flow/RightPanel";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 5 },
    draggable: true,
  },
];

const initialEdges = [];

const nodeTypes = {};

const Input = () => {
  return (
    <div>
      <Handle type="source" position={Position.Right} id="a" />
      <div>Input</div>
    </div>
  );
};

const Output = () => {
  return (
    <div>
      Output
      <Handle type="target" position={Position.Left} id="a" />
    </div>
  );
};

const CustomNodeComponent = ({ data }: any) => {
  return (
    <div>
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} id="a" />
      <Handle type="target" position={Position.Left} id="b" />
    </div>
  );
};

const updateNodeDimensions = (nodes: Node[], id: string, dimensions: { width: number; height: number }) => {
  return nodes.map((node) =>
    node.id === id
      ? {
          ...node,
          style: {
            ...node.style,
            width: dimensions.width,
            height: dimensions.height,
          },
        }
      : node,
  );
};

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const nodeRef = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            markerEnd: { type: MarkerType.ArrowClosed, color: "black" },
          },
          eds,
        ),
      ),
    [setEdges],
  );

  const onNodeClick = (event: any, node: Node) => {
    setSelectedNode(node);
  };

  const onNodeDoubleClick = (event: any, node: Node) => {
    console.log("node double clicked", node);
  };

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const reactFlowBounds = nodeRef.current!.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance!.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: String(nodes.length + 1),
        type,
        position,
        data: { label: `${type} node` },
        draggable: true,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodes, setNodes],
  );

  return (
    <div className="page-container">
      <LeftPanel />

      <div className="graph-container" ref={nodeRef}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          fitView
          draggable={true}
          nodesDraggable={true}
          attributionPosition="top-right"
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>

      <RightPanel selectedNode={selectedNode} />
    </div>
  );
};

export default Flow;

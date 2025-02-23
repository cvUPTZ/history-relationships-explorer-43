'use client';

import { useCallback, useState, useEffect } from 'react';
import '@xyflow/react/dist/style.css';
import {
    ReactFlow,
    ReactFlowProvider,
    EdgeTypes,
    MarkerType,
    Background,
    Controls,
    Edge,
    Node,
    NodeChange,
    Connection,
    EdgeChange,
    applyNodeChanges,
    applyEdgeChanges
} from '@xyflow/react';
import HistoricalNode, { HistoricalNodeData } from '../HistoricalNode';
import HistoricalEdge, { HistoricalEdgeData } from '../HistoricalEdge';
import { EdgeDialog } from '../../pages/EdgeDialog';
import { getNodePosition } from '../../utils/flowUtils';
import { useHighlightStore } from '../../utils/highlightStore';
import { LeftPanel } from '../../components/flow/LeftPanel';
import { RightPanel } from '../../components/flow/RightPanel';

const edgeTypes: EdgeTypes = {
    historical: HistoricalEdge,
};

const defaultEdgeOptions = {
    type: 'historical' as const,
    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
    },
};

const nodeTypes = {
    historical: HistoricalNode,
};

const initialNodes: Node<HistoricalNodeData>[] = [];
const initialEdges: Edge<HistoricalEdgeData>[] = [];

const FlowContent = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [nodes, setNodes] = useState<Node<HistoricalNodeData>[]>(initialNodes);
    const [edges, setEdges] = useState<Edge<HistoricalEdgeData>[]>(initialEdges);
    const [isEdgeDialogOpen, setIsEdgeDialogOpen] = useState(false);
    const [edgeSourceNode, setEdgeSourceNode] = useState<string | null>(null);
    const [edgeTargetNode, setEdgeTargetNode] = useState<string | null>(null);

    const { highlights, removeHighlight } = useHighlightStore();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const handleNodeUpdate = (event: Event) => {
            const customEvent = event as CustomEvent<{ id: string; data: HistoricalNodeData }>;
            const { id, data } = customEvent.detail;
            setNodes((nds) =>
                nds.map((node) => (node.id === id ? { ...node, data } : node)) as Node<HistoricalNodeData>[]
            );
        };

        window.addEventListener('updateNodeData', handleNodeUpdate);
        return () => window.removeEventListener('updateNodeData', handleNodeUpdate);
    }, []);

    const fitView = useCallback(() => {
        // fitView function implementation
    }, []);

    const downloadAsPDF = useCallback(() => {
        // downloadAsPDF function implementation
    }, []);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds) as Node<HistoricalNodeData>[]),
        []
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds) as Edge<HistoricalEdgeData>[]),
        []
    );

    const onConnect = useCallback((params: Connection) => {
        if (params.source && params.target) {
            setEdgeSourceNode(params.source);
            setEdgeTargetNode(params.target);
            setIsEdgeDialogOpen(true);
        }
    }, []);

    const handleEdgeComplete = useCallback(
        (type: string, customLabel?: string) => {
            if (!edgeSourceNode || !edgeTargetNode) return;
            const edgeId = `e${edgeSourceNode}-${edgeTargetNode}`;
            const newEdge: Edge<HistoricalEdgeData> = {
                id: edgeId,
                source: edgeSourceNode,
                target: edgeTargetNode,
                type: 'historical',
                data: { type, customLabel },
                animated: true,
            };
            setEdges((eds) => [...eds, newEdge]);
            setEdgeSourceNode(null);
            setEdgeTargetNode(null);
            setIsEdgeDialogOpen(false);
        },
        [edgeSourceNode, edgeTargetNode]
    );

    const createNodeFromHighlight = useCallback(
        (highlight: { id: string; text: string }, type: HistoricalNodeData['type']) => {
            const position = getNodePosition(nodes);
            const newNode: Node<HistoricalNodeData> = {
                id: highlight.id,
                type: 'historical',
                position,
                data: { type, label: highlight.text, description: '' },
            };
            setNodes((nds) => [...nds, newNode]);
            removeHighlight(highlight.id);
        },
        [nodes, removeHighlight]
    );

    const addNode = useCallback(
        (type: HistoricalNodeData['type']) => {
            const newNode: Node<HistoricalNodeData> = {
                id: `${Date.now()}`,
                type: 'historical',
                position: getNodePosition(nodes),
                data: { type, label: `New ${type}`, description: '' },
            };
            setNodes((nds) => [...nds, newNode]);
        },
        [nodes]
    );

    if (!isMounted) return null;

    return (
        <div className="h-screen w-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                fitView
            >
                <Background />
                <Controls />
                <LeftPanel
                    onFitView={fitView}
                    onDownloadPDF={downloadAsPDF}
                    onAddNode={addNode}
                />
                <RightPanel
                    highlights={highlights}
                    onCreateNodeFromHighlight={createNodeFromHighlight}
                />
            </ReactFlow>
            <EdgeDialog
                isOpen={isEdgeDialogOpen}
                onClose={() => setIsEdgeDialogOpen(false)}
                onConfirm={handleEdgeComplete}
                defaultType="related-to"
            />
        </div>
    );
};

const Flow = () => {
    return (
        <ReactFlowProvider>
            <FlowContent />
        </ReactFlowProvider>
    );
};

export default Flow;

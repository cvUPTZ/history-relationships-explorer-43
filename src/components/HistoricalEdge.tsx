
import { BaseEdge, EdgeLabelRenderer, EdgeProps } from '@xyflow/react';
import { useCallback } from 'react';

interface HistoricalEdgeData extends Record<string, unknown> {
  customLabel?: string;
  type?: string;
}

interface HistoricalEdgeProps extends EdgeProps<HistoricalEdgeData> {
  id: string;
  source: string;
  target: string;
  data?: HistoricalEdgeData;
}

export default function HistoricalEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  source,
  target,
  data,
}: HistoricalEdgeProps) {
  const onEdgeClick = useCallback((evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    console.log('Edge clicked:', { id, source, target });
  }, [id, source, target]);

  return (
    <>
      <BaseEdge id={id} sourceX={sourceX} sourceY={sourceY} targetX={targetX} targetY={targetY} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${(sourceX + targetX) / 2}px,${(sourceY + targetY) / 2}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <button 
            className="edge-button"
            onClick={onEdgeClick}
          >
            {data?.customLabel || data?.type || ''}
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

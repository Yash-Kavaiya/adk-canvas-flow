import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AgentConfig } from '@/store/adkStore';
import { ArrowRight, Zap, RotateCcw } from 'lucide-react';

interface WorkflowNodeData {
  label: string;
  config: AgentConfig;
  color: string;
  icon: string;
}

export const WorkflowNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as WorkflowNodeData;
  const { config, color, icon } = nodeData;

  const getExecutionIcon = () => {
    switch (config.execution) {
      case 'sequential':
        return <ArrowRight className="h-3 w-3" />;
      case 'parallel':
        return <Zap className="h-3 w-3" />;
      case 'loop':
        return <RotateCcw className="h-3 w-3" />;
      default:
        return <ArrowRight className="h-3 w-3" />;
    }
  };

  return (
    <Card
      className={`agent-node min-w-[200px] font-roboto ${selected ? 'ring-2 ring-md-sys-color-primary' : ''} md-elevation-2 hover:md-elevation-3 transition-all duration-200`}
      style={{ borderLeftColor: color, borderLeftWidth: '4px' }}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{icon}</span>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate md-text-on-surface md-typescale-label-large">{String(config.name)}</h4>
            <Badge variant="outline" className="text-xs mt-1 bg-md-primary-90/60 md-text-primary border-md-primary-80/40 rounded-full">
              {String(config.execution || 'sequential')}
            </Badge>
          </div>
        </div>

        {config.description && (
          <p className="text-xs md-text-on-surface-variant line-clamp-2 mb-2 md-typescale-body-small">
            {String(config.description)}
          </p>
        )}

        <div className="flex items-center justify-between text-xs md-text-on-surface-variant">
          <div className="flex items-center gap-1">
            {getExecutionIcon()}
            <span className="md-typescale-label-small">Workflow</span>
          </div>
          {config.loop_config && (
            <div className="text-xs md-typescale-label-small">
              Max: {config.loop_config.max_iterations}
            </div>
          )}
        </div>
      </CardContent>

      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-md-sys-color-surface border-2 border-md-sys-color-primary"
      />

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-md-sys-color-surface border-2 border-md-sys-color-primary"
      />

      {/* Side handles for connecting agents */}
      <Handle
        type="target"
        position={Position.Left}
        id="agents-input"
        className="w-3 h-3 !bg-md-sys-color-surface border-2 border-md-sys-color-secondary"
      />

      <Handle
        type="source"
        position={Position.Right}
        id="agents-output"
        className="w-3 h-3 !bg-md-sys-color-surface border-2 border-md-sys-color-secondary"
      />
    </Card>
  );
};

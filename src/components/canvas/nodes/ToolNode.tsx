import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AgentConfig } from '@/store/adkStore';
import { Wrench } from 'lucide-react';

interface ToolNodeData {
  label: string;
  config: AgentConfig;
  color: string;
  icon: string;
}

export const ToolNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as ToolNodeData;
  const { config, color, icon } = nodeData;

  return (
    <Card
      className={`agent-node min-w-[180px] font-roboto ${selected ? 'ring-2 ring-md-sys-color-primary' : ''} md-elevation-2 hover:md-elevation-3 transition-all duration-200`}
      style={{ borderLeftColor: color, borderLeftWidth: '4px' }}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{icon}</span>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate md-text-on-surface md-typescale-label-large">{String(config.name)}</h4>
            <Badge variant="outline" className="text-xs mt-1 bg-md-primary-90/60 md-text-primary border-md-primary-80/40 rounded-full">
              tool
            </Badge>
          </div>
        </div>

        {config.description && (
          <p className="text-xs md-text-on-surface-variant line-clamp-2 mb-2 md-typescale-body-small">
            {String(config.description)}
          </p>
        )}

        <div className="flex items-center gap-1 text-xs md-text-on-surface-variant">
          <Wrench className="h-3 w-3" />
          <span className="md-typescale-label-small">{config.tool_type ? `${config.tool_type} tool` : 'Tool Function'}</span>
        </div>

        {config.requires_gemini_2 && (
          <div className="mt-1">
            <Badge variant="secondary" className="text-xs bg-md-primary-90/60 md-text-primary border-md-primary-80/40 rounded-full">
              Gemini 2.0 Required
            </Badge>
          </div>
        )}
      </CardContent>

      {/* Tool connection handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-md-sys-color-surface border-2 border-md-sys-color-primary"
      />
    </Card>
  );
};

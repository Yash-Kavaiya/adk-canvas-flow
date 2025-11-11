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
      className={`agent-node min-w-[180px] ${selected ? 'ring-2 ring-primary' : ''}`}
      style={{ borderLeftColor: color, borderLeftWidth: '4px' }}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{icon}</span>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">{String(config.name)}</h4>
            <Badge variant="outline" className="text-xs mt-1">
              tool
            </Badge>
          </div>
        </div>
        
        {config.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {String(config.description)}
          </p>
        )}
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Wrench className="h-3 w-3" />
          <span>{config.tool_type ? `${config.tool_type} tool` : 'Tool Function'}</span>
        </div>
        
        {config.requires_gemini_2 && (
          <div className="mt-1">
            <Badge variant="secondary" className="text-xs">
              Gemini 2.0 Required
            </Badge>
          </div>
        )}
      </CardContent>
      
      {/* Tool connection handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-background border-2 border-agent-tool"
      />
    </Card>
  );
};
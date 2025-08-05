import React from 'react';
import { useADKStore, AgentConfig } from '@/store/adkStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Settings, Info } from 'lucide-react';
import { AgentConfigForm } from '../forms/AgentConfigForm';

interface PropertiesPanelProps {
  collapsed: boolean;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ collapsed }) => {
  const { nodes, selectedNodeId, updateNode } = useADKStore();

  const selectedNode = selectedNodeId 
    ? nodes.find(node => node.id === selectedNodeId)
    : null;

  const selectedConfig = selectedNode?.data?.config as AgentConfig | undefined;

  const handleConfigUpdate = (updates: Partial<AgentConfig>) => {
    if (!selectedNode) return;
    
    const updatedConfig = { ...selectedConfig, ...updates };
    updateNode(selectedNode.id, {
      data: {
        ...selectedNode.data,
        config: updatedConfig,
        label: updatedConfig.name || selectedNode.data.label
      }
    });
  };

  if (collapsed) return null;

  return (
    <div className="w-80 bg-properties-background border-l border-properties-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-properties-border">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-semibold text-foreground">Properties</h2>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        {selectedNode ? (
          <div className="p-4 space-y-6">
            {/* Node Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <span className="text-lg">{(selectedNode.data as any).icon}</span>
                  Node Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline"
                    style={{ borderColor: (selectedNode.data as any).color }}
                  >
                    {selectedConfig?.type}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    ID: {selectedNode.id}
                  </span>
                </div>
                
                <div className="text-sm">
                  <span className="text-muted-foreground">Position: </span>
                  <span className="font-mono">
                    x: {Math.round(selectedNode.position.x)}, 
                    y: {Math.round(selectedNode.position.y)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Configuration Form */}
            {selectedConfig && (
              <AgentConfigForm
                config={selectedConfig}
                onUpdate={handleConfigUpdate}
              />
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center space-y-3">
              <Info className="h-12 w-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="font-medium text-foreground">No Selection</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Select a node to view and edit its properties
                </p>
              </div>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
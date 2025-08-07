import React from 'react';
import { useADKStore, AgentConfig } from '@/store/adkStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { GoogleButton } from '@/components/ui/google-button';
import { Settings, Info, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { AgentConfigForm } from '../forms/AgentConfigForm';

interface PropertiesPanelProps {
  collapsed: boolean;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ collapsed }) => {
  const { nodes, selectedNodeId, updateNode, togglePropertiesPanel } = useADKStore();
  const [isMaximized, setIsMaximized] = React.useState(false);

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

  return (
    <div className="relative">
      {/* Collapse/Expand Toggle - Always visible */}
      <GoogleButton
        variant="google-floating"
        size="icon"
        onClick={togglePropertiesPanel}
        className="absolute -left-12 top-4 z-10 shadow-lg"
      >
        {collapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </GoogleButton>

      {!collapsed && (
        <div className={`bg-properties-background border-l border-properties-border flex flex-col transition-all duration-300 ease-in-out ${isMaximized ? 'w-96' : 'w-80'}`}>
          {/* Enhanced Header with Controls */}
          <div className="p-4 border-b border-properties-border bg-properties-header">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-google-blue" />
                <h2 className="font-semibold text-foreground">Properties</h2>
              </div>
              <div className="flex items-center gap-1">
                <GoogleButton
                  variant="google-ghost"
                  size="sm"
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="h-8 w-8 p-0"
                >
                  {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </GoogleButton>
              </div>
            </div>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1">
            {selectedNode ? (
              <div className="p-4 space-y-6">
                {/* Node Info */}
                <Card className="border-border/50 shadow-sm">
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
                        className="border-google-blue text-google-blue bg-google-blue/5"
                      >
                        {selectedConfig?.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        ID: {selectedNode.id}
                      </span>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-muted-foreground">Position: </span>
                      <span className="font-mono text-google-blue">
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
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-google-blue/20 to-google-blue/5 rounded-full flex items-center justify-center mx-auto">
                    <Info className="h-8 w-8 text-google-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">No Selection</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Select a node to view and edit its properties
                    </p>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};
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
      <Button
        variant="filled"
        size="icon"
        onClick={togglePropertiesPanel}
        className="absolute -left-12 top-4 z-10 md-elevation-3 rounded-full w-10 h-10"
      >
        {collapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>

      {!collapsed && (
        <div className={`md-surface-container-low md-text-on-surface border-l border-md-sys-color-outline-variant/30 flex flex-col transition-all duration-md-medium3 ease-md-emphasized md-elevation-1 ${isMaximized ? 'w-96' : 'w-80'}`}>
          {/* Enhanced Header with Controls */}
          <div className="p-4 border-b border-md-sys-color-outline-variant/30 md-surface-container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 md-text-primary" />
                <h2 className="md-typescale-title-medium font-roboto md-text-on-surface">Properties</h2>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="text"
                  size="icon"
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="h-8 w-8 rounded-full"
                >
                  {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1">
            {selectedNode ? (
              <div className="p-4 space-y-6">
                {/* Node Info */}
                <Card variant="elevated" className="md-elevation-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="md-typescale-title-small font-roboto flex items-center gap-2">
                      <span className="text-lg">{(selectedNode.data as any).icon}</span>
                      Node Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary"
                        className="bg-md-primary-90/60 md-text-primary border-md-primary-80/40 md-typescale-label-small font-roboto rounded-full"
                      >
                        {selectedConfig?.type}
                      </Badge>
                      <span className="md-typescale-body-small font-roboto md-text-on-surface-variant">
                        ID: {selectedNode.id}
                      </span>
                    </div>
                    
                    <div className="md-typescale-body-small font-roboto">
                      <span className="md-text-on-surface-variant">Position: </span>
                      <span className="font-mono text-md-sys-color-primary">
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
                  <div className="w-16 h-16 bg-md-sys-color-primary/12 rounded-full flex items-center justify-center mx-auto">
                    <Info className="h-8 w-8 text-md-sys-color-primary" />
                  </div>
                  <div>
                    <h3 className="md-typescale-title-medium font-roboto text-md-sys-color-on-surface">No Selection</h3>
                    <p className="md-typescale-body-medium font-roboto text-md-sys-color-on-surface-variant mt-1">
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
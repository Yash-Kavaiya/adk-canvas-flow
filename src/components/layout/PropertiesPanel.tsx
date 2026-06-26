import React from 'react';
import { useADKStore, AgentConfig } from '@/store/adkStore';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Settings, Info, ChevronLeft, ChevronRight, Maximize2, Minimize2, ArrowRightLeft } from 'lucide-react';
import { AgentConfigForm } from '../forms/AgentConfigForm';

interface PropertiesPanelProps {
  collapsed: boolean;
}

interface NodeConnectionDetail {
  edgeId: string;
  direction: 'Incoming' | 'Outgoing';
  sourceHandle: string;
  targetHandle: string;
  nodeId: string;
  nodeName: string;
  nodeType: string;
  icon?: string;
  config?: AgentConfig;
}

const toPrettyJson = (value: unknown) => JSON.stringify(value ?? {}, null, 2);

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ collapsed }) => {
  const nodes = useADKStore(s => s.nodes);
  const edges = useADKStore(s => s.edges);
  const selectedNodeId = useADKStore(s => s.selectedNodeId);
  const updateNode = useADKStore(s => s.updateNode);
  const togglePropertiesPanel = useADKStore(s => s.togglePropertiesPanel);
  const [isMaximized, setIsMaximized] = React.useState(false);

  const selectedNode = React.useMemo(() => (
    selectedNodeId ? nodes.find(node => node.id === selectedNodeId) : null
  ), [nodes, selectedNodeId]);

  const selectedConfig = React.useMemo(() => (
    selectedNode?.data?.config as AgentConfig | undefined
  ), [selectedNode]);

  const selectedConfigJson = React.useMemo(() => (
    toPrettyJson(selectedConfig)
  ), [selectedConfig]);

  const connectionDetails = React.useMemo<NodeConnectionDetail[]>(() => {
    if (!selectedNodeId) return [];

    return edges
      .filter((edge) => edge.source === selectedNodeId || edge.target === selectedNodeId)
      .map((edge) => {
        const isOutgoing = edge.source === selectedNodeId;
        const connectedNodeId = isOutgoing ? edge.target : edge.source;
        const connectedNode = nodes.find((node) => node.id === connectedNodeId);
        if (!connectedNode) return null;

        const connectedData = connectedNode.data as {
          config?: AgentConfig;
          icon?: string;
          label?: string;
        };
        const connectedConfig = connectedData.config;

        return {
          edgeId: String(edge.id || `${edge.source}-${edge.target}`),
          direction: isOutgoing ? 'Outgoing' : 'Incoming',
          sourceHandle: edge.sourceHandle || 'default',
          targetHandle: edge.targetHandle || 'default',
          nodeId: connectedNode.id,
          nodeName: connectedConfig?.name || connectedData.label || connectedNode.id,
          nodeType: connectedConfig?.type || String(connectedNode.type || 'unknown'),
          icon: connectedData.icon,
          config: connectedConfig,
        };
      })
      .filter((detail): detail is NodeConnectionDetail => detail !== null);
  }, [edges, nodes, selectedNodeId]);

  const handleConfigUpdate = (updates: Partial<AgentConfig>) => {
    if (!selectedNode) return;

    const updatedConfig = { ...selectedConfig, ...updates } as AgentConfig;
    if (JSON.stringify(updatedConfig) === JSON.stringify(selectedConfig)) {
      return;
    }

    updateNode(selectedNode.id, {
      data: {
        ...selectedNode.data,
        config: updatedConfig,
        label: updatedConfig.name || (selectedNode.data as { label?: string }).label
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
        <div className={`md-surface-container-low md-text-on-surface border-l border-md-sys-color-outline-variant/30 flex flex-col transition-[width] duration-md-medium3 ease-md-emphasized md-elevation-1 bg-white/85 backdrop-blur-sm ${isMaximized ? 'w-[32rem]' : 'w-96'}`}>
          {/* Enhanced Header with Controls */}
          <div className="p-4 border-b border-md-sys-color-outline-variant/30 md-surface-container-high">
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
                      <span className="text-lg">{(selectedNode.data as { icon?: string }).icon}</span>
                      Node Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary"
                        className="bg-md-primary-90/60 md-text-primary border-md-primary-80/40 md-typescale-label-small font-roboto rounded-full"
                      >
                        {String(selectedConfig?.type || '')}
                      </Badge>
                      <span className="md-typescale-body-small font-roboto md-text-on-surface-variant">
                        ID: {String(selectedNode.id)}
                      </span>
                    </div>
                    
                    <div className="md-typescale-body-small font-roboto">
                      <span className="md-text-on-surface-variant">Position: </span>
                      <span className="font-mono text-md-sys-color-primary">
                        x: {Math.round(selectedNode.position?.x || 0)}, 
                        y: {Math.round(selectedNode.position?.y || 0)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated" className="md-elevation-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="md-typescale-title-small font-roboto flex items-center gap-2">
                      <Info className="h-4 w-4 md-text-primary" />
                      Full Node Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="max-h-56 overflow-auto rounded-xl border border-md-sys-color-outline-variant/40 bg-[#f8f9fa] p-3 text-xs leading-5 text-[#3c4043]">
                      {selectedConfigJson}
                    </pre>
                  </CardContent>
                </Card>

                <Card variant="elevated" className="md-elevation-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="md-typescale-title-small font-roboto flex items-center gap-2">
                      <ArrowRightLeft className="h-4 w-4 md-text-primary" />
                      Node-to-Node Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {connectionDetails.length === 0 ? (
                      <p className="text-sm text-[#5f6368]">
                        Connect this node to view incoming and outgoing node configuration details.
                      </p>
                    ) : (
                      connectionDetails.map((detail) => (
                        <div
                          key={`${detail.edgeId}-${detail.nodeId}-${detail.direction}`}
                          className="rounded-xl border border-md-sys-color-outline-variant/40 bg-white p-3 space-y-3"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <Badge variant="outline" className="rounded-full">
                                {detail.direction}
                              </Badge>
                              {detail.icon && <span>{detail.icon}</span>}
                              <span className="truncate text-sm font-medium text-[#202124]">{detail.nodeName}</span>
                            </div>
                            <Badge variant="secondary" className="rounded-full bg-[#e8f0fe] text-[#1a73e8] border-[#d2e3fc]">
                              {detail.nodeType}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs text-[#5f6368]">
                            <span>Node ID: {detail.nodeId}</span>
                            <span>Edge ID: {detail.edgeId}</span>
                            <span>Source handle: {detail.sourceHandle}</span>
                            <span>Target handle: {detail.targetHandle}</span>
                          </div>

                          <pre className="max-h-44 overflow-auto rounded-lg border border-md-sys-color-outline-variant/30 bg-[#f8f9fa] p-2 text-xs leading-5 text-[#3c4043]">
                            {toPrettyJson(detail.config)}
                          </pre>
                        </div>
                      ))
                    )}
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
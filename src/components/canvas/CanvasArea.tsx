import React, { useCallback, useRef } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
  NodeTypes,
  BackgroundVariant,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useADKStore, ComponentLibraryItem, AgentConfig } from '@/store/adkStore';
import { AgentNode } from './nodes/AgentNode';
import { WorkflowNode } from './nodes/WorkflowNode';
import { ToolNode } from './nodes/ToolNode';

const nodeTypes: NodeTypes = {
  agent: AgentNode,
  workflow: WorkflowNode,
  tool: ToolNode,
};

let nodeId = 0;
const getId = () => `node_${nodeId++}`;

export const CanvasArea: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { 
    nodes,
    edges,
    setNodes,
    setEdges,
    addNode,
    selectNode,
    selectedNodeId
  } = useADKStore();

  const [localNodes, setLocalNodes, onNodesChange] = useNodesState(nodes);
  const [localEdges, setLocalEdges, onEdgesChange] = useEdgesState(edges);

  // Sync local state with store
  React.useEffect(() => {
    setLocalNodes(nodes);
  }, [nodes, setLocalNodes]);

  React.useEffect(() => {
    setLocalEdges(edges);
  }, [edges, setLocalEdges]);

  React.useEffect(() => {
    setNodes(localNodes);
  }, [localNodes, setNodes]);

  React.useEffect(() => {
    setEdges(localEdges);
  }, [localEdges, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = addEdge({
        ...params,
        type: 'smoothstep',
        animated: true,
        id: `edge_${Date.now()}`,
      }, localEdges);
      setLocalEdges(newEdge);
    },
    [localEdges, setLocalEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const componentData = event.dataTransfer.getData('application/reactflow');
      if (!componentData) return;

      try {
        const component: ComponentLibraryItem = JSON.parse(componentData);

        const position = {
          x: event.clientX - reactFlowBounds.left - 75,
          y: event.clientY - reactFlowBounds.top - 40,
        };

        const newNodeId = getId();
        const newConfig: AgentConfig = {
          id: newNodeId,
          name: `${component.name}_${nodeId}`,
          type: component.type,
          description: component.description,
          ...component.defaultConfig,
        };

        const newNode: Node = {
          id: newNodeId,
          type: getNodeType(component.type),
          position,
          data: {
            label: newConfig.name,
            config: newConfig,
            color: component.color,
            icon: component.icon,
          },
          style: {
            width: 200,
            height: 100,
          },
        };

        addNode(newNode);
        selectNode(newNodeId);
      } catch (error) {
        console.error('Error parsing dropped component:', error);
      }
    },
    [addNode, selectNode]
  );

  const getNodeType = (agentType: string): string => {
    switch (agentType) {
      case 'llm':
      case 'custom':
        return 'agent';
      case 'sequential':
      case 'parallel':
      case 'loop':
        return 'workflow';
      case 'tool':
        return 'tool';
      default:
        return 'agent';
    }
  };

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      selectNode(node.id);
    },
    [selectNode]
  );

  const onPaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  return (
    <div className="flex-1 relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={localNodes}
        edges={localEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        className="canvas-grid"
      >
        <Controls 
          className="bg-surface border border-border rounded-lg shadow-lg"
          showInteractive={false}
        />
        <MiniMap
          className="bg-surface border border-border rounded-lg overflow-hidden"
          zoomable
          pannable
          nodeColor={(node) => {
            const nodeData = node.data as any;
            return nodeData.color || '#94a3b8';
          }}
        />
        <Background 
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="hsl(var(--canvas-grid))"
        />
      </ReactFlow>
    </div>
  );
};
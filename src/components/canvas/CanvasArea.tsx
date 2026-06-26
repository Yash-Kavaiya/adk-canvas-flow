import React, { useCallback, useRef } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  NodeTypes,
  ReactFlowInstance,
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
  const [isDraggingOver, setIsDraggingOver] = React.useState(false);
  const [reactFlowInstance, setReactFlowInstance] = React.useState<ReactFlowInstance | null>(null);

  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    addNode,
    selectNode,
  } = useADKStore();

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => {
      const updatedNodes = applyNodeChanges(changes, useADKStore.getState().nodes);
      setNodes(updatedNodes);
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => {
      const updatedEdges = applyEdgeChanges(changes, useADKStore.getState().edges);
      setEdges(updatedEdges);
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      const currentEdges = useADKStore.getState().edges;
      const newEdge = addEdge({
        ...params,
        type: 'smoothstep',
        animated: true,
        id: `edge_${Date.now()}`,
      }, currentEdges);
      setEdges(newEdge);
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setIsDraggingOver(true);
  }, []);

  const onDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    // Only set to false if we're leaving the canvas area itself, not child elements
    if (!event.currentTarget.contains(event.relatedTarget as Element)) {
      setIsDraggingOver(false);
    }
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDraggingOver(false);

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!reactFlowInstance && !reactFlowBounds) return;

      const componentData = event.dataTransfer.getData('application/reactflow');
      if (!componentData) return;

      try {
        const component: ComponentLibraryItem = JSON.parse(componentData);

        const position = reactFlowInstance
          ? (() => {
              const flowPosition = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
              });
              return { x: flowPosition.x - 75, y: flowPosition.y - 40 };
            })()
          : {
              x: event.clientX - (reactFlowBounds?.left || 0) - 75,
              y: event.clientY - (reactFlowBounds?.top || 0) - 40,
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
    [addNode, reactFlowInstance, selectNode]
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
    <div 
      className="flex-1 relative" 
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        maxZoom={1.8}
        onInit={setReactFlowInstance}
        className={`canvas-grid ${isDraggingOver ? 'drag-over' : ''}`}
        data-dropping={isDraggingOver}
      >
        <Controls 
          className="md-surface-container-high border border-md-sys-color-outline-variant/30 rounded-lg md-elevation-2"
          showInteractive={false}
        />
        <MiniMap
          className="md-surface-container-high border border-md-sys-color-outline-variant/30 rounded-lg overflow-hidden md-elevation-2"
          zoomable
          pannable
          nodeColor={(node) => {
            const nodeData = node.data as { color?: string };
            return nodeData.color || 'rgb(var(--md-sys-color-primary))';
          }}
        />
        <Background 
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1.2}
          color="rgb(var(--md-sys-color-outline-variant))"
        />
      </ReactFlow>
    </div>
  );
};
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Node, Edge, Connection } from '@xyflow/react';

// Agent Types
export type AgentType = 'llm' | 'sequential' | 'parallel' | 'loop' | 'tool' | 'custom';

export interface AgentConfig {
  id: string;
  name: string;
  type: AgentType;
  description: string;
  model?: string;
  instruction?: string;
  temperature?: number;
  max_output_tokens?: number;
  tools?: string[];
  transfer_agents?: string[];
  execution?: 'sequential' | 'parallel' | 'loop';
  loop_config?: {
    max_iterations: number;
    termination_condition: string;
  };
  safety_settings?: Array<{
    category: string;
    threshold: 'OFF' | 'LOW' | 'MEDIUM' | 'HIGH';
  }>;
}

export interface ComponentLibraryItem {
  id: string;
  type: AgentType;
  name: string;
  icon: string;
  color: string;
  description: string;
  category: 'agents' | 'workflow' | 'tools';
  defaultConfig: Partial<AgentConfig>;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  nodes: Node[];
  edges: Edge[];
  config: Record<string, any>;
}

interface ADKStore {
  // Canvas state
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  
  // Project state
  currentProject: Project | null;
  projects: Project[];
  
  // UI state
  sidebarCollapsed: boolean;
  propertiesPanelCollapsed: boolean;
  codeViewVisible: boolean;
  testModeActive: boolean;
  
  // Component library
  componentLibrary: ComponentLibraryItem[];
  
  // Generated code
  generatedCode: string;
  
  // Actions
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node) => void;
  updateNode: (id: string, updates: Partial<Node>) => void;
  deleteNode: (id: string) => void;
  addEdge: (edge: Edge) => void;
  deleteEdge: (id: string) => void;
  
  selectNode: (id: string | null) => void;
  
  // Project actions
  createProject: (name: string, description: string) => void;
  loadProject: (project: Project) => void;
  saveProject: () => void;
  updateProjectMetadata: (updates: Partial<Project>) => void;
  
  // UI actions
  toggleSidebar: () => void;
  togglePropertiesPanel: () => void;
  toggleCodeView: () => void;
  toggleTestMode: () => void;
  
  // Code generation
  generateCode: () => void;
  
  // Component library
  initializeComponentLibrary: () => void;
}

const defaultComponentLibrary: ComponentLibraryItem[] = [
  {
    id: 'llm-agent',
    type: 'llm',
    name: 'LLM Agent',
    icon: '🤖',
    color: 'hsl(var(--agent-llm))',
    description: 'AI agent powered by large language models',
    category: 'agents',
    defaultConfig: {
      type: 'llm',
      model: 'gemini-2.0-flash-exp',
      temperature: 0.7,
      max_output_tokens: 1000,
      tools: [],
    }
  },
  {
    id: 'sequential-agent',
    type: 'sequential',
    name: 'Sequential Agent',
    icon: '➡️',
    color: 'hsl(var(--agent-sequential))',
    description: 'Execute agents in sequence',
    category: 'workflow',
    defaultConfig: {
      type: 'sequential',
      execution: 'sequential',
    }
  },
  {
    id: 'parallel-agent',
    type: 'parallel',
    name: 'Parallel Agent',
    icon: '⚡',
    color: 'hsl(var(--agent-parallel))',
    description: 'Execute agents in parallel',
    category: 'workflow',
    defaultConfig: {
      type: 'parallel',
      execution: 'parallel',
    }
  },
  {
    id: 'loop-agent',
    type: 'loop',
    name: 'Loop Agent',
    icon: '🔄',
    color: 'hsl(var(--agent-loop))',
    description: 'Execute agents in a loop',
    category: 'workflow',
    defaultConfig: {
      type: 'loop',
      execution: 'loop',
      loop_config: {
        max_iterations: 5,
        termination_condition: ''
      }
    }
  },
  {
    id: 'web-search-tool',
    type: 'tool',
    name: 'Web Search',
    icon: '🔍',
    color: 'hsl(var(--agent-tool))',
    description: 'Search the web for information',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'web_search',
    }
  },
  {
    id: 'code-execution-tool',
    type: 'tool',
    name: 'Code Execution',
    icon: '💻',
    color: 'hsl(var(--agent-tool))',
    description: 'Execute code in a sandboxed environment',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'code_execution',
    }
  }
];

export const useADKStore = create<ADKStore>()(
  devtools((set, get) => ({
    // Initial state
    nodes: [],
    edges: [],
    selectedNodeId: null,
    
    currentProject: null,
    projects: [],
    
    sidebarCollapsed: false,
    propertiesPanelCollapsed: false,
    codeViewVisible: false,
    testModeActive: false,
    
    componentLibrary: defaultComponentLibrary,
    generatedCode: '',
    
    // Node/Edge actions
    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),
    
    addNode: (node) => set((state) => ({
      nodes: [...state.nodes, node]
    })),
    
    updateNode: (id, updates) => set((state) => ({
      nodes: state.nodes.map(node => 
        node.id === id ? { ...node, ...updates } : node
      )
    })),
    
    deleteNode: (id) => set((state) => ({
      nodes: state.nodes.filter(node => node.id !== id),
      edges: state.edges.filter(edge => edge.source !== id && edge.target !== id),
      selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId
    })),
    
    addEdge: (edge) => set((state) => ({
      edges: [...state.edges, edge]
    })),
    
    deleteEdge: (id) => set((state) => ({
      edges: state.edges.filter(edge => edge.id !== id)
    })),
    
    selectNode: (id) => set({ selectedNodeId: id }),
    
    // Project actions
    createProject: (name, description) => {
      const project: Project = {
        id: `project-${Date.now()}`,
        name,
        description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        nodes: [],
        edges: [],
        config: {}
      };
      
      set((state) => ({
        currentProject: project,
        projects: [...state.projects, project],
        nodes: [],
        edges: [],
        selectedNodeId: null
      }));
    },
    
    loadProject: (project) => set({
      currentProject: project,
      nodes: project.nodes,
      edges: project.edges
    }),
    
    saveProject: () => {
      const { currentProject, nodes, edges } = get();
      if (!currentProject) return;
      
      const updatedProject: Project = {
        ...currentProject,
        nodes,
        edges,
        updated_at: new Date().toISOString()
      };
      
      set((state) => ({
        currentProject: updatedProject,
        projects: state.projects.map(p => 
          p.id === updatedProject.id ? updatedProject : p
        )
      }));
    },
    
    updateProjectMetadata: (updates) => {
      const { currentProject } = get();
      if (!currentProject) return;
      
      const updatedProject = { ...currentProject, ...updates };
      set((state) => ({
        currentProject: updatedProject,
        projects: state.projects.map(p => 
          p.id === updatedProject.id ? updatedProject : p
        )
      }));
    },
    
    // UI actions
    toggleSidebar: () => set((state) => ({
      sidebarCollapsed: !state.sidebarCollapsed
    })),
    
    togglePropertiesPanel: () => set((state) => ({
      propertiesPanelCollapsed: !state.propertiesPanelCollapsed
    })),
    
    toggleCodeView: () => set((state) => ({
      codeViewVisible: !state.codeViewVisible
    })),
    
    toggleTestMode: () => set((state) => ({
      testModeActive: !state.testModeActive
    })),
    
    // Code generation
    generateCode: () => {
      const { nodes, edges } = get();
      
      // Basic code generation logic
      const imports = `from google.adk import Agent, SequentialAgent, ParallelAgent, LoopAgent
from google.adk.tools import web_search, code_execution
from google.adk.runner import LocalRunner`;
      
      const agentDefinitions = nodes
        .filter(node => node.type !== 'group')
        .map(node => {
          const config = node.data.config as AgentConfig;
          
          if (config.type === 'llm') {
            return `
${config.name} = Agent(
    name="${config.name}",
    model="${config.model || 'gemini-2.0-flash-exp'}",
    description="${config.description}",
    instruction="""${config.instruction || ''}""",
    tools=[${config.tools?.map(t => `${t}`).join(', ') || ''}],
    temperature=${config.temperature || 0.7},
    max_output_tokens=${config.max_output_tokens || 1000}
)`;
          }
          
          return `# ${config.name} - ${config.type} agent`;
        })
        .join('\n');
      
      const mainExecution = `
if __name__ == "__main__":
    runner = LocalRunner()
    result = runner.run(${(nodes[0]?.data?.config as AgentConfig)?.name || 'agent'}, user_query="Your query here")
    print(result)`;
      
      const code = `${imports}\n\n# Agent Definitions${agentDefinitions}\n\n# Main Execution${mainExecution}`;
      
      set({ generatedCode: code });
    },
    
    initializeComponentLibrary: () => {
      set({ componentLibrary: defaultComponentLibrary });
    }
  }))
);
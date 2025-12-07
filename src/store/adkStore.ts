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
  // Tool-specific properties
  tool_type?: string; // 'function' | 'long_running' | 'agent' | 'builtin' | 'toolset' | ...
  requires_gemini_2?: boolean;
  // Function tool attributes
  function_signature?: {
    params?: Array<{ name: string; type?: string; required?: boolean; default?: string | number | boolean | null; description?: string }>;
    return_type?: string;
    docstring?: string;
  };
  is_long_running?: boolean;
  is_agent_tool?: boolean;
  skip_summarization?: boolean;
  // Auth metadata for tools that require it
  auth?: {
    requires_auth?: boolean;
    auth_type?: 'apikey' | 'oauth2' | 'service_account' | 'bearer' | 'none';
    scopes?: string[];
  };
  // Built-in constraints and metadata
  built_in_constraints?: {
    single_tool_restriction?: boolean;
    no_sub_agents?: boolean;
  };
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
  config: Record<string, string | number | boolean | null | undefined>;
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
    color: '#1a73e8', // Google Blue
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
    color: '#34a853', // Google Green
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
    color: '#fbbc04', // Google Yellow
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
    color: '#ea4335', // Google Red
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
  // Function Tools
  {
    id: 'function-tool',
    type: 'tool',
    name: 'Function Tool',
    icon: '⚙️',
    color: '#00796b', // Google Teal
    description: 'Custom Python function as agent tool',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'custom_function',
      tool_type: 'function'
    }
  },
  {
    id: 'long-running-tool',
    type: 'tool',
    name: 'Long Running Tool',
    icon: '⏳',
    color: '#00796b', // Google Teal,
    description: 'Long-running operation with status tracking',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'long_running_operation',
      tool_type: 'long_running'
    }
  },
  {
    id: 'agent-as-tool',
    type: 'tool',
    name: 'Agent as Tool',
    icon: '🤖',
    color: '#00796b', // Google Teal,
    description: 'Wrap another agent as a tool',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'agent_tool',
      tool_type: 'agent'
    }
  },

  // Built-in Tools
  {
    id: 'google-search-tool',
    type: 'tool',
    name: 'Google Search',
    icon: '🔍',
    color: '#00796b', // Google Teal,
    description: 'Search the web using Google Search (Gemini 2.0 only)',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'google_search',
      tool_type: 'builtin',
      requires_gemini_2: true
    }
  },
  {
    id: 'code-execution-tool',
    type: 'tool',
    name: 'Code Execution',
    icon: '💻',
    color: '#00796b', // Google Teal,
    description: 'Execute Python code in sandboxed environment',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'code_execution',
      tool_type: 'builtin'
    }
  },
  {
    id: 'vertex-ai-search-tool',
    type: 'tool',
    name: 'Vertex AI Search',
    icon: '📚',
    color: '#00796b', // Google Teal,
    description: 'Search across private data stores with grounding',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'vertex_ai_search',
      tool_type: 'builtin'
    }
  },
  {
    id: 'bigquery-toolset',
    type: 'tool',
    name: 'BigQuery Toolset',
    icon: '📊',
    color: '#00796b', // Google Teal,
    description: 'Query and analyze data in BigQuery',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'bigquery_tools',
      tool_type: 'toolset'
    }
  },

  // Third-Party Integration Tools
  {
    id: 'langchain-tool',
    type: 'tool',
    name: 'LangChain Tool',
    icon: '🔗',
    color: '#00796b', // Google Teal,
    description: 'Integrate any LangChain BaseTool',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'langchain_integration',
      tool_type: 'langchain'
    }
  },
  {
    id: 'crewai-tool',
    type: 'tool',
    name: 'CrewAI Tool',
    icon: '🚢',
    color: '#00796b', // Google Teal,
    description: 'Integrate CrewAI tools with custom metadata',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'crewai_integration',
      tool_type: 'crewai'
    }
  },

  // Google Cloud Tools
  {
    id: 'apigee-hub-tool',
    type: 'tool',
    name: 'Apigee API Hub',
    icon: '🌐',
    color: '#00796b', // Google Teal,
    description: 'Tools from Apigee API Hub with authentication',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'apigee_hub_tools',
      tool_type: 'apigee'
    }
  },
  {
    id: 'app-integration-tool',
    type: 'tool',
    name: 'Application Integration',
    icon: '🔄',
    color: '#00796b', // Google Teal,
    description: 'Connect to Salesforce, SAP, and other systems',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'app_integration',
      tool_type: 'integration'
    }
  },
  {
    id: 'toolbox-database-tool',
    type: 'tool',
    name: 'Toolbox Database',
    icon: '🗄️',
    color: '#00796b', // Google Teal,
    description: 'Connect to databases via Toolbox server',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'toolbox_database',
      tool_type: 'toolbox'
    }
  },

  // MCP Tools
  {
    id: 'mcp-client-tool',
    type: 'tool',
    name: 'MCP Client',
    icon: '🔌',
    color: '#00796b', // Google Teal,
    description: 'Connect to Model Context Protocol servers',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'mcp_client',
      tool_type: 'mcp_client'
    }
  },
  {
    id: 'mcp-server-tool',
    type: 'tool',
    name: 'MCP Server',
    icon: '🖥️',
    color: '#00796b', // Google Teal,
    description: 'Expose ADK tools as MCP server',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'mcp_server',
      tool_type: 'mcp_server'
    }
  },

  // OpenAPI Tools
  {
    id: 'openapi-toolset',
    type: 'tool',
    name: 'OpenAPI Toolset',
    icon: '📋',
    color: '#00796b', // Google Teal,
    description: 'Auto-generate tools from OpenAPI specifications',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'openapi_tools',
      tool_type: 'openapi'
    }
  },
  {
    id: 'rest-api-tool',
    type: 'tool',
    name: 'REST API Tool',
    icon: '🌍',
    color: '#00796b', // Google Teal,
    description: 'Generic REST API client with authentication',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'rest_api_client',
      tool_type: 'rest_api'
    }
  },

  // Authentication Tools
  {
    id: 'oauth2-auth-tool',
    type: 'tool',
    name: 'OAuth2 Authentication',
    icon: '🔐',
    color: '#00796b', // Google Teal,
    description: 'Handle OAuth2 authentication flows',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'oauth2_auth',
      tool_type: 'auth'
    }
  },
  {
    id: 'service-account-tool',
    type: 'tool',
    name: 'Service Account Auth',
    icon: '🗝️',
    color: '#00796b', // Google Teal,
    description: 'Authenticate using Google Service Account',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'service_account_auth',
      tool_type: 'service_account'
    }
  },

  // Specialized Domain Tools
  {
    id: 'file-operations-tool',
    type: 'tool',
    name: 'File Operations',
    icon: '📁',
    color: '#00796b', // Google Teal,
    description: 'Read, write, and manipulate files',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'file_operations',
      tool_type: 'file_system'
    }
  },
  {
    id: 'email-tool',
    type: 'tool',
    name: 'Email Integration',
    icon: '📧',
    color: '#00796b', // Google Teal,
    description: 'Send and manage emails',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'email_integration',
      tool_type: 'email'
    }
  },
  {
    id: 'calendar-tool',
    type: 'tool',
    name: 'Calendar Integration',
    icon: '📅',
    color: '#00796b', // Google Teal,
    description: 'Manage calendar events and scheduling',
    category: 'tools',
    defaultConfig: {
      type: 'tool',
      name: 'calendar_integration',
      tool_type: 'calendar'
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
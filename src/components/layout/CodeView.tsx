import React, { useEffect } from 'react';
import { useADKStore } from '@/store/adkStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Copy, 
  Download, 
  RefreshCw, 
  FileText,
  Braces,
  Settings 
} from 'lucide-react';
import Editor from '@monaco-editor/react';

export const CodeView: React.FC = () => {
  const { 
    generatedCode, 
    generateCode, 
    nodes,
    edges,
    currentProject 
  } = useADKStore();

  useEffect(() => {
    generateCode();
  }, [nodes, edges, generateCode]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      // Could add toast notification here
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const handleDownloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProject?.name || 'adk_agents'}.py`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const projectConfig = {
    name: currentProject?.name || 'Untitled Project',
    description: currentProject?.description || '',
    agents: nodes.length,
    connections: edges.length,
    tools: nodes.filter(n => (n.data as any)?.config?.type === 'tool').length
  };

  const requirementsTxt = `google-adk>=1.0.0
python-dotenv>=1.0.0
requests>=2.31.0`;

  const dockerFile = `FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY main.py .

CMD ["python", "main.py"]`;

  return (
    <div className="h-full bg-code-background text-code-foreground flex flex-col">
      {/* Header */}
      <div className="px-4 py-2 border-b border-border bg-surface">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium">Generated Code</span>
            <Badge variant="secondary" className="text-xs">
              Python
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={generateCode}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Regenerate
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyCode}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownloadCode}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Code Tabs */}
      <Tabs defaultValue="main" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none bg-surface border-b border-border p-0">
          <TabsTrigger value="main" className="gap-2">
            <FileText className="h-4 w-4" />
            main.py
          </TabsTrigger>
          <TabsTrigger value="config" className="gap-2">
            <Braces className="h-4 w-4" />
            Project Config
          </TabsTrigger>
          <TabsTrigger value="requirements" className="gap-2">
            <Settings className="h-4 w-4" />
            Deployment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="main" className="flex-1 m-0">
          <Editor
            height="100%"
            defaultLanguage="python"
            value={generatedCode}
            theme="vs-dark"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 13,
              fontFamily: 'JetBrains Mono, Consolas, monospace',
              wordWrap: 'on',
              lineNumbers: 'on',
              folding: true,
              renderWhitespace: 'selection',
            }}
          />
        </TabsContent>

        <TabsContent value="config" className="flex-1 m-0 p-4 overflow-auto">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <p className="font-medium">{projectConfig.name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Agents:</span>
                    <p className="font-medium">{projectConfig.agents}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Connections:</span>
                    <p className="font-medium">{projectConfig.connections}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tools:</span>
                    <p className="font-medium">{projectConfig.tools}</p>
                  </div>
                </div>
                
                {projectConfig.description && (
                  <>
                    <Separator />
                    <div>
                      <span className="text-muted-foreground text-sm">Description:</span>
                      <p className="mt-1">{projectConfig.description}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requirements" className="flex-1 m-0 p-4 overflow-auto">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">requirements.txt</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm font-mono bg-muted p-3 rounded border overflow-x-auto">
                  {requirementsTxt}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dockerfile</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm font-mono bg-muted p-3 rounded border overflow-x-auto">
                  {dockerFile}
                </pre>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
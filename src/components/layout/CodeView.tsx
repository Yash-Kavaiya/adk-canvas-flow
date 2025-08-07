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
    <div className="h-full md-surface-container-lowest md-text-on-surface flex flex-col font-roboto">
      {/* Header */}
      <div className="px-4 py-3 border-b border-md-sys-color-outline-variant/30 md-surface-container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 md-text-primary" />
            <span className="md-typescale-title-medium font-medium md-text-on-surface">Generated Code</span>
            <Badge variant="secondary" className="md-typescale-label-small bg-md-secondary-90/60 md-text-secondary border-md-secondary-80/40 rounded-full">
              Python
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="text"
              size="sm"
              onClick={generateCode}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Regenerate
            </Button>
            
            <Button
              variant="text"
              size="sm"
              onClick={handleCopyCode}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
            
            <Button
              variant="filled"
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
        <TabsList className="w-full justify-start rounded-none md-surface-container-high border-b border-md-sys-color-outline-variant/30 p-0">
          <TabsTrigger value="main" className="gap-2 md-text-on-surface hover:md-surface-container data-[state=active]:md-surface-primary data-[state=active]:md-text-on-primary md-typescale-label-large">
            <FileText className="h-4 w-4" />
            main.py
          </TabsTrigger>
          <TabsTrigger value="config" className="gap-2 md-text-on-surface hover:md-surface-container data-[state=active]:md-surface-primary data-[state=active]:md-text-on-primary md-typescale-label-large">
            <Braces className="h-4 w-4" />
            Project Config
          </TabsTrigger>
          <TabsTrigger value="requirements" className="gap-2 md-text-on-surface hover:md-surface-container data-[state=active]:md-surface-primary data-[state=active]:md-text-on-primary md-typescale-label-large">
            <Settings className="h-4 w-4" />
            Deployment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="main" className="flex-1 m-0">
          <Editor
            height="100%"
            defaultLanguage="python"
            value={generatedCode}
            theme="light"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 13,
              fontFamily: 'Roboto Mono, JetBrains Mono, Consolas, monospace',
              wordWrap: 'on',
              lineNumbers: 'on',
              folding: true,
              renderWhitespace: 'selection',
              background: 'rgb(var(--md-sys-color-surface))',
            }}
          />
        </TabsContent>

        <TabsContent value="config" className="flex-1 m-0 p-4 overflow-auto md-surface-container">
          <div className="space-y-4">
            <Card variant="elevated" className="md-elevation-2">
              <CardHeader>
                <CardTitle className="md-typescale-title-large md-text-on-surface">Project Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 md-typescale-body-medium">
                  <div>
                    <span className="md-text-on-surface-variant">Name:</span>
                    <p className="font-medium md-text-on-surface">{projectConfig.name}</p>
                  </div>
                  <div>
                    <span className="md-text-on-surface-variant">Agents:</span>
                    <p className="font-medium md-text-on-surface">{projectConfig.agents}</p>
                  </div>
                  <div>
                    <span className="md-text-on-surface-variant">Connections:</span>
                    <p className="font-medium md-text-on-surface">{projectConfig.connections}</p>
                  </div>
                  <div>
                    <span className="md-text-on-surface-variant">Tools:</span>
                    <p className="font-medium md-text-on-surface">{projectConfig.tools}</p>
                  </div>
                </div>
                
                {projectConfig.description && (
                  <>
                    <Separator className="bg-md-sys-color-outline-variant/30" />
                    <div>
                      <span className="md-text-on-surface-variant md-typescale-body-medium">Description:</span>
                      <p className="mt-1 md-text-on-surface md-typescale-body-medium">{projectConfig.description}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requirements" className="flex-1 m-0 p-4 overflow-auto md-surface-container">
          <div className="space-y-4">
            <Card variant="elevated" className="md-elevation-2">
              <CardHeader>
                <CardTitle className="md-typescale-title-large md-text-on-surface">requirements.txt</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="md-typescale-body-small font-mono md-surface-container-high md-text-on-surface p-3 rounded border-md-sys-color-outline-variant/30 overflow-x-auto border">
                  {requirementsTxt}
                </pre>
              </CardContent>
            </Card>

            <Card variant="elevated" className="md-elevation-2">
              <CardHeader>
                <CardTitle className="md-typescale-title-large md-text-on-surface">Dockerfile</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="md-typescale-body-small font-mono md-surface-container-high md-text-on-surface p-3 rounded border-md-sys-color-outline-variant/30 overflow-x-auto border">
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
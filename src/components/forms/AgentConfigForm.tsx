import React from 'react';
import { AgentConfig } from '@/store/adkStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageSquare, Settings, Zap } from 'lucide-react';

interface AgentConfigFormProps {
  config: AgentConfig;
  onUpdate: (updates: Partial<AgentConfig>) => void;
}

export const AgentConfigForm: React.FC<AgentConfigFormProps> = ({ config, onUpdate }) => {
  const handleInputChange = (field: keyof AgentConfig, value: AgentConfig[keyof AgentConfig]) => {
    onUpdate({ [field]: value });
  };

  const renderLLMConfig = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Bot className="h-4 w-4" />
          LLM Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Select 
            value={config.model || 'gemini-2.0-flash-exp'} 
            onValueChange={(value) => handleInputChange('model', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gemini-2.0-flash-exp">Gemini 2.0 Flash Exp</SelectItem>
              <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
              <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
              <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
              <SelectItem value="gpt-4o">GPT-4o</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="instruction">System Instruction</Label>
          <Textarea
            id="instruction"
            placeholder="Enter the agent's system instruction..."
            value={config.instruction || ''}
            onChange={(e) => handleInputChange('instruction', e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Temperature</Label>
              <Badge variant="outline" className="text-xs">
                {String(config.temperature || 0.7)}
              </Badge>
            </div>
            <Slider
              value={[config.temperature || 0.7]}
              onValueChange={([value]) => handleInputChange('temperature', value)}
              max={1}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Max Output Tokens</Label>
              <Badge variant="outline" className="text-xs">
                {String(config.max_output_tokens || 1000)}
              </Badge>
            </div>
            <Slider
              value={[config.max_output_tokens || 1000]}
              onValueChange={([value]) => handleInputChange('max_output_tokens', value)}
              max={4000}
              min={100}
              step={100}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderWorkflowConfig = () => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Workflow Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Execution Type</Label>
          <Select 
            value={config.execution || 'sequential'} 
            onValueChange={(value) => handleInputChange('execution', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sequential">Sequential</SelectItem>
              <SelectItem value="parallel">Parallel</SelectItem>
              <SelectItem value="loop">Loop</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {config.execution === 'loop' && (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Max Iterations</Label>
              <Input
                type="number"
                value={config.loop_config?.max_iterations || 5}
                onChange={(e) => handleInputChange('loop_config', {
                  ...config.loop_config,
                  max_iterations: parseInt(e.target.value) || 5
                })}
                min={1}
                max={100}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Termination Condition</Label>
              <Textarea
                placeholder="Optional termination condition..."
                value={config.loop_config?.termination_condition || ''}
                onChange={(e) => handleInputChange('loop_config', {
                  ...config.loop_config,
                  termination_condition: e.target.value
                })}
                rows={2}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      {/* Basic Configuration */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Basic Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={String(config.name || '')}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Agent name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={String(config.description || '')}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Agent description"
              rows={2}
              className="resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Type-specific configuration */}
      {config.type === 'llm' && renderLLMConfig()}
      {['sequential', 'parallel', 'loop'].includes(config.type) && renderWorkflowConfig()}
    </div>
  );
};
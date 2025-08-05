import React, { useState } from 'react';
import { useADKStore } from '@/store/adkStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Square, 
  MessageSquare, 
  Bot, 
  User,
  Clock,
  Zap,
  AlertCircle
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  agentId?: string;
  status?: 'pending' | 'completed' | 'error';
}

export const TestPanel: React.FC = () => {
  const { nodes, toggleTestMode } = useADKStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || isRunning) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsRunning(true);

    // Simulate agent execution
    try {
      const systemMessage: Message = {
        id: `msg-${Date.now()}-system`,
        type: 'system',
        content: 'Starting agent execution...',
        timestamp: new Date(),
        status: 'pending'
      };

      setMessages(prev => [...prev, systemMessage]);

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      const agentMessage: Message = {
        id: `msg-${Date.now()}-agent`,
        type: 'agent',
        content: `I've processed your request: "${input.trim()}". This is a simulated response from the agent system. In a real implementation, this would execute your configured agents and return their output.`,
        timestamp: new Date(),
        agentId: nodes[0]?.id,
        status: 'completed'
      };

      setMessages(prev => prev.map(msg => 
        msg.id === systemMessage.id 
          ? { ...msg, content: 'Agent execution completed', status: 'completed' as const }
          : msg
      ).concat(agentMessage));

    } catch (error) {
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        type: 'system',
        content: 'Error occurred during agent execution',
        timestamp: new Date(),
        status: 'error'
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    const stopMessage: Message = {
      id: `msg-${Date.now()}-stop`,
      type: 'system',
      content: 'Execution stopped by user',
      timestamp: new Date(),
      status: 'error'
    };
    setMessages(prev => [...prev, stopMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const getMessageIcon = (message: Message) => {
    switch (message.type) {
      case 'user':
        return <User className="h-4 w-4" />;
      case 'agent':
        return <Bot className="h-4 w-4 text-google-blue" />;
      case 'system':
        if (message.status === 'error') return <AlertCircle className="h-4 w-4 text-destructive" />;
        if (message.status === 'pending') return <Clock className="h-4 w-4 text-warning" />;
        return <Zap className="h-4 w-4 text-success" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-surface border-l border-border shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-google-blue" />
            <h2 className="font-semibold">Test Console</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTestMode}
            className="text-muted-foreground"
          >
            ✕
          </Button>
        </div>
        
        <div className="mt-2 flex items-center gap-2">
          <Badge variant={nodes.length > 0 ? "default" : "secondary"}>
            {nodes.length} agent{nodes.length !== 1 ? 's' : ''}
          </Badge>
          {isRunning && (
            <Badge variant="outline" className="animate-pulse">
              Running
            </Badge>
          )}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Start a conversation to test your agents</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    {getMessageIcon(message)}
                  </div>
                  <Card className={`max-w-[280px] ${message.type === 'user' ? 'bg-primary text-primary-foreground' : ''}`}>
                    <CardContent className="p-3">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.status && (
                          <Badge variant="outline" className="text-xs">
                            {message.status}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isRunning}
            className="flex-1"
          />
          {isRunning ? (
            <Button
              onClick={handleStop}
              variant="destructive"
              size="sm"
              className="gap-2"
            >
              <Square className="h-4 w-4" />
              Stop
            </Button>
          ) : (
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || nodes.length === 0}
              size="sm"
              className="gap-2"
            >
              <Play className="h-4 w-4" />
              Send
            </Button>
          )}
        </div>
        
        {messages.length > 0 && (
          <div className="mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearMessages}
              className="text-xs"
            >
              Clear messages
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
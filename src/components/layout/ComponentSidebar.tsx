import React from 'react';
import { useADKStore, ComponentLibraryItem } from '@/store/adkStore';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ComponentSidebarProps {
  collapsed: boolean;
}

interface ComponentItemProps {
  item: ComponentLibraryItem;
  collapsed: boolean;
}

const ComponentItem: React.FC<ComponentItemProps> = ({ item, collapsed }) => {
  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(item));
    event.dataTransfer.effectAllowed = 'move';
  };

  if (collapsed) {
    return (
      <div
        draggable
        onDragStart={handleDragStart}
        className="component-item w-12 h-12 bg-surface border border-border rounded-lg flex items-center justify-center cursor-grab hover:shadow-md transition-all duration-200"
        title={item.name}
        style={{ borderColor: item.color }}
      >
        <span className="text-lg">{item.icon}</span>
      </div>
    );
  }

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      className="component-item p-3 cursor-grab hover:shadow-md transition-all duration-200 border-l-4"
      style={{ borderLeftColor: item.color }}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{item.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-foreground truncate">{item.name}</h4>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
        </div>
      </div>
    </Card>
  );
};

interface ComponentGroupProps {
  title: string;
  items: ComponentLibraryItem[];
  collapsed: boolean;
}

const ComponentGroup: React.FC<ComponentGroupProps> = ({ title, items, collapsed }) => {
  if (collapsed) {
    return (
      <div className="space-y-2">
        {items.map((item) => (
          <ComponentItem key={item.id} item={item} collapsed />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-sm text-foreground uppercase tracking-wide">
          {title}
        </h3>
        <Badge variant="secondary" className="text-xs">
          {items.length}
        </Badge>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <ComponentItem key={item.id} item={item} collapsed={false} />
        ))}
      </div>
    </div>
  );
};

export const ComponentSidebar: React.FC<ComponentSidebarProps> = ({ collapsed }) => {
  const { componentLibrary } = useADKStore();

  const agentComponents = componentLibrary.filter(item => item.category === 'agents');
  const workflowComponents = componentLibrary.filter(item => item.category === 'workflow');
  const toolComponents = componentLibrary.filter(item => item.category === 'tools');

  return (
    <div 
      className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-sidebar-border">
          {!collapsed && (
            <h2 className="font-semibold text-sidebar-foreground">Components</h2>
          )}
        </div>

        {/* Component Library */}
        <ScrollArea className="flex-1 p-3">
          <div className={`space-y-6 ${collapsed ? 'space-y-3' : ''}`}>
            <ComponentGroup 
              title="Agents" 
              items={agentComponents} 
              collapsed={collapsed}
            />
            
            {!collapsed && <Separator />}
            
            <ComponentGroup 
              title="Workflow" 
              items={workflowComponents} 
              collapsed={collapsed}
            />
            
            {!collapsed && <Separator />}
            
            <ComponentGroup 
              title="Tools" 
              items={toolComponents} 
              collapsed={collapsed}
            />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
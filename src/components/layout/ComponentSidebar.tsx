import React from 'react';
import { useADKStore, ComponentLibraryItem } from '@/store/adkStore';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GoogleButton } from '@/components/ui/google-button';

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
        className="component-item w-12 h-12 md-surface-container-high md-text-on-surface border-2 border-md-sys-color-outline-variant rounded-xl flex items-center justify-center cursor-grab hover:md-elevation-2 hover:scale-105 transition-all duration-md-short3 ease-md-standard hover:border-md-sys-color-primary hover:bg-md-primary-90/40"
        title={item.name}
      >
        <span className="text-lg">{item.icon}</span>
      </div>
    );
  }

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      variant="elevated"
      className="component-item p-4 cursor-grab hover:md-elevation-3 hover:scale-[1.02] transition-all duration-md-short3 ease-md-standard hover:bg-md-primary-90/30 rounded-xl"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-md-primary-90/60 md-text-primary flex items-center justify-center">
          <span className="text-lg">{item.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="md-typescale-label-large font-roboto md-text-on-surface truncate">{item.name}</h4>
          <p className="md-typescale-body-small font-roboto md-text-on-surface-variant mt-1 line-clamp-2">{item.description}</p>
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
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-sm md-text-on-surface-variant uppercase tracking-wide font-roboto">
          {title}
        </h3>
        <Badge variant="secondary" className="text-xs bg-md-primary-90/60 md-text-primary border-md-primary-80/40 rounded-full">
          {items.length}
        </Badge>
      </div>
      <div className="space-y-3">
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
      className={`md-surface-container-low border-r border-md-sys-color-outline-variant/30 transition-all duration-300 md-elevation-1 ${
        collapsed ? 'w-16' : 'w-72'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-md-sys-color-outline-variant/30 md-surface-container">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md-surface-primary rounded-lg flex items-center justify-center md-elevation-1">
                <span className="md-text-on-primary font-bold text-sm font-roboto">C</span>
              </div>
              <h2 className="font-semibold md-text-on-surface md-typescale-title-medium font-roboto">Component Library</h2>
            </div>
          )}
        </div>

        {/* Component Library */}
        <ScrollArea className="flex-1 p-4">
          <div className={`space-y-6 ${collapsed ? 'space-y-4' : ''}`}>
            <ComponentGroup 
              title="Agents" 
              items={agentComponents} 
              collapsed={collapsed}
            />
            
            {!collapsed && <Separator className="bg-md-sys-color-outline-variant/30" />}
            
            <ComponentGroup 
              title="Workflow" 
              items={workflowComponents} 
              collapsed={collapsed}
            />
            
            {!collapsed && <Separator className="bg-md-sys-color-outline-variant/30" />}
            
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
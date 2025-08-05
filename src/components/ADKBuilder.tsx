import React, { useEffect } from 'react';
import { useADKStore } from '@/store/adkStore';
import { Header } from './layout/Header';
import { ComponentSidebar } from './layout/ComponentSidebar';
import { CanvasArea } from './canvas/CanvasArea';
import { PropertiesPanel } from './layout/PropertiesPanel';
import { CodeView } from './layout/CodeView';
import { TestPanel } from './testing/TestPanel';

export const ADKBuilder: React.FC = () => {
  const { 
    sidebarCollapsed, 
    propertiesPanelCollapsed, 
    codeViewVisible, 
    testModeActive,
    initializeComponentLibrary 
  } = useADKStore();

  useEffect(() => {
    initializeComponentLibrary();
  }, [initializeComponentLibrary]);

  return (
    <div className="w-full h-screen bg-background flex flex-col font-inter overflow-hidden">
      {/* Header */}
      <Header />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Component Library */}
        <ComponentSidebar collapsed={sidebarCollapsed} />
        
        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col relative">
          <CanvasArea />
          
          {/* Bottom Code View */}
          {codeViewVisible && (
            <div className="h-80 border-t border-border">
              <CodeView />
            </div>
          )}
        </div>
        
        {/* Right Sidebar - Properties Panel */}
        <PropertiesPanel collapsed={propertiesPanelCollapsed} />
        
        {/* Test Panel (when active) */}
        {testModeActive && <TestPanel />}
      </div>
    </div>
  );
};
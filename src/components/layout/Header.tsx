import React from 'react';
import { useADKStore } from '@/store/adkStore';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  Save, 
  Play, 
  Code, 
  Settings, 
  Download,
  Upload,
  User,
  HelpCircle
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const Header: React.FC = () => {
  const { 
    currentProject,
    toggleSidebar,
    toggleCodeView,
    toggleTestMode,
    saveProject,
    generateCode,
    codeViewVisible,
    testModeActive 
  } = useADKStore();

  const handleSave = () => {
    saveProject();
    generateCode();
  };

  return (
    <header className="h-12 bg-surface border-b border-border flex items-center px-4 gap-2">
      {/* Left section */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="p-2 h-8 w-8"
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-google-blue rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">G</span>
          </div>
          <span className="font-semibold text-foreground">ADK Visual Builder</span>
        </div>
        
        <Separator orientation="vertical" className="h-6 mx-2" />
        
        {currentProject && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Project:</span>
            <span className="text-sm font-medium">{currentProject.name}</span>
          </div>
        )}
      </div>

      {/* Center section - Quick actions */}
      <div className="flex-1 flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          Save
        </Button>
        
        <Button
          variant={testModeActive ? "default" : "outline"}
          size="sm"
          onClick={toggleTestMode}
          className="gap-2"
        >
          <Play className="h-4 w-4" />
          Test
        </Button>
        
        <Button
          variant={codeViewVisible ? "default" : "outline"}
          size="sm"
          onClick={toggleCodeView}
          className="gap-2"
        >
          <Code className="h-4 w-4" />
          Code
        </Button>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
          <Download className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
          <Upload className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6 mx-1" />
        
        <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
          <HelpCircle className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};
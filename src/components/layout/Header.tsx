import React from 'react';
import { useADKStore } from '@/store/adkStore';
import { Button } from '@/components/ui/button';
import { GoogleButton } from '@/components/ui/google-button';
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
    <header className="h-16 md-surface-container-highest md-text-on-surface border-b border-md-sys-color-outline-variant/20 flex items-center px-6 gap-4 md-elevation-1">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <Button
          variant="text"
          size="icon"
          onClick={toggleSidebar}
          className="rounded-full w-10 h-10"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md-surface-primary rounded-xl flex items-center justify-center md-elevation-1">
            <span className="md-text-on-primary text-lg font-roboto font-bold">G</span>
          </div>
          <div className="flex flex-col">
            <span className="md-typescale-title-medium font-roboto md-text-on-surface">Google ADK Builder</span>
            {currentProject && (
              <span className="md-typescale-body-small font-roboto md-text-on-surface-variant">{currentProject.name}</span>
            )}
          </div>
        </div>
      </div>

      {/* Center section - Quick actions */}
      <div className="flex-1 flex items-center justify-center gap-3">
        <Button
          variant="outlined"
          size="medium"
          onClick={handleSave}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          Save Project
        </Button>
        
        <Button
          variant={testModeActive ? "filled" : "outlined"}
          size="medium"
          onClick={toggleTestMode}
          className={`gap-2 ${testModeActive ? 'md-surface-tertiary md-text-on-tertiary' : ''}`}
        >
          <Play className="h-4 w-4" />
          {testModeActive ? "Testing..." : "Test"}
        </Button>
        
        <Button
          variant={codeViewVisible ? "filled" : "outlined"}
          size="medium"
          onClick={toggleCodeView}
          className="gap-2"
        >
          <Code className="h-4 w-4" />
          {codeViewVisible ? "Hide Code" : "View Code"}
        </Button>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-1">
        <Button variant="text" size="icon" className="rounded-full w-10 h-10">
          <Download className="h-4 w-4" />
        </Button>
        
        <Button variant="text" size="icon" className="rounded-full w-10 h-10">
          <Upload className="h-4 w-4" />
        </Button>
        
        <Button variant="text" size="icon" className="rounded-full w-10 h-10">
          <Settings className="h-4 w-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6 mx-2 bg-md-sys-color-outline-variant/40" />
        
        <Button variant="text" size="icon" className="rounded-full w-10 h-10">
          <HelpCircle className="h-4 w-4" />
        </Button>
        
        <div className="w-9 h-9 md-surface-primary rounded-full flex items-center justify-center cursor-pointer hover:md-elevation-2 transition-all duration-md-short3 hover:scale-105 ml-2 md-elevation-1">
          <User className="h-4 w-4 md-text-on-primary" />
        </div>
      </div>
    </header>
  );
};
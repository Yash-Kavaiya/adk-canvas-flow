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
    <header className="h-16 md-surface-container-lowest md-text-on-surface border-b border-md-sys-color-outline-variant/30 flex items-center px-6 gap-4 md-elevation-1 bg-white/90 backdrop-blur">
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
          <div className="w-10 h-10 rounded-full border border-md-sys-color-outline-variant/50 bg-white flex items-center justify-center md-elevation-1">
            <span className="text-lg font-bold font-roboto leading-none">
              <span className="text-[#4285F4]">G</span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="md-typescale-title-medium font-roboto md-text-on-surface">Google Agent Canvas</span>
            {currentProject && (
              <span className="md-typescale-body-small font-roboto md-text-on-surface-variant">{currentProject.name}</span>
            )}
          </div>
        </div>
      </div>

      {/* Center section */}
      <div className="flex-1 flex items-center justify-center gap-3">
        <div className="hidden xl:flex items-center rounded-full border border-md-sys-color-outline-variant/40 bg-[#f8f9fa] px-4 py-2 text-sm text-[#5f6368] min-w-80 justify-center">
          Build and connect ADK agents with Google-style workflows
        </div>
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
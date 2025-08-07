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
    <header className="h-16 bg-surface border-b border-border flex items-center px-6 gap-4 shadow-sm">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <GoogleButton
          variant="google-ghost"
          size="sm"
          onClick={toggleSidebar}
          className="rounded-lg"
        >
          <Menu className="h-4 w-4" />
        </GoogleButton>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-google-blue to-google-blue-dark rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white text-lg font-bold">G</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-foreground">Google ADK Builder</span>
            {currentProject && (
              <span className="text-sm text-muted-foreground">{currentProject.name}</span>
            )}
          </div>
        </div>
      </div>

      {/* Center section - Quick actions */}
      <div className="flex-1 flex items-center justify-center gap-3">
        <GoogleButton
          variant="google-outline"
          size="default"
          onClick={handleSave}
          className="font-medium gap-2"
        >
          <Save className="h-4 w-4" />
          Save Project
        </GoogleButton>
        
        <GoogleButton
          variant={testModeActive ? "google-green" : "google-outline"}
          size="default"
          onClick={toggleTestMode}
          className="font-medium gap-2"
        >
          <Play className="h-4 w-4" />
          {testModeActive ? "Testing..." : "Test"}
        </GoogleButton>
        
        <GoogleButton
          variant={codeViewVisible ? "google-blue" : "google-outline"}
          size="default"
          onClick={toggleCodeView}
          className="font-medium gap-2"
        >
          <Code className="h-4 w-4" />
          {codeViewVisible ? "Hide Code" : "View Code"}
        </GoogleButton>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <GoogleButton variant="google-ghost" size="sm" className="rounded-lg">
          <Download className="h-4 w-4" />
        </GoogleButton>
        
        <GoogleButton variant="google-ghost" size="sm" className="rounded-lg">
          <Upload className="h-4 w-4" />
        </GoogleButton>
        
        <GoogleButton variant="google-ghost" size="sm" className="rounded-lg">
          <Settings className="h-4 w-4" />
        </GoogleButton>
        
        <Separator orientation="vertical" className="h-6 mx-2" />
        
        <GoogleButton variant="google-ghost" size="sm" className="rounded-lg">
          <HelpCircle className="h-4 w-4" />
        </GoogleButton>
        
        <div className="w-9 h-9 bg-gradient-to-br from-google-blue to-google-blue-dark rounded-full flex items-center justify-center cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105">
          <User className="h-4 w-4 text-white" />
        </div>
      </div>
    </header>
  );
};
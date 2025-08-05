import React, { useEffect } from 'react';
import { useADKStore } from '@/store/adkStore';
import { ADKBuilder } from '@/components/ADKBuilder';

const Index = () => {
  const { createProject, currentProject } = useADKStore();

  useEffect(() => {
    // Create a default project if none exists
    if (!currentProject) {
      createProject(
        'My First ADK Project',
        'A sample project to get started with Google Agent Development Kit'
      );
    }
  }, [createProject, currentProject]);

  return <ADKBuilder />;
};

export default Index;

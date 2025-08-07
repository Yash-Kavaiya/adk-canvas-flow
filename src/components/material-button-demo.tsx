import React from 'react';
import { Button } from '@/components/ui/button';
import { Fab } from '@/components/ui/fab';
import { Plus, Download, Share, Edit, Delete, Settings } from 'lucide-react';

export function MaterialButtonDemo() {
  return (
    <div className="p-8 space-y-8 bg-md-sys-color-background min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="md-typescale-headline-large text-md-sys-color-on-background">
            Material Design 3 Buttons
          </h1>
          <p className="md-typescale-body-large text-md-sys-color-on-surface-variant">
            Enhanced button components with Material Design styling, ripple effects, and accessibility features
          </p>
        </div>

        {/* Button Variants */}
        <div className="space-y-6">
          <h2 className="md-typescale-headline-medium text-md-sys-color-on-background">
            Button Variants
          </h2>
          
          {/* Filled Buttons */}
          <div className="space-y-4">
            <h3 className="md-typescale-title-medium text-md-sys-color-on-background">
              Filled Buttons
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="filled" size="small">
                <Download className="w-4 h-4" />
                Small
              </Button>
              <Button variant="filled" size="medium">
                <Download className="w-4 h-4" />
                Medium
              </Button>
              <Button variant="filled" size="large">
                <Download className="w-4 h-4" />
                Large
              </Button>
              <Button variant="filled" disabled>
                <Download className="w-4 h-4" />
                Disabled
              </Button>
            </div>
          </div>

          {/* Filled Tonal Buttons */}
          <div className="space-y-4">
            <h3 className="md-typescale-title-medium text-md-sys-color-on-background">
              Filled Tonal Buttons
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="filled-tonal" size="small">
                <Share className="w-4 h-4" />
                Small
              </Button>
              <Button variant="filled-tonal" size="medium">
                <Share className="w-4 h-4" />
                Medium
              </Button>
              <Button variant="filled-tonal" size="large">
                <Share className="w-4 h-4" />
                Large
              </Button>
              <Button variant="filled-tonal" disabled>
                <Share className="w-4 h-4" />
                Disabled
              </Button>
            </div>
          </div>

          {/* Outlined Buttons */}
          <div className="space-y-4">
            <h3 className="md-typescale-title-medium text-md-sys-color-on-background">
              Outlined Buttons
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="outlined" size="small">
                <Edit className="w-4 h-4" />
                Small
              </Button>
              <Button variant="outlined" size="medium">
                <Edit className="w-4 h-4" />
                Medium
              </Button>
              <Button variant="outlined" size="large">
                <Edit className="w-4 h-4" />
                Large
              </Button>
              <Button variant="outlined" disabled>
                <Edit className="w-4 h-4" />
                Disabled
              </Button>
            </div>
          </div>

          {/* Text Buttons */}
          <div className="space-y-4">
            <h3 className="md-typescale-title-medium text-md-sys-color-on-background">
              Text Buttons
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="text" size="small">
                <Settings className="w-4 h-4" />
                Small
              </Button>
              <Button variant="text" size="medium">
                <Settings className="w-4 h-4" />
                Medium
              </Button>
              <Button variant="text" size="large">
                <Settings className="w-4 h-4" />
                Large
              </Button>
              <Button variant="text" disabled>
                <Settings className="w-4 h-4" />
                Disabled
              </Button>
            </div>
          </div>

          {/* Error Buttons */}
          <div className="space-y-4">
            <h3 className="md-typescale-title-medium text-md-sys-color-on-background">
              Error Buttons
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="error" size="small">
                <Delete className="w-4 h-4" />
                Delete
              </Button>
              <Button variant="error" size="medium">
                <Delete className="w-4 h-4" />
                Delete
              </Button>
              <Button variant="error" size="large">
                <Delete className="w-4 h-4" />
                Delete
              </Button>
              <Button variant="error" disabled>
                <Delete className="w-4 h-4" />
                Disabled
              </Button>
            </div>
          </div>

          {/* Icon Buttons */}
          <div className="space-y-4">
            <h3 className="md-typescale-title-medium text-md-sys-color-on-background">
              Icon Buttons
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="filled" size="icon">
                <Plus className="w-4 h-4" />
              </Button>
              <Button variant="filled-tonal" size="icon">
                <Share className="w-4 h-4" />
              </Button>
              <Button variant="outlined" size="icon">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="text" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="error" size="icon">
                <Delete className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="space-y-6">
          <h2 className="md-typescale-headline-medium text-md-sys-color-on-background">
            Floating Action Buttons (FAB)
          </h2>
          
          <div className="space-y-4">
            <h3 className="md-typescale-title-medium text-md-sys-color-on-background">
              FAB Sizes
            </h3>
            <div className="flex flex-wrap items-center gap-6">
              <Fab variant="primary" size="small">
                <Plus className="w-4 h-4" />
              </Fab>
              <Fab variant="primary" size="medium">
                <Plus className="w-6 h-6" />
              </Fab>
              <Fab variant="primary" size="large">
                <Plus className="w-8 h-8" />
              </Fab>
              <Fab variant="primary" size="extended">
                <Plus className="w-6 h-6" />
                Create New
              </Fab>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="md-typescale-title-medium text-md-sys-color-on-background">
              FAB Variants
            </h3>
            <div className="flex flex-wrap items-center gap-6">
              <Fab variant="primary" size="medium">
                <Plus className="w-6 h-6" />
              </Fab>
              <Fab variant="secondary" size="medium">
                <Share className="w-6 h-6" />
              </Fab>
              <Fab variant="tertiary" size="medium">
                <Edit className="w-6 h-6" />
              </Fab>
              <Fab variant="surface" size="medium">
                <Settings className="w-6 h-6" />
              </Fab>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="md-typescale-title-medium text-md-sys-color-on-background">
              Extended FABs
            </h3>
            <div className="flex flex-wrap gap-4">
              <Fab variant="primary" size="extended">
                <Plus className="w-6 h-6" />
                Create New
              </Fab>
              <Fab variant="secondary" size="extended">
                <Share className="w-6 h-6" />
                Share
              </Fab>
              <Fab variant="tertiary" size="extended">
                <Edit className="w-6 h-6" />
                Edit
              </Fab>
              <Fab variant="surface" size="extended">
                <Settings className="w-6 h-6" />
                Settings
              </Fab>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="space-y-6">
          <h2 className="md-typescale-headline-medium text-md-sys-color-on-background">
            Interactive Examples
          </h2>
          
          <div className="bg-md-sys-color-surface-container rounded-xl p-6 space-y-4">
            <h3 className="md-typescale-title-medium text-md-sys-color-on-surface">
              Button Actions
            </h3>
            <p className="md-typescale-body-medium text-md-sys-color-on-surface-variant">
              Click the buttons below to see the ripple effects and state changes in action.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="filled" 
                onClick={() => alert('Filled button clicked!')}
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => alert('Outlined button clicked!')}
              >
                <Share className="w-4 h-4" />
                Share
              </Button>
              <Button 
                variant="text" 
                onClick={() => alert('Text button clicked!')}
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <Fab 
                variant="primary" 
                size="medium"
                onClick={() => alert('FAB clicked!')}
              >
                <Plus className="w-6 h-6" />
              </Fab>
            </div>
          </div>
        </div>

        {/* Accessibility Features */}
        <div className="space-y-6">
          <h2 className="md-typescale-headline-medium text-md-sys-color-on-background">
            Accessibility Features
          </h2>
          
          <div className="bg-md-sys-color-surface-container rounded-xl p-6 space-y-4">
            <h3 className="md-typescale-title-medium text-md-sys-color-on-surface">
              Keyboard Navigation
            </h3>
            <p className="md-typescale-body-medium text-md-sys-color-on-surface-variant">
              All buttons support keyboard navigation with Tab and Enter/Space keys. Focus indicators are clearly visible.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="filled">
                Tab to focus
              </Button>
              <Button variant="outlined">
                Press Enter
              </Button>
              <Button variant="text">
                Or Space
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
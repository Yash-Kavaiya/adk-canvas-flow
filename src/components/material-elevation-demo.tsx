import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const MaterialElevationDemo: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Material Design 3 Elevation System</h2>
        <p className="text-muted-foreground mb-6">
          Hover over the elements to see elevation changes in action.
        </p>
      </div>

      {/* Elevation Levels Demo */}
      <div>
        <h3 className="text-lg font-medium mb-4">Elevation Levels (0-5)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[0, 1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`p-4 rounded-md bg-surface text-center md-elevation-${level} transition-shadow duration-300`}
            >
              <div className="text-sm font-medium">Level {level}</div>
              <div className="text-xs text-muted-foreground mt-1">
                md-elevation-{level}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Components Demo */}
      <div>
        <h3 className="text-lg font-medium mb-4">Interactive Components</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card Demo */}
          <Card className="md-card">
            <CardHeader>
              <CardTitle>Material Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This card uses md-elevation-1 by default and md-elevation-2 on hover.
              </p>
            </CardContent>
          </Card>

          {/* Button Demo */}
          <div className="space-y-3">
            <h4 className="font-medium">Material Buttons</h4>
            <div className="space-y-2">
              <Button className="w-full md-button-filled">
                Filled Button
              </Button>
              <Button variant="outlined" className="w-full">
                Outlined Button
              </Button>
              <Button variant="ghost" className="w-full">
                Text Button
              </Button>
            </div>
          </div>

          {/* FAB Demo */}
          <div className="space-y-3">
            <h4 className="font-medium">Floating Action Button</h4>
            <div className="flex justify-center">
              <Button 
                size="icon" 
                className="w-14 h-14 rounded-full md-fab"
              >
                +
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Uses md-elevation-3 with hover states
            </p>
          </div>
        </div>
      </div>

      {/* Utility Classes Demo */}
      <div>
        <h3 className="text-lg font-medium mb-4">Utility Classes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Direct Elevation Classes</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <div><code>.md-elevation-0</code> - No shadow</div>
              <div><code>.md-elevation-1</code> - Subtle shadow</div>
              <div><code>.md-elevation-2</code> - Light shadow</div>
              <div><code>.md-elevation-3</code> - Medium shadow</div>
              <div><code>.md-elevation-4</code> - Strong shadow</div>
              <div><code>.md-elevation-5</code> - Strongest shadow</div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Semantic Classes</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <div><code>.md-card</code> - Card elevation with hover</div>
              <div><code>.md-button-filled</code> - Button elevation</div>
              <div><code>.md-fab</code> - FAB elevation with hover</div>
              <div><code>.md-dialog</code> - Dialog elevation</div>
              <div><code>.md-menu</code> - Menu elevation</div>
              <div><code>.md-tooltip</code> - Tooltip elevation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
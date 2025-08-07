import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export function MaterialCardDemo() {
  return (
    <div className="p-8 space-y-8 bg-md-sys-color-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="md-typescale-display-small font-roboto text-md-sys-color-on-background mb-8">
          Material Design Card Components
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Elevated Card */}
          <Card variant="elevated" className="w-full">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>
                This is an elevated card with shadow elevation-1 that increases to elevation-2 on hover.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="md-typescale-body-medium font-roboto text-md-sys-color-on-surface">
                Elevated cards are used for content that needs to stand out from the background.
                They provide a subtle shadow that creates depth and hierarchy.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="filled" size="sm">
                Action
              </Button>
            </CardFooter>
          </Card>

          {/* Filled Card */}
          <Card variant="filled" className="w-full">
            <CardHeader>
              <CardTitle>Filled Card</CardTitle>
              <CardDescription>
                This is a filled card with a tinted background and no initial shadow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="md-typescale-body-medium font-roboto text-md-sys-color-on-surface">
                Filled cards use a tinted background color to create separation from the surface.
                They gain elevation on hover for interactive feedback.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outlined" size="sm">
                Action
              </Button>
            </CardFooter>
          </Card>

          {/* Outlined Card */}
          <Card variant="outlined" className="w-full">
            <CardHeader>
              <CardTitle>Outlined Card</CardTitle>
              <CardDescription>
                This is an outlined card with a border and no initial shadow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="md-typescale-body-medium font-roboto text-md-sys-color-on-surface">
                Outlined cards use a border to create separation and definition.
                They're subtle and work well for secondary content.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="text" size="sm">
                Action
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Interactive Demo Section */}
        <div className="mt-12">
          <h2 className="md-typescale-headline-medium font-roboto text-md-sys-color-on-background mb-6">
            Interactive Card Examples
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card with Image */}
            <Card variant="elevated" className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-md-primary-40 to-md-primary-60"></div>
              <CardHeader>
                <CardTitle>Card with Media</CardTitle>
                <CardDescription>
                  Cards can contain media elements like images or videos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="md-typescale-body-medium font-roboto text-md-sys-color-on-surface">
                  This card demonstrates how media content integrates with the Material Design card structure.
                  The 12px border radius is maintained throughout.
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="filled" size="sm">
                  Primary
                </Button>
                <Button variant="outlined" size="sm">
                  Secondary
                </Button>
              </CardFooter>
            </Card>

            {/* Compact Card */}
            <Card variant="filled" className="p-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-md-sys-color-primary flex items-center justify-center">
                  <span className="md-typescale-title-medium font-roboto text-md-sys-color-on-primary">
                    MD
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="md-typescale-title-medium font-roboto text-md-sys-color-on-surface">
                    Compact Card Layout
                  </h3>
                  <p className="md-typescale-body-small font-roboto text-md-sys-color-on-surface-variant mt-1">
                    This card uses a compact layout with custom padding and flex arrangement.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="text" size="sm">
                      Learn More
                    </Button>
                    <Button variant="text" size="sm">
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Card States Demo */}
        <div className="mt-12">
          <h2 className="md-typescale-headline-medium font-roboto text-md-sys-color-on-background mb-6">
            Card Hover States
          </h2>
          <p className="md-typescale-body-large font-roboto text-md-sys-color-on-surface-variant mb-6">
            Hover over the cards below to see the elevation changes in action.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} variant="elevated" className="cursor-pointer">
                <CardHeader>
                  <CardTitle>Hover Card {i}</CardTitle>
                  <CardDescription>
                    Watch the shadow elevation change on hover.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-md-sys-color-surface-variant rounded-md flex items-center justify-center">
                    <span className="md-typescale-label-large font-roboto text-md-sys-color-on-surface-variant">
                      Content Area
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
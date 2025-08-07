# Material Design 3 Color System

This document demonstrates the Material Design 3 color system implementation with proper tonal variations and dynamic theming support.

## Color Palettes

### Primary Color Palette (Google Blue)
- `--md-sys-color-primary-0`: Black (#000000)
- `--md-sys-color-primary-10`: Very dark blue (#000c1a)
- `--md-sys-color-primary-20`: Dark blue (#011c36)
- `--md-sys-color-primary-30`: Medium dark blue (#043a72)
- `--md-sys-color-primary-40`: Google Blue (#1a73e8) - Main primary color
- `--md-sys-color-primary-50`: Medium blue (#4285f4)
- `--md-sys-color-primary-60`: Light blue (#8ab4f8)
- `--md-sys-color-primary-70`: Lighter blue (#aecbfa)
- `--md-sys-color-primary-80`: Very light blue (#d2e3fc)
- `--md-sys-color-primary-90`: Almost white blue (#e8f0fe)
- `--md-sys-color-primary-95`: Nearly white blue (#f3f7ff)
- `--md-sys-color-primary-99`: White with blue tint (#fefeff)
- `--md-sys-color-primary-100`: Pure white (#ffffff)

### Secondary Color Palette (Google Gray)
- Similar tonal variations from black to white with gray undertones

### Tertiary Color Palette (Google Green)
- Similar tonal variations from black to white with green undertones

### Error Color Palette (Google Red)
- Similar tonal variations from black to white with red undertones

### Warning Color Palette (Professional Amber)
- Similar tonal variations from black to white with amber undertones

## Semantic Color Tokens

### Light Theme
- `--md-sys-color-primary`: Uses primary-40 (Google Blue)
- `--md-sys-color-on-primary`: Uses primary-100 (White)
- `--md-sys-color-primary-container`: Uses primary-90 (Very light blue)
- `--md-sys-color-on-primary-container`: Uses primary-10 (Very dark blue)

### Dark Theme
- `--md-sys-color-primary`: Uses primary-80 (Very light blue)
- `--md-sys-color-on-primary`: Uses primary-20 (Dark blue)
- `--md-sys-color-primary-container`: Uses primary-30 (Medium dark blue)
- `--md-sys-color-on-primary-container`: Uses primary-90 (Very light blue)

## Utility Classes

### Background Colors
- `.md-bg-primary` - Primary background color
- `.md-bg-primary-container` - Primary container background
- `.md-bg-secondary` - Secondary background color
- `.md-bg-tertiary` - Tertiary background color
- `.md-bg-error` - Error background color
- `.md-bg-warning` - Warning background color

### Text Colors
- `.md-text-primary` - Primary text color
- `.md-text-on-primary` - Text on primary background
- `.md-text-secondary` - Secondary text color
- `.md-text-tertiary` - Tertiary text color
- `.md-text-error` - Error text color
- `.md-text-warning` - Warning text color

### Surface Colors
- `.md-bg-surface` - Main surface background
- `.md-bg-surface-variant` - Surface variant background
- `.md-bg-surface-container` - Surface container background
- `.md-bg-surface-container-high` - High emphasis surface container

### State Layers
- `.md-state-hover-primary` - Primary hover state
- `.md-state-focus-primary` - Primary focus state
- `.md-state-pressed-primary` - Primary pressed state

### Surface Tints
- `.md-surface-tint-primary` - Primary surface tint (5% opacity)
- `.md-surface-tint-secondary` - Secondary surface tint (8% opacity)
- `.md-surface-tint-tertiary` - Tertiary surface tint (5% opacity)

## Tailwind CSS Integration

The color system is fully integrated with Tailwind CSS:

```css
/* Use Material Design colors in Tailwind */
bg-md-sys-color-primary
text-md-sys-color-on-primary
bg-md-primary-40
text-md-secondary-80
```

## Dynamic Theming

The color system automatically adapts to light and dark themes:
- Light theme uses darker colors for text and lighter colors for backgrounds
- Dark theme uses lighter colors for text and darker colors for backgrounds
- All color combinations maintain proper contrast ratios for accessibility
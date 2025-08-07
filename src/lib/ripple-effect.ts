/**
 * Material Design 3 Ripple Effect Utility
 * Creates the characteristic ripple animation for Material Design components
 */

export interface RippleOptions {
  color?: string;
  duration?: number;
  opacity?: number;
}

export function createRipple(
  event: React.MouseEvent<HTMLElement>,
  options: RippleOptions = {}
): void {
  const {
    color = 'currentColor',
    duration = 600,
    opacity = 0.3
  } = options;

  const element = event.currentTarget;
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  // Create ripple element
  const ripple = document.createElement('span');
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple ${duration}ms linear;
    background-color: ${color};
    opacity: ${opacity};
    pointer-events: none;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
  `;

  // Ensure the parent element has relative positioning
  const computedStyle = window.getComputedStyle(element);
  if (computedStyle.position === 'static') {
    element.style.position = 'relative';
  }

  // Ensure overflow is hidden for clean ripple effect
  element.style.overflow = 'hidden';

  // Add ripple to element
  element.appendChild(ripple);

  // Remove ripple after animation
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, duration);
}

// CSS keyframes for ripple animation (to be added to global styles)
export const rippleKeyframes = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

/**
 * React hook for adding ripple effect to components
 */
export function useRipple(options: RippleOptions = {}) {
  return (event: React.MouseEvent<HTMLElement>) => {
    createRipple(event, options);
  };
}
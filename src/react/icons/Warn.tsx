import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

export const Warn = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, strokeWidth = 1.7, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M10,3 L18,17 H2 Z" />
      <line x1="10" y1="9" x2="10" y2="13" />
      <circle cx="10" cy="15.5" r="0.8" fill="currentColor" />
    </svg>
  )
);
Warn.displayName = 'Warn';

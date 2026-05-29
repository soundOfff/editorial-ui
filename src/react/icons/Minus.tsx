import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

export const Minus = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, strokeWidth = 1.8, className, ...props }, ref) => (
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
      <line x1="4" y1="10" x2="16" y2="10" />
    </svg>
  )
);
Minus.displayName = 'Minus';

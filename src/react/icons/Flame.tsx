import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

export const Flame = React.forwardRef<SVGSVGElement, IconProps>(
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
      <path d="M10,17 C5,17 4,12 6,9 C6,12 8,13 8,10 C8,7 10,4 10,4 C10,4 14,8 14,12 C14,15 12,17 10,17 Z" />
    </svg>
  )
);
Flame.displayName = 'Flame';

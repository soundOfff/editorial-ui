import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

export const Globe = React.forwardRef<SVGSVGElement, IconProps>(
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
      <circle cx="10" cy="10" r="7" />
      <path d="M3,10 h14" />
      <path d="M10,3 C8,6 8,14 10,17 C12,14 12,6 10,3" />
    </svg>
  )
);
Globe.displayName = 'Globe';

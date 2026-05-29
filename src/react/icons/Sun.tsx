import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

export const Sun = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, strokeWidth = 1.6, className, ...props }, ref) => (
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
      <circle cx="10" cy="10" r="4" />
      <line x1="10" y1="1" x2="10" y2="3" />
      <line x1="10" y1="17" x2="10" y2="19" />
      <line x1="1" y1="10" x2="3" y2="10" />
      <line x1="17" y1="10" x2="19" y2="10" />
      <line x1="3.5" y1="3.5" x2="5" y2="5" />
      <line x1="15" y1="15" x2="16.5" y2="16.5" />
      <line x1="16.5" y1="3.5" x2="15" y2="5" />
      <line x1="5" y1="15" x2="3.5" y2="16.5" />
    </svg>
  )
);
Sun.displayName = 'Sun';

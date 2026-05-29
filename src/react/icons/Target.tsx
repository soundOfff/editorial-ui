import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

export const Target = React.forwardRef<SVGSVGElement, IconProps>(
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
      <circle cx="10" cy="10" r="7" />
      <circle cx="10" cy="10" r="3" />
      <line x1="10" y1="3" x2="10" y2="1" />
      <line x1="10" y1="19" x2="10" y2="17" />
      <line x1="3" y1="10" x2="1" y2="10" />
      <line x1="19" y1="10" x2="17" y2="10" />
    </svg>
  )
);
Target.displayName = 'Target';

import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

export const Settings = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 20, strokeWidth = 1.4, className, ...props }, ref) => (
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
      <circle cx="10" cy="10" r="3" />
      <path d="M10,3 v1.5 M10,15.5 v1.5 M3,10 h1.5 M15.5,10 h1.5 M5.4,5.4 l1,1 M13.6,13.6 l1,1 M14.6,5.4 l-1,1 M6.4,13.6 l-1,1" />
    </svg>
  )
);
Settings.displayName = 'Settings';

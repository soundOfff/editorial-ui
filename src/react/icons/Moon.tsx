import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

export const Moon = React.forwardRef<SVGSVGElement, IconProps>(
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
      <path d="M17,12 A7,7,0,1,1,8,3 A5,5,0,0,0,17,12 Z" />
    </svg>
  )
);
Moon.displayName = 'Moon';

import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

export const ChevronRight = React.forwardRef<SVGSVGElement, IconProps>(
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
      <polyline points="8,5 13,10 8,15" />
    </svg>
  )
);
ChevronRight.displayName = 'ChevronRight';

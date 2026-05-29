import React from 'react';

export interface TooltipProps {
  tip: string;
  children: React.ReactElement;
  as?: keyof JSX.IntrinsicElements;
}

export const Tooltip: React.FC<TooltipProps> = ({ tip, children, as: _Tag = 'span' }) => {
  return React.cloneElement(children, { 'data-tip': tip });
};

Tooltip.displayName = 'Tooltip';

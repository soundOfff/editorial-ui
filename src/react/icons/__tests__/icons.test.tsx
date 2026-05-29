import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import * as Icons from '../index';

const iconNames = [
  'ArrowRight',
  'Auto',
  'Bell',
  'Bookmark',
  'Check',
  'ChevronDown',
  'ChevronLeft',
  'ChevronRight',
  'Copy',
  'Download',
  'Edit',
  'Flame',
  'Folder',
  'Globe',
  'Info',
  'Minus',
  'Moon',
  'Play',
  'Plus',
  'Search',
  'Settings',
  'Sun',
  'Tag',
  'Target',
  'Trash',
  'Warn',
  'X',
] as const;

describe('Icon Components', () => {
  describe('Smoke tests — all icons render without error', () => {
    iconNames.forEach((name) => {
      it(`renders <${name} /> without error`, () => {
        const Icon = Icons[name] as React.FC<React.SVGProps<SVGSVGElement>>;
        const { container } = render(<Icon />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
      });
    });
  });

  describe('size prop', () => {
    iconNames.forEach((name) => {
      it(`<${name} /> accepts custom size`, () => {
        const Icon = Icons[name] as React.FC<{ size?: number }>;
        const { container } = render(<Icon size={32} />);
        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('width', '32');
        expect(svg).toHaveAttribute('height', '32');
      });
    });
  });

  describe('strokeWidth prop', () => {
    iconNames.forEach((name) => {
      it(`<${name} /> accepts custom strokeWidth`, () => {
        const Icon = Icons[name] as React.FC<{ strokeWidth?: number }>;
        const { container } = render(<Icon strokeWidth={3} />);
        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('stroke-width', '3');
      });
    });
  });

  describe('className prop', () => {
    iconNames.forEach((name) => {
      it(`<${name} /> accepts className`, () => {
        const Icon = Icons[name] as React.FC<{ className?: string }>;
        const { container } = render(<Icon className="my-icon" />);
        const svg = container.querySelector('svg');
        expect(svg).toHaveClass('my-icon');
      });
    });
  });

  describe('spreads additional SVG props', () => {
    iconNames.forEach((name) => {
      it(`<${name} /> spreads data-testid and aria-label`, () => {
        const Icon = Icons[name] as React.FC<React.SVGProps<SVGSVGElement>>;
        const { container } = render(
          <Icon data-testid={`icon-${name}`} aria-label={`${name} icon`} />
        );
        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('data-testid', `icon-${name}`);
        expect(svg).toHaveAttribute('aria-label', `${name} icon`);
      });
    });
  });

  describe('ref forwarding', () => {
    iconNames.forEach((name) => {
      it(`<${name} /> forwards ref to SVGSVGElement`, () => {
        const Icon = Icons[name] as React.ForwardRefExoticComponent<
          React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
        >;
        const ref = React.createRef<SVGSVGElement>();
        render(<Icon ref={ref} />);
        expect(ref.current).toBeInstanceOf(SVGSVGElement);
      });
    });
  });

  describe('displayName', () => {
    iconNames.forEach((name) => {
      it(`<${name} /> has correct displayName`, () => {
        const Icon = Icons[name] as { displayName?: string };
        expect(Icon.displayName).toBe(name);
      });
    });
  });
});

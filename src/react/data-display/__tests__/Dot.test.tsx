import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Dot } from '../Dot';

describe('Dot', () => {
  describe('Rendering', () => {
    it('renders with default dot class', () => {
      render(<Dot data-testid="dot" />);
      expect(screen.getByTestId('dot')).toHaveClass('dot');
    });

    it('applies variant classes correctly', () => {
      const variants: Array<'info' | 'success' | 'warn' | 'danger'> = [
        'info',
        'success',
        'warn',
        'danger',
      ];

      variants.forEach((variant) => {
        const { unmount } = render(<Dot data-testid="dot" variant={variant} />);
        expect(screen.getByTestId('dot')).toHaveClass('dot', `dot-${variant}`);
        unmount();
      });
    });

    it('applies size classes correctly', () => {
      const { rerender } = render(<Dot data-testid="dot" size="sm" />);
      expect(screen.getByTestId('dot')).toHaveClass('dot', 'dot-sm');

      rerender(<Dot data-testid="dot" size="md" />);
      expect(screen.getByTestId('dot')).toHaveClass('dot');
      expect(screen.getByTestId('dot')).not.toHaveClass('dot-md');

      rerender(<Dot data-testid="dot" size="lg" />);
      expect(screen.getByTestId('dot')).toHaveClass('dot', 'dot-lg');
    });

    it('applies custom className', () => {
      render(<Dot data-testid="dot" className="extra" />);
      expect(screen.getByTestId('dot')).toHaveClass('dot', 'extra');
    });

    it('combines variant and size classes', () => {
      render(<Dot data-testid="dot" variant="success" size="lg" />);
      expect(screen.getByTestId('dot')).toHaveClass('dot', 'dot-success', 'dot-lg');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to span element', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Dot ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('HTML attributes', () => {
    it('passes through additional HTML attributes', () => {
      render(<Dot data-testid="status-dot" aria-label="Online" />);
      expect(screen.getByTestId('status-dot')).toHaveAttribute('aria-label', 'Online');
    });
  });
});

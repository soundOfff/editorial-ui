import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Badge } from '../Badge';

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Badge>Active</Badge>);
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('applies default badge class', () => {
      render(<Badge>Default</Badge>);
      expect(screen.getByText('Default')).toHaveClass('badge');
    });

    it('applies variant classes correctly', () => {
      const variants: Array<'info' | 'success' | 'warn' | 'danger'> = [
        'info',
        'success',
        'warn',
        'danger',
      ];

      variants.forEach((variant) => {
        const { unmount } = render(<Badge variant={variant}>{variant}</Badge>);
        const badge = screen.getByText(variant);
        expect(badge).toHaveClass('badge', `badge-${variant}`);
        unmount();
      });
    });

    it('applies custom className', () => {
      render(<Badge className="custom-class">Custom</Badge>);
      expect(screen.getByText('Custom')).toHaveClass('badge', 'custom-class');
    });

    it('renders without a variant', () => {
      render(<Badge>No variant</Badge>);
      const badge = screen.getByText('No variant');
      expect(badge).toHaveClass('badge');
      expect(badge.className).toBe('badge');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to span element', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Badge ref={ref}>Ref Badge</Badge>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('HTML attributes', () => {
    it('passes through additional HTML attributes', () => {
      render(<Badge data-testid="my-badge">Test</Badge>);
      expect(screen.getByTestId('my-badge')).toBeInTheDocument();
    });

    it('supports aria attributes', () => {
      render(<Badge aria-label="Status: active">Active</Badge>);
      expect(screen.getByLabelText('Status: active')).toBeInTheDocument();
    });
  });
});

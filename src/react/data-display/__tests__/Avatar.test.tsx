import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Avatar } from '../Avatar';

describe('Avatar', () => {
  describe('Rendering', () => {
    it('renders initials correctly', () => {
      render(<Avatar initials="JD" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('applies default avatar class', () => {
      render(<Avatar initials="AB" />);
      expect(screen.getByText('AB')).toHaveClass('avatar');
    });

    it('applies size classes correctly', () => {
      const { rerender } = render(<Avatar initials="AB" size="sm" />);
      expect(screen.getByText('AB')).toHaveClass('avatar', 'avatar-sm');

      rerender(<Avatar initials="AB" size="md" />);
      expect(screen.getByText('AB')).toHaveClass('avatar');
      expect(screen.getByText('AB')).not.toHaveClass('avatar-md');

      rerender(<Avatar initials="AB" size="lg" />);
      expect(screen.getByText('AB')).toHaveClass('avatar', 'avatar-lg');
    });

    it('applies custom className', () => {
      render(<Avatar initials="CD" className="custom-avatar" />);
      expect(screen.getByText('CD')).toHaveClass('avatar', 'custom-avatar');
    });

    it('renders without a size (default)', () => {
      render(<Avatar initials="XY" />);
      const el = screen.getByText('XY');
      expect(el).toHaveClass('avatar');
      expect(el).not.toHaveClass('avatar-sm');
      expect(el).not.toHaveClass('avatar-lg');
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to span element', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Avatar ref={ref} initials="RF" />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('HTML attributes', () => {
    it('passes through additional HTML attributes', () => {
      render(<Avatar initials="TM" data-testid="avatar-tm" />);
      expect(screen.getByTestId('avatar-tm')).toBeInTheDocument();
    });

    it('supports aria attributes', () => {
      render(<Avatar initials="JD" aria-label="John Doe" />);
      expect(screen.getByLabelText('John Doe')).toBeInTheDocument();
    });
  });
});

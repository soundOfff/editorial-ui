import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Chip } from '../Chip';

describe('Chip', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Chip>Tag</Chip>);
      expect(screen.getByText('Tag')).toBeInTheDocument();
    });

    it('applies default chip class', () => {
      render(<Chip>Default</Chip>);
      expect(screen.getByText('Default').closest('.chip')).toHaveClass('chip');
    });

    it('applies custom className', () => {
      render(<Chip className="custom-chip">Custom</Chip>);
      expect(screen.getByText('Custom').closest('.chip')).toHaveClass('chip', 'custom-chip');
    });

    it('does not render dismiss button when onDismiss is not provided', () => {
      render(<Chip>No dismiss</Chip>);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders dismiss button when onDismiss is provided', () => {
      render(<Chip onDismiss={() => {}}>Dismissible</Chip>);
      expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument();
    });
  });

  describe('Dismiss interaction', () => {
    it('calls onDismiss when dismiss button is clicked', async () => {
      const handleDismiss = vi.fn();
      const user = userEvent.setup();

      render(<Chip onDismiss={handleDismiss}>Dismissible</Chip>);

      await user.click(screen.getByRole('button', { name: /dismiss/i }));
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it('dismiss button has chip-dismiss class', () => {
      render(<Chip onDismiss={() => {}}>Tag</Chip>);
      expect(screen.getByRole('button', { name: /dismiss/i })).toHaveClass('chip-dismiss');
    });

    it('supports keyboard interaction on dismiss button', async () => {
      const handleDismiss = vi.fn();
      const user = userEvent.setup();

      render(<Chip onDismiss={handleDismiss}>Dismissible</Chip>);
      const dismissBtn = screen.getByRole('button', { name: /dismiss/i });
      dismissBtn.focus();
      await user.keyboard('{Enter}');
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to span element', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Chip ref={ref}>Ref Chip</Chip>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('HTML attributes', () => {
    it('passes through additional HTML attributes', () => {
      render(<Chip data-testid="my-chip">Test</Chip>);
      expect(screen.getByTestId('my-chip')).toBeInTheDocument();
    });
  });
});

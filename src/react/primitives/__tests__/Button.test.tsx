import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';
import React from 'react';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('applies default btn class', () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn');
    });

    it('applies variant classes correctly', () => {
      const variants: Array<'amber' | 'ghost' | 'quiet' | 'danger' | 'saved' | 'icon'> = [
        'amber',
        'ghost',
        'quiet',
        'danger',
        'saved',
        'icon',
      ];

      variants.forEach((variant) => {
        const { unmount } = render(<Button variant={variant}>{variant}</Button>);
        const button = screen.getByRole('button', { name: variant });
        expect(button).toHaveClass('btn', `btn-${variant}`);
        unmount();
      });
    });

    it('applies size classes correctly', () => {
      const { rerender } = render(<Button size="sm">Small</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn', 'btn-sm');

      rerender(<Button size="md">Medium</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn');
      expect(screen.getByRole('button')).not.toHaveClass('btn-md');

      rerender(<Button size="lg">Large</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn', 'btn-lg');
    });

    it('applies block class when block prop is true', () => {
      render(<Button block>Block Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn', 'btn-block');
    });

    it('applies custom className', () => {
      render(<Button className="custom-class">Custom</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn', 'custom-class');
    });

    it('combines multiple classes correctly', () => {
      render(
        <Button variant="amber" size="lg" block className="custom">
          Combined
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('btn', 'btn-amber', 'btn-lg', 'btn-block', 'custom');
    });
  });

  describe('Disabled state', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('applies is-disabled class when disabled', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toHaveClass('is-disabled');
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard interaction (Enter)', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Press me</Button>);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard interaction (Space)', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Press me</Button>);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Ref Button</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe('BUTTON');
    });

    it('allows calling focus() via ref', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Focusable</Button>);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('has button role', () => {
      render(<Button>Accessible</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Button aria-label="Close dialog">×</Button>);
      expect(screen.getByRole('button', { name: /close dialog/i })).toBeInTheDocument();
    });

    it('supports aria-pressed for toggle buttons', () => {
      render(<Button aria-pressed="true">Active</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    });

    it('is keyboard navigable (can be focused)', () => {
      render(<Button>Focus me</Button>);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe('HTML attributes', () => {
    it('passes through additional HTML attributes', () => {
      render(
        <Button type="submit" name="submit-btn" value="submit">
          Submit
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('name', 'submit-btn');
      expect(button).toHaveAttribute('value', 'submit');
    });

    it('supports data attributes', () => {
      render(<Button data-testid="custom-button">Custom</Button>);
      expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    });
  });

  describe('Content', () => {
    it('renders text children', () => {
      render(<Button>Text content</Button>);
      expect(screen.getByText('Text content')).toBeInTheDocument();
    });

    it('renders icon children', () => {
      render(
        <Button>
          <svg data-testid="icon">
            <path />
          </svg>
          With Icon
        </Button>
      );

      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('With Icon')).toBeInTheDocument();
    });

    it('renders icon-only button', () => {
      render(
        <Button variant="icon" aria-label="Search">
          <svg data-testid="search-icon">
            <path />
          </svg>
        </Button>
      );

      expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    });
  });
});

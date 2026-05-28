import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';
import React from 'react';

describe('Input', () => {
  describe('Rendering', () => {
    it('renders a text input with the input class by default', () => {
      render(<Input placeholder="Email" />);
      const input = screen.getByPlaceholderText('Email');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('input');
    });

    it('applies is-error class when error is true', () => {
      render(<Input error placeholder="Email" />);
      expect(screen.getByPlaceholderText('Email')).toHaveClass('input', 'is-error');
    });

    it('does not apply is-error class by default', () => {
      render(<Input placeholder="Email" />);
      expect(screen.getByPlaceholderText('Email')).not.toHaveClass('is-error');
    });

    it('merges custom className', () => {
      render(<Input className="custom" placeholder="Email" />);
      expect(screen.getByPlaceholderText('Email')).toHaveClass('input', 'custom');
    });
  });

  describe('Input group (prefix/suffix)', () => {
    it('renders prefix inside a left affix and switches to input-group', () => {
      render(<Input prefix="@" placeholder="handle" />);
      const input = screen.getByPlaceholderText('handle');
      const group = input.parentElement!;
      expect(group).toHaveClass('input-group');
      const affix = screen.getByText('@');
      expect(affix).toHaveClass('affix');
      expect(affix).not.toHaveClass('r');
      // Grouped input is borderless — does not carry the .input class
      expect(input).not.toHaveClass('input');
    });

    it('renders suffix inside a right affix', () => {
      render(<Input suffix="px" type="number" aria-label="size" />);
      const affix = screen.getByText('px');
      expect(affix).toHaveClass('affix', 'r');
    });

    it('renders both prefix and suffix', () => {
      render(<Input prefix="$" suffix="USD" aria-label="amount" />);
      expect(screen.getByText('$')).toHaveClass('affix');
      expect(screen.getByText('USD')).toHaveClass('affix', 'r');
    });

    it('renders icon nodes as a prefix', () => {
      render(
        <Input
          aria-label="search"
          prefix={<svg data-testid="search-icon" />}
        />
      );
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
      expect(screen.getByLabelText('search').parentElement).toHaveClass('input-group');
    });

    it('applies custom className to the group wrapper, not the input', () => {
      render(<Input prefix="@" className="grouped" aria-label="handle" />);
      const input = screen.getByLabelText('handle');
      expect(input.parentElement).toHaveClass('input-group', 'grouped');
      expect(input).not.toHaveClass('grouped');
    });
  });

  describe('Interactions', () => {
    it('accepts typed input', async () => {
      const user = userEvent.setup();
      render(<Input aria-label="name" />);
      const input = screen.getByLabelText('name');
      await user.type(input, 'Ada');
      expect(input).toHaveValue('Ada');
    });

    it('fires onChange', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Input aria-label="name" onChange={onChange} />);
      await user.type(screen.getByLabelText('name'), 'x');
      expect(onChange).toHaveBeenCalled();
    });

    it('is disabled when disabled prop is set', () => {
      render(<Input aria-label="name" disabled />);
      expect(screen.getByLabelText('name')).toBeDisabled();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to the input element (plain)', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} aria-label="name" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('forwards ref to the input element (grouped)', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} prefix="@" aria-label="name" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.parentElement).toHaveClass('input-group');
    });
  });

  describe('HTML attributes', () => {
    it('passes through type and name', () => {
      render(<Input type="email" name="email" aria-label="email" />);
      const input = screen.getByLabelText('email');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('name', 'email');
    });

    it('supports aria-invalid alongside error', () => {
      render(<Input error aria-invalid aria-label="email" />);
      expect(screen.getByLabelText('email')).toHaveAttribute('aria-invalid', 'true');
    });
  });
});

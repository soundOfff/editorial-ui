import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from '../Textarea';
import React from 'react';

describe('Textarea', () => {
  describe('Rendering', () => {
    it('renders with the textarea class', () => {
      render(<Textarea aria-label="notes" />);
      expect(screen.getByLabelText('notes')).toHaveClass('textarea');
    });

    it('applies is-error class when error is true', () => {
      render(<Textarea error aria-label="notes" />);
      expect(screen.getByLabelText('notes')).toHaveClass('textarea', 'is-error');
    });

    it('merges custom className', () => {
      render(<Textarea className="tall" aria-label="notes" />);
      expect(screen.getByLabelText('notes')).toHaveClass('textarea', 'tall');
    });
  });

  describe('Resize control', () => {
    it('applies inline resize style when resize prop is set', () => {
      render(<Textarea resize="none" aria-label="notes" />);
      expect(screen.getByLabelText('notes')).toHaveStyle({ resize: 'none' });
    });

    it('does not set inline resize style by default', () => {
      render(<Textarea aria-label="notes" />);
      expect(screen.getByLabelText('notes').style.resize).toBe('');
    });

    it('merges resize with an existing style object', () => {
      render(<Textarea resize="both" style={{ minHeight: '200px' }} aria-label="notes" />);
      const el = screen.getByLabelText('notes');
      expect(el).toHaveStyle({ resize: 'both', minHeight: '200px' });
    });
  });

  describe('Interactions', () => {
    it('accepts typed input', async () => {
      const user = userEvent.setup();
      render(<Textarea aria-label="notes" />);
      const el = screen.getByLabelText('notes');
      await user.type(el, 'hello');
      expect(el).toHaveValue('hello');
    });

    it('fires onChange', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Textarea aria-label="notes" onChange={onChange} />);
      await user.type(screen.getByLabelText('notes'), 'x');
      expect(onChange).toHaveBeenCalled();
    });

    it('is disabled when disabled prop is set', () => {
      render(<Textarea aria-label="notes" disabled />);
      expect(screen.getByLabelText('notes')).toBeDisabled();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to the textarea element', () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      render(<Textarea ref={ref} aria-label="notes" />);
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });
  });

  describe('HTML attributes', () => {
    it('passes through rows and name', () => {
      render(<Textarea rows={6} name="bio" aria-label="notes" />);
      const el = screen.getByLabelText('notes');
      expect(el).toHaveAttribute('rows', '6');
      expect(el).toHaveAttribute('name', 'bio');
    });
  });
});

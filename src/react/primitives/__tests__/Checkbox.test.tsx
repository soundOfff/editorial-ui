import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../Checkbox';
import React from 'react';

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('renders a checkbox with an accessible label from children', () => {
      render(<Checkbox>Save to collection</Checkbox>);
      expect(screen.getByRole('checkbox', { name: 'Save to collection' })).toBeInTheDocument();
    });

    it('applies the check class to the wrapping label', () => {
      const { container } = render(<Checkbox>Label</Checkbox>);
      expect(container.querySelector('label')).toHaveClass('check');
    });

    it('merges custom className onto the label', () => {
      const { container } = render(<Checkbox className="dense">Label</Checkbox>);
      expect(container.querySelector('label')).toHaveClass('check', 'dense');
    });

    it('renders unlabeled via aria-label', () => {
      render(<Checkbox aria-label="Select row" />);
      expect(screen.getByRole('checkbox', { name: 'Select row' })).toBeInTheDocument();
    });

    it('reflects defaultChecked', () => {
      render(<Checkbox defaultChecked>On</Checkbox>);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });
  });

  describe('Keyboard & interaction', () => {
    it('toggles with the Space key when focused', async () => {
      const user = userEvent.setup();
      render(<Checkbox>Toggle</Checkbox>);
      const box = screen.getByRole('checkbox');
      box.focus();
      expect(box).toHaveFocus();
      await user.keyboard(' ');
      expect(box).toBeChecked();
      await user.keyboard(' ');
      expect(box).not.toBeChecked();
    });

    it('toggles on click and fires onChange', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Checkbox onChange={onChange}>Toggle</Checkbox>);
      await user.click(screen.getByRole('checkbox'));
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      render(<Checkbox disabled>Toggle</Checkbox>);
      const box = screen.getByRole('checkbox');
      await user.click(box);
      expect(box).not.toBeChecked();
      expect(box).toBeDisabled();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to the input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox ref={ref}>Label</Checkbox>);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });
  });

  describe('HTML attributes', () => {
    it('passes through name and value', () => {
      render(<Checkbox name="opt" value="a">Label</Checkbox>);
      const box = screen.getByRole('checkbox');
      expect(box).toHaveAttribute('name', 'opt');
      expect(box).toHaveAttribute('value', 'a');
    });
  });
});

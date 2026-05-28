import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from '../Radio';
import React from 'react';

describe('Radio', () => {
  describe('Rendering', () => {
    it('renders a radio with an accessible label from children', () => {
      render(<Radio name="m">Quiet</Radio>);
      expect(screen.getByRole('radio', { name: 'Quiet' })).toBeInTheDocument();
    });

    it('applies the radio class to the wrapping label', () => {
      const { container } = render(<Radio name="m">Label</Radio>);
      expect(container.querySelector('label')).toHaveClass('radio');
    });

    it('merges custom className onto the label', () => {
      const { container } = render(<Radio name="m" className="dense">Label</Radio>);
      expect(container.querySelector('label')).toHaveClass('radio', 'dense');
    });

    it('reflects defaultChecked', () => {
      render(<Radio name="m" defaultChecked>On</Radio>);
      expect(screen.getByRole('radio')).toBeChecked();
    });
  });

  describe('Grouping & keyboard', () => {
    it('only one radio in a group is checked at a time', async () => {
      const user = userEvent.setup();
      render(
        <>
          <Radio name="mode" value="a">A</Radio>
          <Radio name="mode" value="b">B</Radio>
        </>
      );
      const radios = screen.getAllByRole('radio');
      const a = radios[0]!;
      const b = radios[1]!;
      await user.click(a);
      expect(a).toBeChecked();
      await user.click(b);
      expect(b).toBeChecked();
      expect(a).not.toBeChecked();
    });

    it('checks via the Space key when focused', async () => {
      const user = userEvent.setup();
      render(<Radio name="mode" value="a">A</Radio>);
      const radio = screen.getByRole('radio');
      radio.focus();
      expect(radio).toHaveFocus();
      await user.keyboard(' ');
      expect(radio).toBeChecked();
    });

    it('fires onChange when selected', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      render(<Radio name="mode" value="a" onChange={onChange}>A</Radio>);
      await user.click(screen.getByRole('radio'));
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to the input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Radio name="m" ref={ref}>Label</Radio>);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('radio');
    });
  });
});

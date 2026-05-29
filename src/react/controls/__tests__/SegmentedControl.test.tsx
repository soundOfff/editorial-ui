import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SegmentedControl } from '../SegmentedControl';

const items = [
  { id: 'day', label: 'Day' },
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
];

describe('SegmentedControl', () => {
  it('renders all items', () => {
    render(<SegmentedControl items={items} activeId="day" onChange={() => {}} />);
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Week')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
  });

  it('applies is-active class to the active item', () => {
    render(<SegmentedControl items={items} activeId="week" onChange={() => {}} />);
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).not.toHaveClass('is-active');
    expect(radios[1]).toHaveClass('is-active');
    expect(radios[2]).not.toHaveClass('is-active');
  });

  it('sets aria-checked on the active item', () => {
    render(<SegmentedControl items={items} activeId="month" onChange={() => {}} />);
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveAttribute('aria-checked', 'false');
    expect(radios[1]).toHaveAttribute('aria-checked', 'false');
    expect(radios[2]).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onChange when an item is clicked', async () => {
    const onChange = vi.fn();
    render(<SegmentedControl items={items} activeId="day" onChange={onChange} />);
    const user = userEvent.setup();
    await user.click(screen.getByText('Week'));
    expect(onChange).toHaveBeenCalledWith('week');
  });

  it('ArrowRight moves focus and calls onChange to next item', async () => {
    const onChange = vi.fn();
    render(<SegmentedControl items={items} activeId="day" onChange={onChange} />);
    const user = userEvent.setup();
    const radios = screen.getAllByRole('radio');
    radios[0]!.focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith('week');
  });

  it('ArrowLeft moves focus and calls onChange to prev item', async () => {
    const onChange = vi.fn();
    render(<SegmentedControl items={items} activeId="week" onChange={onChange} />);
    const user = userEvent.setup();
    const radios = screen.getAllByRole('radio');
    radios[1]!.focus();
    await user.keyboard('{ArrowLeft}');
    expect(onChange).toHaveBeenCalledWith('day');
  });

  it('ArrowRight wraps from last to first item', async () => {
    const onChange = vi.fn();
    render(<SegmentedControl items={items} activeId="month" onChange={onChange} />);
    const user = userEvent.setup();
    const radios = screen.getAllByRole('radio');
    radios[2]!.focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith('day');
  });

  it('ArrowLeft wraps from first to last item', async () => {
    const onChange = vi.fn();
    render(<SegmentedControl items={items} activeId="day" onChange={onChange} />);
    const user = userEvent.setup();
    const radios = screen.getAllByRole('radio');
    radios[0]!.focus();
    await user.keyboard('{ArrowLeft}');
    expect(onChange).toHaveBeenCalledWith('month');
  });

  it('active item has tabIndex=0, others have tabIndex=-1', () => {
    render(<SegmentedControl items={items} activeId="week" onChange={() => {}} />);
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveAttribute('tabindex', '-1');
    expect(radios[1]).toHaveAttribute('tabindex', '0');
    expect(radios[2]).toHaveAttribute('tabindex', '-1');
  });
});

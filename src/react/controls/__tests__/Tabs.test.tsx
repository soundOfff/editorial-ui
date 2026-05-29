import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from '../Tabs';

const items = [
  { id: 'tab1', label: 'Tab One' },
  { id: 'tab2', label: 'Tab Two' },
  { id: 'tab3', label: 'Tab Three' },
];

describe('Tabs', () => {
  it('renders with role="tablist"', () => {
    render(<Tabs items={items} activeId="tab1" onChange={() => {}} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders all tab items with role="tab"', () => {
    render(<Tabs items={items} activeId="tab1" onChange={() => {}} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
  });

  it('sets aria-selected on the active tab', () => {
    render(<Tabs items={items} activeId="tab2" onChange={() => {}} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('applies is-active class to active tab', () => {
    render(<Tabs items={items} activeId="tab1" onChange={() => {}} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveClass('is-active');
    expect(tabs[1]).not.toHaveClass('is-active');
  });

  it('calls onChange when a tab is clicked', async () => {
    const onChange = vi.fn();
    render(<Tabs items={items} activeId="tab1" onChange={onChange} />);
    const user = userEvent.setup();
    await user.click(screen.getByText('Tab Two'));
    expect(onChange).toHaveBeenCalledWith('tab2');
  });

  it('ArrowRight moves focus and calls onChange to next tab', async () => {
    const onChange = vi.fn();
    render(<Tabs items={items} activeId="tab1" onChange={onChange} />);
    const user = userEvent.setup();
    const tabs = screen.getAllByRole('tab');
    tabs[0]!.focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith('tab2');
  });

  it('ArrowLeft moves focus and calls onChange to prev tab', async () => {
    const onChange = vi.fn();
    render(<Tabs items={items} activeId="tab2" onChange={onChange} />);
    const user = userEvent.setup();
    const tabs = screen.getAllByRole('tab');
    tabs[1]!.focus();
    await user.keyboard('{ArrowLeft}');
    expect(onChange).toHaveBeenCalledWith('tab1');
  });

  it('ArrowRight wraps from last to first tab', async () => {
    const onChange = vi.fn();
    render(<Tabs items={items} activeId="tab3" onChange={onChange} />);
    const user = userEvent.setup();
    const tabs = screen.getAllByRole('tab');
    tabs[2]!.focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith('tab1');
  });

  it('ArrowLeft wraps from first to last tab', async () => {
    const onChange = vi.fn();
    render(<Tabs items={items} activeId="tab1" onChange={onChange} />);
    const user = userEvent.setup();
    const tabs = screen.getAllByRole('tab');
    tabs[0]!.focus();
    await user.keyboard('{ArrowLeft}');
    expect(onChange).toHaveBeenCalledWith('tab3');
  });

  it('active tab has tabIndex=0, others have tabIndex=-1', () => {
    render(<Tabs items={items} activeId="tab2" onChange={() => {}} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('tabindex', '-1');
    expect(tabs[1]).toHaveAttribute('tabindex', '0');
    expect(tabs[2]).toHaveAttribute('tabindex', '-1');
  });
});

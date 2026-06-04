import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectMenu, type SelectMenuOption } from '../SelectMenu';

const options: SelectMenuOption[] = [
  { value: 'es', label: 'Spanish', suffix: 'ES' },
  { value: 'pt', label: 'Portuguese', suffix: 'PT' },
  { value: 'fr', label: 'French', suffix: 'FR' },
  { value: 'de', label: 'German', suffix: 'DE', disabled: true },
];

describe('SelectMenu', () => {
  it('renders the placeholder on the trigger when nothing is selected', () => {
    render(<SelectMenu options={options} placeholder="Translate to" aria-label="lang" />);
    const trigger = screen.getByRole('button', { name: 'lang' });
    expect(trigger).toHaveTextContent('Translate to');
    expect(trigger).toHaveClass('is-placeholder');
  });

  it('shows the selected label when a defaultValue is given', () => {
    render(<SelectMenu options={options} defaultValue="pt" aria-label="lang" />);
    expect(screen.getByRole('button', { name: 'lang' })).toHaveTextContent('Portuguese');
  });

  it('opens the listbox on trigger click', async () => {
    const user = userEvent.setup();
    render(<SelectMenu options={options} aria-label="lang" />);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'lang' }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(4);
  });

  it('selects an option, fires onChange, updates the trigger and closes', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<SelectMenu options={options} aria-label="lang" onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'lang' }));
    await user.click(screen.getByRole('option', { name: /French/ }));
    expect(onChange).toHaveBeenCalledWith('fr');
    expect(screen.getByRole('button', { name: 'lang' })).toHaveTextContent('French');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('marks the selected option with aria-selected', async () => {
    const user = userEvent.setup();
    render(<SelectMenu options={options} defaultValue="es" aria-label="lang" />);
    await user.click(screen.getByRole('button', { name: 'lang' }));
    expect(screen.getByRole('option', { name: /Spanish/ })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('option', { name: /French/ })).toHaveAttribute('aria-selected', 'false');
  });

  it('does not select a disabled option', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<SelectMenu options={options} aria-label="lang" onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'lang' }));
    await user.click(screen.getByRole('option', { name: /German/ }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('filters options when searchable', async () => {
    const user = userEvent.setup();
    render(<SelectMenu options={options} searchable aria-label="lang" />);
    await user.click(screen.getByRole('button', { name: 'lang' }));
    await user.type(screen.getByRole('combobox'), 'por');
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByRole('option', { name: /Portuguese/ })).toBeInTheDocument();
  });

  it('shows the empty message when a filter matches nothing', async () => {
    const user = userEvent.setup();
    render(<SelectMenu options={options} searchable emptyMessage="Nothing here" aria-label="lang" />);
    await user.click(screen.getByRole('button', { name: 'lang' }));
    await user.type(screen.getByRole('combobox'), 'zzz');
    expect(screen.queryAllByRole('option')).toHaveLength(0);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    render(<SelectMenu options={options} aria-label="lang" />);
    await user.click(screen.getByRole('button', { name: 'lang' }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('respects a controlled value', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<SelectMenu options={options} value="es" onChange={onChange} aria-label="lang" />);
    expect(screen.getByRole('button', { name: 'lang' })).toHaveTextContent('Spanish');
    await user.click(screen.getByRole('button', { name: 'lang' }));
    await user.click(screen.getByRole('option', { name: /French/ }));
    expect(onChange).toHaveBeenCalledWith('fr');
    // Controlled: stays on the prop value until the parent updates it.
    expect(screen.getByRole('button', { name: 'lang' })).toHaveTextContent('Spanish');
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Breadcrumb } from '../Breadcrumb';

const items = [
  { label: 'Home', onClick: vi.fn() },
  { label: 'Library', onClick: vi.fn() },
  { label: 'Current Page' },
];

describe('Breadcrumb', () => {
  it('renders all breadcrumb labels', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Library')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  it('renders separators between items', () => {
    render(<Breadcrumb items={items} />);
    const seps = document.querySelectorAll('.breadcrumb-sep');
    expect(seps).toHaveLength(2);
  });

  it('last item has is-current class', () => {
    render(<Breadcrumb items={items} />);
    const crumbs = document.querySelectorAll('.breadcrumb-item');
    const lastCrumb = crumbs[crumbs.length - 1];
    expect(lastCrumb).toHaveClass('is-current');
  });

  it('non-last items do not have is-current class', () => {
    render(<Breadcrumb items={items} />);
    const crumbs = document.querySelectorAll('.breadcrumb-item');
    expect(crumbs[0]).not.toHaveClass('is-current');
    expect(crumbs[1]).not.toHaveClass('is-current');
  });

  it('fires onClick when a non-current item button is clicked', async () => {
    const onHomeClick = vi.fn();
    const breadcrumbItems = [
      { label: 'Home', onClick: onHomeClick },
      { label: 'Current' },
    ];
    render(<Breadcrumb items={breadcrumbItems} />);
    const user = userEvent.setup();
    await user.click(screen.getByText('Home'));
    expect(onHomeClick).toHaveBeenCalledOnce();
  });

  it('last item renders as plain text without button', () => {
    render(<Breadcrumb items={items} />);
    const crumbs = document.querySelectorAll('.breadcrumb-item');
    const lastCrumb = crumbs[crumbs.length - 1];
    expect(lastCrumb?.querySelector('button')).toBeNull();
  });

  it('non-last items with onClick render as buttons', () => {
    render(<Breadcrumb items={items} />);
    const crumbs = document.querySelectorAll('.breadcrumb-item');
    expect(crumbs[0]?.querySelector('button')).not.toBeNull();
    expect(crumbs[1]?.querySelector('button')).not.toBeNull();
  });

  it('has aria-label on the nav element', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
  });
});

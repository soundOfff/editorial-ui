import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  it('renders Prev and Next buttons', () => {
    render(<Pagination page={3} totalPages={5} onChange={() => {}} />);
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
  });

  it('renders page number buttons', () => {
    render(<Pagination page={1} totalPages={5} onChange={() => {}} />);
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByLabelText(`Page ${i}`)).toBeInTheDocument();
    }
  });

  it('active page has is-active class', () => {
    render(<Pagination page={3} totalPages={5} onChange={() => {}} />);
    const page3 = screen.getByLabelText('Page 3');
    expect(page3).toHaveClass('is-active');
  });

  it('active page has aria-current="page"', () => {
    render(<Pagination page={2} totalPages={5} onChange={() => {}} />);
    const page2 = screen.getByLabelText('Page 2');
    expect(page2).toHaveAttribute('aria-current', 'page');
  });

  it('Prev button is disabled on first page', () => {
    render(<Pagination page={1} totalPages={5} onChange={() => {}} />);
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('Next button is disabled on last page', () => {
    render(<Pagination page={5} totalPages={5} onChange={() => {}} />);
    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });

  it('calls onChange with page-1 when Prev is clicked', async () => {
    const onChange = vi.fn();
    render(<Pagination page={3} totalPages={5} onChange={onChange} />);
    const user = userEvent.setup();
    await user.click(screen.getByLabelText('Previous page'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('calls onChange with page+1 when Next is clicked', async () => {
    const onChange = vi.fn();
    render(<Pagination page={3} totalPages={5} onChange={onChange} />);
    const user = userEvent.setup();
    await user.click(screen.getByLabelText('Next page'));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('calls onChange with the correct page when a page button is clicked', async () => {
    const onChange = vi.fn();
    render(<Pagination page={1} totalPages={5} onChange={onChange} />);
    const user = userEvent.setup();
    await user.click(screen.getByLabelText('Page 4'));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('shows ellipsis for large page ranges', () => {
    render(<Pagination page={5} totalPages={20} onChange={() => {}} />);
    const ellipses = document.querySelectorAll('.page-item[aria-hidden="true"]');
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('renders no more than 7 page number buttons for large ranges', () => {
    render(<Pagination page={10} totalPages={50} onChange={() => {}} />);
    const pageButtons = screen.queryAllByRole('button', { name: /^Page \d+$/ });
    expect(pageButtons.length).toBeLessThanOrEqual(7);
  });
});

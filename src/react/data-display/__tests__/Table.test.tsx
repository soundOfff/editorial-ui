import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Table } from '../Table';

describe('Table', () => {
  it('Table.Root renders a <table> element with table-root class', () => {
    render(
      <Table.Root data-testid="tbl">
        <tbody><tr><td>Cell</td></tr></tbody>
      </Table.Root>
    );
    const el = screen.getByTestId('tbl');
    expect(el.tagName).toBe('TABLE');
    expect(el).toHaveClass('table-root');
  });

  it('Table is the same as Table.Root', () => {
    render(
      <Table data-testid="tbl2">
        <tbody><tr><td>Cell</td></tr></tbody>
      </Table>
    );
    const el = screen.getByTestId('tbl2');
    expect(el.tagName).toBe('TABLE');
    expect(el).toHaveClass('table-root');
  });

  it('Table.Head renders a <thead> element', () => {
    render(
      <table>
        <Table.Head data-testid="thead">
          <tr><th>Header</th></tr>
        </Table.Head>
      </table>
    );
    const el = screen.getByTestId('thead');
    expect(el.tagName).toBe('THEAD');
  });

  it('Table.Body renders a <tbody> element', () => {
    render(
      <table>
        <Table.Body data-testid="tbody">
          <tr><td>Row</td></tr>
        </Table.Body>
      </table>
    );
    const el = screen.getByTestId('tbody');
    expect(el.tagName).toBe('TBODY');
  });

  it('Table.Footer renders a <tfoot> element', () => {
    render(
      <table>
        <tbody><tr><td>Row</td></tr></tbody>
        <Table.Footer data-testid="tfoot">
          <tr><td>Footer</td></tr>
        </Table.Footer>
      </table>
    );
    const el = screen.getByTestId('tfoot');
    expect(el.tagName).toBe('TFOOT');
  });

  it('renders full compound structure with correct semantic HTML', () => {
    render(
      <Table.Root data-testid="full-table">
        <Table.Head>
          <tr><th>Name</th><th>Value</th></tr>
        </Table.Head>
        <Table.Body>
          <tr><td>Item A</td><td>10</td></tr>
        </Table.Body>
        <Table.Footer>
          <tr><td colSpan={2}>Total</td></tr>
        </Table.Footer>
      </Table.Root>
    );
    const table = screen.getByTestId('full-table');
    expect(table.tagName).toBe('TABLE');
    expect(table.querySelector('thead')).toBeInTheDocument();
    expect(table.querySelector('tbody')).toBeInTheDocument();
    expect(table.querySelector('tfoot')).toBeInTheDocument();
  });

  it('merges custom className on Table.Root', () => {
    render(
      <Table.Root data-testid="cls-table" className="extra">
        <tbody><tr><td>x</td></tr></tbody>
      </Table.Root>
    );
    const el = screen.getByTestId('cls-table');
    expect(el).toHaveClass('table-root');
    expect(el).toHaveClass('extra');
  });

  it('forwards ref on Table.Root', () => {
    const ref = React.createRef<HTMLTableElement>();
    render(
      <Table.Root ref={ref}>
        <tbody><tr><td>x</td></tr></tbody>
      </Table.Root>
    );
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });
});

import React from 'react';

const TableRoot = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  ({ className, children, ...props }, ref) => (
    <table
      ref={ref}
      className={['table-root', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </table>
  )
);
TableRoot.displayName = 'Table.Root';

const TableHead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ children, ...props }, ref) => (
  <thead ref={ref} {...props}>
    {children}
  </thead>
));
TableHead.displayName = 'Table.Head';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ children, ...props }, ref) => (
  <tbody ref={ref} {...props}>
    {children}
  </tbody>
));
TableBody.displayName = 'Table.Body';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ children, ...props }, ref) => (
  <tfoot ref={ref} {...props}>
    {children}
  </tfoot>
));
TableFooter.displayName = 'Table.Footer';

interface TableComponent
  extends React.ForwardRefExoticComponent<
    React.TableHTMLAttributes<HTMLTableElement> & React.RefAttributes<HTMLTableElement>
  > {
  Root: typeof TableRoot;
  Head: typeof TableHead;
  Body: typeof TableBody;
  Footer: typeof TableFooter;
}

export const Table = TableRoot as TableComponent;
Table.Root = TableRoot;
Table.Head = TableHead;
Table.Body = TableBody;
Table.Footer = TableFooter;

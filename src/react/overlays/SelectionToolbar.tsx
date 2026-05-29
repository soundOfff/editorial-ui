import React from 'react';

export interface SelectionToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  fromLanguage?: string;
  toLanguage?: string;
  onFromClick?: () => void;
  onToClick?: () => void;
}

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="7"/><path d="M3,10 h14"/><path d="M10,3 C8,6 8,14 10,17 C12,14 12,6 10,3"/>
  </svg>
);

export const SelectionToolbar = React.forwardRef<HTMLDivElement, SelectionToolbarProps>(
  ({ fromLanguage, toLanguage, onFromClick, onToClick, className, children, ...props }, ref) => (
    <div ref={ref} className={['selection-toolbar', className].filter(Boolean).join(' ')} {...props}>
      {fromLanguage && (
        <button className="sel-lang-btn" onClick={onFromClick} type="button">
          <GlobeIcon />
          {fromLanguage}
        </button>
      )}
      {fromLanguage && toLanguage && <div className="sel-sep" />}
      {toLanguage && (
        <button className="sel-lang-btn" onClick={onToClick} type="button">
          {toLanguage}
        </button>
      )}
      {children}
    </div>
  )
);

SelectionToolbar.displayName = 'SelectionToolbar';

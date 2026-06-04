// Editorial UI React Components
// Auto-import styles
import '../styles/index.css';

// Primitives
export { Button } from './primitives/Button';
export type { ButtonProps } from './primitives/Button';
export { Input } from './primitives/Input';
export type { InputProps } from './primitives/Input';
export { Textarea } from './primitives/Textarea';
export type { TextareaProps } from './primitives/Textarea';
export { Select } from './primitives/Select';
export type { SelectProps } from './primitives/Select';
export { SelectMenu } from './primitives/SelectMenu';
export type { SelectMenuProps, SelectMenuOption } from './primitives/SelectMenu';
export { Checkbox } from './primitives/Checkbox';
export type { CheckboxProps } from './primitives/Checkbox';
export { Radio } from './primitives/Radio';
export type { RadioProps } from './primitives/Radio';
export { Switch } from './primitives/Switch';
export type { SwitchProps } from './primitives/Switch';
export { Link } from './primitives/Link';
export type { LinkProps } from './primitives/Link';

// Controls
export { Tabs } from './controls/Tabs';
export type { TabsProps, TabItem } from './controls/Tabs';
export { SegmentedControl } from './controls/SegmentedControl';
export type { SegmentedControlProps, SegItem } from './controls/SegmentedControl';

// Navigation
export { Breadcrumb } from './navigation/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './navigation/Breadcrumb';
export { Pagination } from './navigation/Pagination';
export type { PaginationProps } from './navigation/Pagination';

// Data Display
export { Badge } from './data-display/Badge';
export type { BadgeProps } from './data-display/Badge';
export { Chip } from './data-display/Chip';
export type { ChipProps } from './data-display/Chip';
export { Dot } from './data-display/Dot';
export type { DotProps } from './data-display/Dot';
export { Kbd } from './data-display/Kbd';
export type { KbdProps } from './data-display/Kbd';
export { Avatar } from './data-display/Avatar';
export type { AvatarProps } from './data-display/Avatar';
export { Alert } from './data-display/Alert';
export type { AlertProps } from './data-display/Alert';
export { Card } from './data-display/Card';
export type { CardProps } from './data-display/Card';
export { Table } from './data-display/Table';
export { Progress } from './data-display/Progress';
export type { ProgressProps } from './data-display/Progress';
export { EmptyState } from './data-display/EmptyState';
export type { EmptyStateProps } from './data-display/EmptyState';

// Overlays
export { Modal } from './overlays/Modal';
export type { ModalProps } from './overlays/Modal';
export { ToastProvider, useToast, Toaster } from './overlays/Toast';
export type { ToastItem } from './overlays/Toast';
export { Tooltip } from './overlays/Tooltip';
export type { TooltipProps } from './overlays/Tooltip';
export { SelectionToolbar } from './overlays/SelectionToolbar';
export type { SelectionToolbarProps } from './overlays/SelectionToolbar';

// Theme
export { ThemeProvider } from './theme/ThemeProvider';
export type { ThemeProviderProps } from './theme/ThemeProvider';
export { accentPresets } from './theme/presets';
export type { AccentPresetName, AccentTuple } from './theme/presets';

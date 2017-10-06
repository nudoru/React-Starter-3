import Enum from '../../utils/Enum';

export const SIZE_MAP = {
  large: 'lg',
  medium: 'md',
  small: 'sm',
  xsmall: 'xs'
};

export const SIZE = Enum('large', 'medium', 'small', 'xsmall');
export const DEVICE_SIZES = Enum('lg', 'md', 'sm', 'xs');
export const STATE = Enum('success', 'warning', 'danger', 'info');
export const STYLE = Enum(
  'default',
  'primary',
  'secondary',
  'outline',
  'link',
  'inverse',
  'light',
  'dark'
);

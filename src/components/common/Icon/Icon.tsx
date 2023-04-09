import { disabledStyle } from '@src/style/css';
import React, { FunctionComponent, useMemo } from 'react';
import { IconBase } from 'react-icons';
import {
  FiAlertTriangle,
  FiArrowDown,
  FiArrowLeft,
  FiArrowRight,
  FiArrowUp,
  FiBell,
  FiBellOff,
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiChevronsDown,
  FiChevronsUp,
  FiClipboard,
  FiCornerDownRight,
  FiCopy,
  FiEdit,
  FiEye,
  FiEyeOff,
  FiExternalLink,
  FiGift,
  FiFileText,
  FiHome,
  FiInfo,
  FiLoader,
  FiLogOut,
  FiMinus,
  FiMoreHorizontal,
  FiMoreVertical,
  FiPlus,
  FiRefreshCw,
  FiRotateCw,
  FiSearch,
  FiSettings,
  FiTrash2,
  FiUser,
  FiUserCheck,
  FiUserX,
  FiUsers,
  FiUploadCloud,
  FiX,
} from 'react-icons/fi';
import { IconType } from 'react-icons/lib';
import styled, { DefaultTheme, css, useTheme } from 'styled-components';

export type FeatherIconName =
  | 'alert-triangle'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'arrow-down-right'
  | 'bell'
  | 'bell-off'
  | 'check'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'chevrons-down'
  | 'chevrons-up'
  | 'clipboard'
  | 'copy'
  | 'edit'
  | 'eye'
  | 'eye-off'
  | 'external-link'
  | 'gift'
  | 'file-text'
  | 'home'
  | 'info'
  | 'loader'
  | 'log-out'
  | 'minus'
  | 'more-horizontal'
  | 'more-vertical'
  | 'plus'
  | 'refresh'
  | 'search'
  | 'settings'
  | 'sync'
  | 'trash'
  | 'uploadCloud'
  | 'user'
  | 'user-check'
  | 'user-x'
  | 'users'
  | 'x';

const FeatherIconMap: Record<FeatherIconName, IconType> = {
  'alert-triangle': FiAlertTriangle,
  'arrow-down': FiArrowDown,
  'arrow-left': FiArrowLeft,
  'arrow-right': FiArrowRight,
  'arrow-up': FiArrowUp,
  'arrow-down-right': FiCornerDownRight,
  bell: FiBell,
  'bell-off': FiBellOff,
  check: FiCheck,
  'chevron-down': FiChevronDown,
  'chevron-left': FiChevronLeft,
  'chevron-right': FiChevronRight,
  'chevron-up': FiChevronUp,
  'chevrons-down': FiChevronsDown,
  'chevrons-up': FiChevronsUp,
  clipboard: FiClipboard,
  copy: FiCopy,
  edit: FiEdit,
  eye: FiEye,
  'eye-off': FiEyeOff,
  'external-link': FiExternalLink,
  gift: FiGift,
  'file-text': FiFileText,
  home: FiHome,
  info: FiInfo,
  loader: FiLoader,
  'log-out': FiLogOut,
  minus: FiMinus,
  'more-horizontal': FiMoreHorizontal,
  'more-vertical': FiMoreVertical,
  plus: FiPlus,
  refresh: FiRotateCw,
  search: FiSearch,
  settings: FiSettings,
  sync: FiRefreshCw,
  trash: FiTrash2,
  uploadCloud: FiUploadCloud,
  user: FiUser,
  'user-check': FiUserCheck,
  'user-x': FiUserX,
  users: FiUsers,
  x: FiX,
};

type IconProps = {
  /**
   * The name of the icon to render
   */
  icon: FeatherIconName;
  /**
   * The size of the icon.
   * Uses 'medium' per default. Use 'small' or 'large' for predefined sizes.
   * Use `${number}rem` for custom sizes.
   * @default 'medium'
   * @type 'small' | 'medium' | 'large' | `${number}rem`
   */
  size?: 'small' | 'medium' | 'large' | `${number}rem`;
  /**
   * The color of the icon. Uses body text color per default. Use 'inherit' to inherit the color from the parent element.
   * @default undefined
   * @type 'primary' | 'secondary' | 'tertiary' | 'inherit'
   */
  color?: 'primary' | 'secondary' | 'inherit';
  /**
   * If true, the icon will be displayed with a hover effect.
   * @type boolean
   * @default false
   */
  hoverEffect?: boolean;
  /**
   * onClick handler
   * @type Function
   * @default undefined
   */
  onClick?: Function;
  /**
   * If true, prevents event propagation
   */
  stopPropagation?: boolean;
  /**
   * Disables the icon
   * @type boolean
   * @default false
   */
  disabled?: boolean;
  title?: string;
  marginLeft?: `${number}rem`;
  marginRight?: `${number}rem`;
  marginTop?: `${number}rem`;
  marginBottom?: `${number}rem`;
  verticalAlign?:
    | 'middle'
    | 'baseline'
    | 'sub'
    | 'super'
    | 'text-top'
    | 'text-bottom'
    | 'top'
    | 'bottom';
};

function getIconSize(size: IconProps['size']) {
  switch (size) {
    case 'small':
      return '0.875rem';
    case 'medium':
      return '1rem';
    case 'large':
      return '1.5rem';
    default:
      return size;
  }
}

function getIconColor(
  color: IconProps['color'] = 'inherit',
  theme: DefaultTheme
) {
  switch (color) {
    case 'primary':
    case 'secondary':
      return theme.colors[color].main;
    case 'inherit':
    default:
      return 'inherit';
  }
}

const StyledIcon = styled(IconBase)<Omit<IconProps, 'icon'>>`
  color: ${({ color, theme }) => getIconColor(color, theme)};
  cursor: ${({ disabled, onClick }) =>
    disabled || !onClick ? 'inherit' : 'pointer'};

  &.hover-effect {
    transition: filter ${({ theme }) => theme.transition.duration.M} ease-in-out;
    &:hover {
      filter: brightness(0.8);
    }
  }

  ${({ disabled }) => disabled && disabledStyle}
`;

export const Icon: FunctionComponent<IconProps> = ({
  icon,
  size = 'medium',
  color,
  hoverEffect,
  onClick,
  stopPropagation = false,
  disabled = false,
  title,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  verticalAlign,
}) => {
  const FeatherIcon = useMemo(() => FeatherIconMap[icon], [icon]);

  function handleOnClick(e: React.MouseEvent) {
    if (stopPropagation) {
      e?.preventDefault();
      e?.stopPropagation();
    }

    if (disabled) {
      return;
    }

    onClick?.();
  }

  return (
    <StyledIcon
      className={hoverEffect ? 'hover-effect' : ''}
      as={FeatherIcon}
      size={getIconSize(size)}
      color={color}
      onClick={handleOnClick}
      title={title}
      disabled={disabled}
      style={{
        verticalAlign,
        pointerEvents: disabled ? 'none' : 'auto',
        marginLeft,
        marginRight,
        marginTop,
        marginBottom,
      }}
    />
  );
};

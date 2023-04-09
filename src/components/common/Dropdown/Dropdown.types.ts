export type DropdownProps = {
  label?: string;
  /**
   * Index of the selected option.
   * If no option is selected, pass -1.
   */
  selectedOptionIdx: number;
  /**
   * Array of options to be displayed in the dropdown.
   */
  options: string[];
  /**
   * Callback function that is called when the selected option changes.
   * Passes the index of the newly selected option.
   */
  onChange: (idx: number) => void;
  /**
   * Placeholder text to be displayed when no option is selected.
   * @default ''
   */
  placeholder?: string;
  /**
   * Whether the dropdown is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the dropdown should allow the user to clear the selection.
   * @default false
   */
  allowClear?: boolean;
  /**
   * Custom styles to be applied to the dropdown.
   */
  customStyle?: {
    maxWidth?: `${number}rem` | `${number}%`;
    width?: `${number}rem` | `${number}%`;
  };
};

export type StyledDropdownContainerProps = {
  disabled?: boolean;
  customStyle?: DropdownProps['customStyle'];
};

export type DropdownInputBtnProps = {
  isOpen: boolean;
  disabled?: boolean;
  showPlaceholder: boolean;
};

export type DropdownOptionsListItemProps = {
  selected: boolean;
};

export type InputMode =
  | 'text'
  | 'numeric'
  | 'decimal'
  | 'email'
  | 'search'
  | 'tel';
export type InputFilter = 'number' | 'decimal';
export type InputOptions = {
  minNumber?: number;
  maxNumber?: number;
  minLength?: number;
  maxLength?: number;
};
export type InputCustomStyle = {
  maxWidth?: `${number}rem` | `${number}%`;
  width?: `${number}rem` | `${number}%`;
};

export type InputLabelProps = {
  children: React.ReactNode;
};

export type InputProps = {
  /**
   * The value of the input
   */
  value: string;
  /**
   * The function to call when the input value changes
   */
  onChange: (value: string) => void;
  /**
   * The label for the input
   */
  label?: string;
  /**
   * The placeholder for the input
   */
  placeholder?: string;
  /**
   * The type of the input.
   * Use `filter` to filter the input value.
   * @default 'text'
   */
  type?: 'text' | 'password';
  /**
   * Whether the input is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the input is required.
   * @default false
   */
  required?: boolean;
  /**
   * Whether to autofocus the input.
   * @default false
   */
  autoFocus?: boolean;
  /**
   * The mode of the input.
   */
  inputMode?: InputMode;
  /**
   * The filter to apply to the input value.
   * Use 'number'/'decimal' to filter out non-numeric input.
   */
  filter?: InputFilter;
  /**
   * The options for the input, such as min/max number and min/max length.
   */
  options?: InputOptions;
  /**
   * Whether to indicate an error. Turns the border red.
   * @default false
   */
  indicateError?: boolean;
  /**
   * The error message to display if `indicateError` is true.
   * Appears below the input.
   * @default undefined
   */
  errorMessage?: string;
  /**
   * The custom style for the input.
   */
  customStyle?: InputCustomStyle;
};

export type InputContainerProps = {
  disabled?: boolean;
  customStyle?: InputCustomStyle;
};

export type StyledInputFieldProps = {
  type: InputProps['type'];
  indicateError?: boolean;
};

export type DatePickerModalProps = {
  day: number;
  month: number;
  year: number;
  isSubmitDisabled: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (value: string, part: 'day' | 'month' | 'year') => void;
  onClickOutside: () => void;
};

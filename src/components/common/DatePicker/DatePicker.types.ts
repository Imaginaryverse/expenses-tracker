type DatePickerCustomStyle = {
  maxWidth?: `${number}rem` | `${number}%`;
  width?: `${number}rem` | `${number}%`;
};

export type DatePickerProps = {
  label?: string;
  date: Date;
  onChange: (date: Date) => void;
  disabled?: boolean;
  customStyle?: DatePickerCustomStyle;
};

export type DatePickerContainerProps = {
  disabled?: boolean;
  customStyle?: DatePickerCustomStyle;
};

export type DatePickerBtnContainerProps = {
  isOpen: boolean;
};

export type DatePickerChevronBtnProps = {
  direction: 'backwards' | 'forwards';
  disabled?: boolean;
  onClick: () => void;
};

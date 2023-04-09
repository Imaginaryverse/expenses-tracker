import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Icon } from '../Icon/Icon';
import { DatePickerChevronBtnProps } from './DatePicker.types';
import { disabledStyle } from '@src/style/css';

const StyledDatePickerChevronBtn = styled.button<DatePickerChevronBtnProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 100%;
  padding: 0;

  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.M};

  color: ${({ theme }) => theme.colors.body.text};
  background-color: transparent;

  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transition.duration.M}
      ease-in-out,
    border-color ${({ theme }) => theme.transition.duration.M} ease-in-out;

  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.colors.body.text}20;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.body.text}20;
  }

  ${({ disabled }) => disabled && disabledStyle}
`;

export const DatePickerChevronBtn: FunctionComponent<
  DatePickerChevronBtnProps
> = ({ direction, disabled, onClick }) => {
  return (
    <StyledDatePickerChevronBtn
      direction={direction}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon
        icon={direction === 'backwards' ? 'chevron-left' : 'chevron-right'}
      />
    </StyledDatePickerChevronBtn>
  );
};

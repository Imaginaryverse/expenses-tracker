import {
  FormEvent,
  FunctionComponent,
  useState,
  useMemo,
  useEffect,
} from 'react';
import styled from 'styled-components';

import { InputLabel } from '../Input/Input.label';
import { disabledStyle } from '@src/style/css';
import {
  DatePickerContainerProps,
  DatePickerBtnContainerProps,
  DatePickerProps,
} from './DatePicker.types';
import { formatDate, getNumDaysInMonth } from './DatePicker.utils';
import { DatePickerModal } from './DatePicker.modal';
import { DatePickerChevronBtn } from './DatePicker.chevronBtn';
import { DatePickerModalBtn } from './DatePicker.modalBtn';

const StyledDatePickerContainer = styled.div<DatePickerContainerProps>`
  position: relative;
  width: ${({ customStyle }) => customStyle?.width ?? '100%'};
  max-width: ${({ customStyle }) => customStyle?.maxWidth ?? '280px'};
  display: flex;
  flex-direction: column;

  ${({ disabled }) => disabled && disabledStyle}
`;

const StyledDatePickerBtnContainer = styled.div<DatePickerBtnContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 2.38rem;
  padding: ${({ theme }) => theme.spacing['0.25']};
  gap: 0.5rem;

  border: 1px solid ${({ theme }) => theme.colors.body.border};
  border-radius: ${({ theme }) => theme.borderRadius.M};
  background-color: ${({ theme }) => theme.colors.body.text}10;

  transition: border-color ${({ theme }) => theme.transition.duration.M}
    ease-in-out;

  ${({ isOpen, theme }) =>
    isOpen &&
    `
    border-color: ${theme.colors.primary.main};
    `}
`;

export const DatePicker: FunctionComponent<DatePickerProps> = ({
  label,
  date,
  onChange,
  disabled,
  customStyle,
}) => {
  const now = new Date();

  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);
  const [day, setDay] = useState(now.getDate());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  const numDaysInMonth = useMemo(
    () => getNumDaysInMonth(month, year),
    [month, year]
  );

  const isSubmitDisabled = useMemo(() => {
    // if the input date is the same as the date passed in, disable the submit button
    if (
      day === date.getDate() &&
      month === date.getMonth() + 1 &&
      year === date.getFullYear()
    ) {
      return true;
    }

    // If the input date is past today, disable the submit button
    if (year > now.getFullYear()) {
      return true;
    }
    if (year === now.getFullYear() && month > now.getMonth() + 1) {
      return true;
    }
    if (
      year === now.getFullYear() &&
      month === now.getMonth() + 1 &&
      day > now.getDate()
    ) {
      return true;
    }

    // If any of the date parts are 0, disable the submit button
    return (
      day === 0 ||
      month === 0 ||
      year === 0 ||
      day > numDaysInMonth ||
      month > 12
    );
  }, [day, month, year, numDaysInMonth]);

  const isNextChevronDisabled = useMemo(() => {
    // If the date is today, disable the next chevron button
    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }, [date, now]);

  function handleInputChange(value: string, part: 'day' | 'month' | 'year') {
    const numberRegex = /^[0-9]*$/;

    if (!numberRegex.test(value)) return;

    switch (part) {
      case 'day':
        if (Number(value) > numDaysInMonth) return;

        setDay(Number(value));
        break;
      case 'month':
        if (Number(value) > 12) return;

        setMonth(Number(value));
        break;
      case 'year':
        setYear(Number(value));
        break;
    }
  }

  function handleChevronClick(direction: 'backwards' | 'forwards') {
    const newDate = new Date(date);

    switch (direction) {
      case 'backwards':
        newDate.setDate(newDate.getDate() - 1);
        break;
      case 'forwards':
        newDate.setDate(newDate.getDate() + 1);
        break;
      default:
        break;
    }

    setDay(newDate.getDate());
    setMonth(newDate.getMonth());
    setYear(newDate.getFullYear());
    onChange(newDate);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newDate = new Date(year, month - 1, day);
    onChange(newDate);
    setIsDatePickerModalOpen(false);
  }

  function handleClickOutside() {
    setDay(date.getDate());
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
    setIsDatePickerModalOpen(false);
  }

  useEffect(() => {
    if (disabled) {
      setIsDatePickerModalOpen(false);
    }
  }, [disabled]);

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  }, [date]);

  return (
    <StyledDatePickerContainer disabled={disabled} customStyle={customStyle}>
      {!!label && <InputLabel>{label}</InputLabel>}

      <StyledDatePickerBtnContainer isOpen={isDatePickerModalOpen}>
        <DatePickerChevronBtn
          direction='backwards'
          disabled={disabled}
          onClick={() => handleChevronClick('backwards')}
        />

        <DatePickerModalBtn
          disabled={!!disabled}
          onClick={() => setIsDatePickerModalOpen(true)}
        >
          {formatDate(date, now)}
        </DatePickerModalBtn>

        <DatePickerChevronBtn
          direction='forwards'
          disabled={disabled || isNextChevronDisabled}
          onClick={() => handleChevronClick('forwards')}
        />
      </StyledDatePickerBtnContainer>

      {isDatePickerModalOpen && (
        <DatePickerModal
          day={day}
          month={month}
          year={year}
          isSubmitDisabled={isSubmitDisabled}
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
          onClickOutside={handleClickOutside}
        />
      )}
    </StyledDatePickerContainer>
  );
};

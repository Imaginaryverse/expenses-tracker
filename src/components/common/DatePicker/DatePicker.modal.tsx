import { FunctionComponent, useRef } from 'react';
import { Text } from '../Text/Text';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { useOutsideClick } from '@src/components/hooks';
import { DatePickerModalProps } from '../Input/Input.types';

const StyledDatePickerModal = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 1;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.M};

  background-color: ${({ theme }) => theme.colors.body.background};

  animation: fade-in 0.2s ease-in-out;

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const StyledDatePickerForm = styled.form`
  padding: ${({ theme }) => theme.spacing['2']};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  background-color: ${({ theme }) => theme.colors.body.text}10;
`;

const StyledDatePickerModalHeader = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
`;

const StyledDatePickerInputGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: ${({ theme }) => theme.spacing['0.5']};
`;

const StyledDatePickerModalInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing['0.5']} ${theme.spacing['0.5']}`};

  font-size: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.body.text};
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.body.border};
  background-color: ${({ theme }) => theme.colors.body.text}10;
  transition: border-color ${({ theme }) => theme.transition.duration.M}
      ease-in-out,
    background-color ${({ theme }) => theme.transition.duration.M} ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    background-color: ${({ theme }) => theme.colors.body.text}20;
  }
`;

export const DatePickerModal: FunctionComponent<DatePickerModalProps> = ({
  day,
  month,
  year,
  isSubmitDisabled,
  onSubmit,
  onInputChange,
  onClickOutside,
}) => {
  const datePickerModalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(datePickerModalRef, onClickOutside);

  return (
    <StyledDatePickerModal ref={datePickerModalRef}>
      <StyledDatePickerForm onSubmit={onSubmit}>
        <StyledDatePickerModalHeader>
          <Text variant='label' textAlign='center' fontWeight='bold'>
            Date
          </Text>

          <Text variant='label' textAlign='center' fontWeight='bold'>
            Month
          </Text>

          <Text variant='label' textAlign='center' fontWeight='bold'>
            Year
          </Text>
        </StyledDatePickerModalHeader>

        <StyledDatePickerInputGroup>
          <StyledDatePickerModalInput
            type='text'
            value={day}
            onChange={e => onInputChange(e.target.value, 'day')}
          />

          <StyledDatePickerModalInput
            type='text'
            value={month}
            onChange={e => onInputChange(e.target.value, 'month')}
          />

          <StyledDatePickerModalInput
            type='text'
            value={year}
            onChange={e => onInputChange(e.target.value, 'year')}
          />
        </StyledDatePickerInputGroup>

        <Button type='submit' grow disabled={isSubmitDisabled}>
          Submit
        </Button>
      </StyledDatePickerForm>
    </StyledDatePickerModal>
  );
};

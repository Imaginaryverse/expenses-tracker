import { FunctionComponent } from 'react';
import styled from 'styled-components';

type DatePickerModalBtnProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
};

const StyledDatePickerModalBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

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

  user-select: none;
`;

export const DatePickerModalBtn: FunctionComponent<DatePickerModalBtnProps> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <StyledDatePickerModalBtn onClick={onClick} disabled={disabled}>
      {children}
    </StyledDatePickerModalBtn>
  );
};

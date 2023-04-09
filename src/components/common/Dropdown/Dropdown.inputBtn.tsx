import styled from 'styled-components';
import { DropdownInputBtnProps } from './Dropdown.types';
import { disabledStyle } from '@src/style/css';

export const DropdownInputBtn = styled.button.attrs({
  type: 'button',
})<DropdownInputBtnProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing['0.5']} ${theme.spacing['0.5']}`};

  font-size: 1rem;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.body.text};

  background-color: ${({ theme }) => theme.colors.body.text}10;
  border: 1px solid ${({ theme }) => theme.colors.body.border};
  border-radius: ${({ theme }) => theme.borderRadius.M};

  cursor: pointer;

  transition: background-color ${({ theme }) => theme.transition.duration.M},
    border-color ${({ theme }) => theme.transition.duration.M};

  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.colors.body.text}20;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  ${({ isOpen, theme }) =>
    isOpen &&
    `
    background-color: ${theme.colors.body.text}20;
    border-color: ${theme.colors.primary.main};
  `}

  ${({ disabled }) => disabled && disabledStyle}

  ${({ showPlaceholder, theme }) =>
    showPlaceholder &&
    `
    color: ${theme.colors.body.text}80;
  `}

  svg {
    width: 1rem;
    height: 1rem;
    stroke: ${({ theme }) => theme.colors.body.text};

    opacity: 0.75;

    transition: all ${({ theme }) => theme.transition.duration.M} ease-in-out;

    &:hover {
      opacity: 1;
    }
  }
`;

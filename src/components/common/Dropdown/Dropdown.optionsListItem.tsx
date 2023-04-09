import styled from 'styled-components';
import { DropdownOptionsListItemProps } from './Dropdown.types';

export const DropdownOptionsListItem = styled.li.attrs({
  role: 'button',
})<DropdownOptionsListItemProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${({ theme }) => `${theme.spacing['0.5']} ${theme.spacing['0.5']}`};

  font-size: 1rem;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.body.text};

  background-color: ${({ theme, selected }) =>
    !selected ? `${theme.colors.body.text}10` : `${theme.colors.body.text}30`};
  border: none;

  cursor: pointer;

  transition: background-color ${({ theme }) => theme.transition.duration.M};

  &:hover {
    ${({ theme, selected }) =>
      !selected && `background-color: ${theme.colors.body.text}20;`};
  }

  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.colors.body.text}20;
  }
`;

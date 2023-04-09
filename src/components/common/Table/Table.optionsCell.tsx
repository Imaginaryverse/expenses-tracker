import styled from 'styled-components';
import { TableProps } from './Table.types';
import { useRef, useState } from 'react';
import { useOutsideClick } from '@src/components/hooks';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

const StyledOptionsCell = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledOptionsBtn = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing['0.25']};

  cursor: pointer;

  color: ${({ theme }) => theme.colors.body.text};
  background-color: transparent;

  border: 1px solid transparent;
  border-radius: 50%;

  transition: all ${({ theme }) => theme.transition.duration.M} ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &.open {
    color: ${({ theme }) => theme.colors.primary.text};
    background-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const StyledOptionsMenu = styled.ul`
  position: absolute;
  top: -100%;
  z-index: 1;
  width: max-content;
  display: flex;
  flex-direction: column;

  border-radius: ${({ theme }) =>
    `${theme.borderRadius.L} 0 ${theme.borderRadius.L} ${theme.borderRadius.L}`};
  box-shadow: 0.25rem 0.25rem 25px rgba(0, 0, 0, 0.125);

  list-style: none;
  overflow: hidden;
  transform: translateX(-102.5%) translateY(52.5%);

  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const StyledOptionsMenuItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
  gap: ${({ theme }) => theme.spacing['0.25']};

  cursor: pointer;

  color: ${({ theme }) => theme.colors.primary.text};
  background-color: ${({ theme }) => theme.colors.primary.main};

  transition: filter ${({ theme }) => theme.transition.duration.M} ease-in-out;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const TableOptionsCell = <T extends {}>({
  data,
  rowOptions,
}: {
  data: T;
  rowOptions?: TableProps<T>['rowOptions'];
}) => {
  const [open, setOpen] = useState(false);
  const optionsMenuRef = useRef<HTMLUListElement>(null);

  useOutsideClick(optionsMenuRef, () => setOpen(false));

  return (
    <StyledOptionsCell>
      <StyledOptionsBtn
        onClick={e => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className={open ? 'open' : ''}
      >
        <Icon icon='more-horizontal' hoverEffect size='large' />
      </StyledOptionsBtn>
      {open && (
        <StyledOptionsMenu ref={optionsMenuRef}>
          {rowOptions?.map((option, idx) => (
            <StyledOptionsMenuItem
              key={idx}
              onClick={e => {
                e.stopPropagation();
                option.onClick(data);
                setOpen(false);
              }}
            >
              {!!option.icon && <Icon icon={option.icon} size='small' />}
              <Text color='inherit' fontWeight='bold'>
                {option.label}
              </Text>
            </StyledOptionsMenuItem>
          ))}
        </StyledOptionsMenu>
      )}
    </StyledOptionsCell>
  );
};

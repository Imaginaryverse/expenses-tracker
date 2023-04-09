import { scrollbarStyle } from '@src/style/css';
import styled from 'styled-components';

export const DropdownOptionsList = styled.ul`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 1;
  width: 100%;
  max-height: calc(2.75rem * 6);
  overflow-y: auto;

  background-color: ${({ theme }) => theme.colors.body.background};
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.borderRadius.M};

  ${scrollbarStyle}

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

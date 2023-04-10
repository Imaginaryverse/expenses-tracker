import { css } from 'styled-components';

export const scrollbarStyle = css`
  &::-webkit-scrollbar {
    height: 0.5rem;
    width: 0.5rem;

    background: ${({ theme }) => theme.colors.primary.alt};

    border-radius: ${({ theme }) => theme.borderRadius.M};
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.primary.alt};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary.main};
    border-radius: ${({ theme }) => theme.borderRadius.M};

    box-shadow: inset 0 0 0 0.25rem rgba(0, 0, 0, 0.125);
  }
`;

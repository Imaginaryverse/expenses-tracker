import { css } from 'styled-components';

/**
 * A CSS style to visually indicate that a component is focused.
 * @example
 * const StyledButton = styled.button`
 * &:focus {
 *   ${focusStyle}
 * }
 */
export const focusStyle = css`
  // only show focus style when the element is focused via keyboard
  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary.main};
    border-radius: ${({ theme }) => theme.borderRadius.M};

    transition: none;
  }
`;

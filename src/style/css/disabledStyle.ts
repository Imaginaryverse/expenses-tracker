import { css } from 'styled-components';

/**
 * A CSS style to visually indicate that a component is disabled.
 * @example
 * const StyledButton = styled.button`
 * &:disabled {
 *  ${disabledStyle}
 * }
 */
export const disabledStyle = css`
  opacity: 0.5; // Makes the disabled element more transparent.
  filter: grayscale(
    100%
  ); // Converts the colors of the disabled element to grayscale.
  cursor: default; // Changes the cursor to a disabled cursor.
  pointer-events: none; // Prevents the user from clicking on the disabled element.
`;

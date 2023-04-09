import styled from 'styled-components';

export const InputPwdBtn = styled.button`
  position: absolute;
  right: 0.75rem;
  padding: 0;
  margin: 0;

  color: ${({ theme }) => theme.colors.body.text};
  background: none;
  border: none;
  cursor: pointer;

  opacity: 0.75;

  transition: all ${({ theme }) => theme.transition.duration.M} ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

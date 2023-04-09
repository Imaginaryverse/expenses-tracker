import styled from 'styled-components';

export const InputErrorMsg = styled.label`
  color: red;
  overflow: hidden;
  margin-top: 0.25rem;
  margin-left: 0.25rem;

  animation: grow 0.2s ease-in-out;

  @keyframes grow {
    from {
      min-height: 0;
      height: 0;
      opacity: 0;
    }
    to {
      min-height: 1rem;
      height: 1rem;
      opacity: 1;
    }
  }
`;

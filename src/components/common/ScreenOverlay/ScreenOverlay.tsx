import { FunctionComponent } from 'react';
import styled from 'styled-components';

type ScreenOverlayProps = {
  children: React.ReactNode | React.ReactNode[];
};

const StyledScreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.45);

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

export const ScreenOverlay: FunctionComponent<ScreenOverlayProps> = ({
  children,
}) => {
  return <StyledScreenOverlay>{children}</StyledScreenOverlay>;
};

import { useRef } from 'react';
import styled from 'styled-components';
import { useOutsideClick } from '@src/components/hooks';
import { ScreenOverlay } from '../ScreenOverlay/ScreenOverlay';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';

type SlideInModalProps = {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
  from?: 'left' | 'right';
  closeOnOverlayClick?: boolean;
};

const StyledSlideInModal = styled.div`
  position: fixed;
  top: 0;

  &.from-left {
    left: 0;
  }

  &.from-right {
    right: 0;
  }

  z-index: 1;

  width: 50%;
  max-width: 768px;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.body.background};
  border-left: 1px solid ${({ theme }) => theme.colors.body.border};
  box-shadow: -0.5rem 0 200px rgba(0, 0, 0, 0.125);

  animation: slideIn 0.2s ease-in-out;

  &.from-left {
    animation-name: slideInLeft;
  }

  &.from-right {
    animation-name: slideInRight;
  }

  @keyframes slideInLeft {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    border: none;
    box-shadow: none;
  }
`;

const StyledSlideInModalHeader = styled.header`
  width: 100%;
  padding: ${({ theme }) => theme.spacing['2']} 5%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.primary.alt};
`;

const StyledChildrenContainer = styled.div`
  width: 100%;
  height: calc(100% - 3.5rem);
  overflow-y: auto;
`;

export const SlideInModal = ({
  children,
  title,
  onClose,
  from = 'right',
  closeOnOverlayClick = false,
}: SlideInModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (closeOnOverlayClick) {
    useOutsideClick(modalRef, onClose);
  }

  return (
    <ScreenOverlay>
      <StyledSlideInModal ref={modalRef} className={`from-${from}`}>
        <StyledSlideInModalHeader>
          <Text variant='h2'>{title}</Text>
          <Button title='Close' onClick={onClose} size='small'>
            <Icon icon='x' />
          </Button>
        </StyledSlideInModalHeader>
        <StyledChildrenContainer>{children}</StyledChildrenContainer>
      </StyledSlideInModal>
    </ScreenOverlay>
  );
};

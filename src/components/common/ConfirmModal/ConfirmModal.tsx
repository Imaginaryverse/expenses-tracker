import { FunctionComponent, useState, useRef, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@src/components/common/Button/Button';
import { ScreenOverlay } from '../ScreenOverlay/ScreenOverlay';
import { Text } from '../Text/Text';
import { Input } from '../Input/Input';
import { useOutsideClick } from '@src/components/hooks';

type ConfirmModalProps = {
  /**
   * The title of the modal.
   */
  title: string;
  /**
   * The content of the modal.
   * @default undefined
   * @type React.ReactNode | React.ReactNode[]
   * @example
   * <p>Are you sure you want to delete this item?</p>
   * <p>This action cannot be undone.</p>
   */
  description?: React.ReactNode[];
  /**
   * The function to call when the user clicks the confirm button.
   * @default undefined
   * @type () => void
   * @example
   * () => {
   *  deleteItem();
   *  closeModal();
   * }
   */
  onConfirm?: () => void;
  /**
   * The function to call when the user clicks the cancel button.
   * @default undefined
   * @type () => void
   * @example
   * () => {
   *  closeModal();
   * }
   */
  onCancel?: () => void;
  /**
   * The text of the confirm button.
   * @default 'Confirm'
   * @type string
   */
  confirmText?: string;
  /**
   * The text of the cancel button.
   * @default 'Cancel'
   * @type string
   */
  cancelText?: string;
  /**
   * Controls whether the confirm button is disabled.
   * If provided, the confirm button will be disabled until the user has entered the required input.
   * @default undefined
   */
  requiredInput?: string;
  /**
   * The placeholder text for the input field.
   * @default undefined
   * @type string
   */
  inputPlaceholder?: string;
};

const StyledModal = styled.div`
  position: absolute;
  top: 1rem;
  width: 95%;
  max-width: 40rem;

  background-color: ${({ theme }) => theme.colors.body.background};
  border: 1px solid ${({ theme }) => theme.colors.body.border};
  border-radius: ${({ theme }) => theme.borderRadius.L};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  animation: dropIn 0.2s ease-in-out;

  @keyframes dropIn {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const StyledModalInnerWrapper = styled.div`
  padding: ${({ theme }) => `${theme.spacing['1']} ${theme.spacing['2']}`};

  background-color: ${({ theme }) => theme.colors.primary.alt};
`;

const StyledModalHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['1']};
`;

const StyledModalDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['1']};
  margin-bottom: ${({ theme }) => theme.spacing['1']};
`;

const StyledModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['1']};
`;

const StyledModalBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing['1']};
`;

export const ConfirmModal: FunctionComponent<ConfirmModalProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  requiredInput,
  inputPlaceholder,
}) => {
  const modalRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const disableConfirmButton = useMemo(() => {
    if (!!requiredInput) {
      return inputValue !== requiredInput;
    }
    return false;
  }, [requiredInput, inputValue]);

  function handleConfirm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (disableConfirmButton) return;

    onConfirm?.();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      onCancel?.();
    }

    if (!requiredInput) {
      if (e.key === 'Enter' && !disableConfirmButton) {
        e.preventDefault();
        onConfirm?.();
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useOutsideClick(modalRef, () => onCancel?.());

  return (
    <ScreenOverlay>
      <StyledModal ref={modalRef}>
        <StyledModalInnerWrapper>
          <StyledModalHeader>
            <Text variant='h3'>{title}</Text>
          </StyledModalHeader>
          <StyledModalDescription>
            {description?.map((item, index) => (
              <Text key={index}>{item}</Text>
            ))}
          </StyledModalDescription>

          <StyledModalForm onSubmit={handleConfirm}>
            {!!requiredInput && (
              <Input
                value={inputValue}
                placeholder={inputPlaceholder}
                onChange={setInputValue}
                autoFocus
                customStyle={{
                  maxWidth: '100%',
                }}
                indicateError={!!inputValue.length && disableConfirmButton}
                errorMessage='* Value does not match the required input.'
              />
            )}
            <StyledModalBtnContainer>
              <Button onClick={onCancel}>{cancelText}</Button>
              <Button type='submit' disabled={disableConfirmButton}>
                {confirmText}
              </Button>
            </StyledModalBtnContainer>
          </StyledModalForm>
        </StyledModalInnerWrapper>
      </StyledModal>
    </ScreenOverlay>
  );
};

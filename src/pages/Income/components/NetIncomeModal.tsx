import { FunctionComponent, useMemo, useState } from 'react';
import { Button, Input } from '@src/components/common';
import { SlideInModal } from '@src/components/common/SlideInModal/SlideInModal';
import { useExpenses } from '@src/context/ExpensesProvider';
import styled from 'styled-components';

const StyledNetIncomeForm = styled.form`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing['1']} 5%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['2']};

  background-color: ${({ theme }) => theme.colors.primary.alt};
`;

type NetIncomeModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const NetIncomeModal: FunctionComponent<NetIncomeModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { monthlyIncome, updateMonthlyIncome } = useExpenses();

  const [value, setValue] = useState(monthlyIncome || '');

  const disableSubmit = useMemo(
    () => !value || value === monthlyIncome,
    [value, monthlyIncome]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (disableSubmit) {
      return;
    }

    updateMonthlyIncome(Number(value));
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <SlideInModal
      title='Update Net Income'
      onClose={() => setIsOpen(false)}
      closeOnOverlayClick
    >
      <StyledNetIncomeForm onSubmit={handleSubmit}>
        <Input
          label='Net Income'
          placeholder='Enter net income'
          value={String(value)}
          onChange={setValue}
          inputMode='numeric'
          filter='number'
          customStyle={{
            maxWidth: '100%',
          }}
        />

        <Button type='submit' disabled={disableSubmit}>
          Update
        </Button>
      </StyledNetIncomeForm>
    </SlideInModal>
  );
};

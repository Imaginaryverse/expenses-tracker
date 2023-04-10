import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Button, Dropdown, Input } from '@src/components/common';
import { SlideInModal } from '@src/components/common/SlideInModal/SlideInModal';
import { useExpenses } from '@src/context/ExpensesProvider';
import styled from 'styled-components';
import { CURRENCIES, Currency } from '@src/types';

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
  const { currency, updateCurrency, monthlyIncome, updateMonthlyIncome } =
    useExpenses();

  const [value, setValue] = useState('');
  const [selectedCurrencyIdx, setSelectedCurrencyIdx] = useState(-1);

  const disableSubmit = useMemo(
    () =>
      Number(value) === monthlyIncome &&
      CURRENCIES[selectedCurrencyIdx] === currency,
    [selectedCurrencyIdx, currency, value, monthlyIncome]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (disableSubmit) {
      return;
    }

    updateMonthlyIncome(Number(value));
    updateCurrency(CURRENCIES[selectedCurrencyIdx]);
    setIsOpen(false);
  };

  useEffect(() => {
    setValue(String(monthlyIncome));
    setSelectedCurrencyIdx(CURRENCIES.indexOf(currency));
  }, [currency, monthlyIncome]);

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
          autoFocus
          inputMode='numeric'
          filter='number'
          customStyle={{
            maxWidth: '100%',
          }}
        />

        <Dropdown
          label='Currency'
          selectedOptionIdx={selectedCurrencyIdx}
          options={Object.keys(Currency)}
          onChange={setSelectedCurrencyIdx}
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

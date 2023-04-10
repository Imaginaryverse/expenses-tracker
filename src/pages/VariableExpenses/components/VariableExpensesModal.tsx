import { FunctionComponent, useMemo, useState, useEffect } from 'react';
import {
  VARIABLE_EXPENSE_CATEGORIES,
  VariableExpenseCategory,
  VariableExpenseItem,
} from '@src/types';
import { useExpenses } from '@src/context/ExpensesProvider';
import { SlideInModal } from '@src/components/common/SlideInModal/SlideInModal';
import { Button, DatePicker, Dropdown, Input } from '@src/components/common';
import styled from 'styled-components';
import { createUUID } from '@src/utils';

function findCategory(idx: number): VariableExpenseCategory {
  if (idx < 0) {
    return VariableExpenseCategory.Other;
  }

  return VARIABLE_EXPENSE_CATEGORIES[idx];
}

type VariableExpensesModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  item?: VariableExpenseItem;
};

const StyledVariableExpensesForm = styled.form`
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

export const VariableExpensesModal: FunctionComponent<
  VariableExpensesModalProps
> = ({ isOpen, setIsOpen, item }) => {
  const { addVariableExpense, updateVariableExpense } = useExpenses();

  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryIdx, setCategoryIdx] = useState(-1);

  const disableSubmit = useMemo(() => {
    if (item) {
      const isSameDate =
        item.date.getDate() === date.getDate() &&
        item.date.getMonth() === date.getMonth() &&
        item.date.getFullYear() === date.getFullYear();
      const isUnchanged =
        isSameDate &&
        item.name === name &&
        item.amount === Number(amount) &&
        item.category === findCategory(categoryIdx);

      return (
        isUnchanged || !name || Number.isNaN(amount) || Number(amount) <= 0
      );
    }

    return !name || Number.isNaN(amount) || Number(amount) <= 0;
  }, [date, name, amount, categoryIdx, item]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (disableSubmit) {
      return;
    }

    if (item) {
      updateVariableExpense({
        ...item,
        date,
        name,
        amount: Number(amount),
        category: findCategory(categoryIdx),
      });
    } else {
      addVariableExpense({
        id: createUUID(),
        date,
        name,
        amount: Number(amount),
        category: findCategory(categoryIdx),
      });
    }

    setName('');
    setAmount('');
    setCategoryIdx(-1);
    setIsOpen(false);
  }

  useEffect(() => {
    if (item) {
      setDate(item.date);
      setName(item.name);
      setAmount(String(item.amount));
      setCategoryIdx(VARIABLE_EXPENSE_CATEGORIES.indexOf(item.category));
    }
  }, [item]);

  if (!isOpen) {
    return null;
  }

  return (
    <SlideInModal
      title={`${item ? `Edit "${item.name}"` : 'Add Variable Expense'}`}
      onClose={() => setIsOpen(false)}
      closeOnOverlayClick
    >
      <StyledVariableExpensesForm onSubmit={handleSubmit}>
        <DatePicker
          label='Date'
          date={date}
          onChange={setDate}
          customStyle={{
            maxWidth: '100%',
          }}
        />

        <Input
          label='Name'
          autoFocus
          placeholder='Enter name'
          value={name}
          onChange={setName}
          customStyle={{
            maxWidth: '100%',
          }}
        />
        <Input
          label='Amount'
          placeholder='Enter amount'
          value={String(amount)}
          onChange={setAmount}
          inputMode='numeric'
          filter='number'
          customStyle={{
            maxWidth: '100%',
          }}
        />

        <Dropdown
          label='Category'
          placeholder='Select category'
          selectedOptionIdx={categoryIdx}
          options={VARIABLE_EXPENSE_CATEGORIES}
          onChange={setCategoryIdx}
          customStyle={{
            maxWidth: '100%',
          }}
        />

        <Button type='submit' disabled={disableSubmit}>
          {item ? 'Save' : 'Submit'}
        </Button>
      </StyledVariableExpensesForm>
    </SlideInModal>
  );
};

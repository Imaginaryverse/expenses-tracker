import { Button, Icon, Table, Text } from '@src/components/common';
import { useExpenses } from '@src/context/ExpensesProvider';
import { VariableExpenseItem } from '@src/types';
import { formatDate, formatNumber, getNameOfMonth } from '@src/utils';
import React, { FunctionComponent, useState, useMemo } from 'react';
import styled from 'styled-components';
import { VariableExpensesModal } from '../VariableExpenses/components/VariableExpensesModal';
import { NetIncomeModal } from '../Income/components/NetIncomeModal';

const StyledHeader = styled.header`
  width: 100%;
  padding: ${({ theme }) => theme.spacing['1']} 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.body.background};
`;

const StyledNetIncomeMessage = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing['2']} 2.5%;
  margin-bottom: ${({ theme }) => theme.spacing['1']};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['1']};

  background-color: ${({ theme }) => theme.colors.primary.alt};
  border-radius: ${({ theme }) => theme.borderRadius.M};
`;

const StyledIncomeDetails = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing['1']};
`;

function getExpensesThisMonth(variableExpenses: VariableExpenseItem[]) {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  return variableExpenses
    .filter(expense => expense.date >= firstDayOfMonth && expense.date <= today)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export const HomePage: FunctionComponent = () => {
  const { monthlyIncome, variableExpenses } = useExpenses();
  const [openVariableExpensesModal, setOpenVariableExpensesModal] =
    useState(false);
  const [openNetIncomeModal, setOpenNetIncomeModal] = useState(false);

  const expensesThisMonth = useMemo(
    () => getExpensesThisMonth(variableExpenses),
    [variableExpenses]
  );

  const currentMonth = getNameOfMonth(new Date());

  return (
    <React.Fragment>
      <StyledHeader>
        <Text variant='h1'>Net Income: {formatNumber(monthlyIncome)} kr</Text>
        <Button
          onClick={() => {
            if (openVariableExpensesModal) {
              setOpenVariableExpensesModal(false);
            }

            setOpenNetIncomeModal(true);
          }}
        >
          <Icon icon='edit' marginRight='0.25rem' />
          Update
        </Button>
      </StyledHeader>

      {!!monthlyIncome && (
        <StyledIncomeDetails>
          <Text>
            Over the course of a year, you will have earned a total of{' '}
            <b>{formatNumber(monthlyIncome * 12)}</b> kr in net income.
          </Text>

          <Text>
            This is equivalent to <b>{formatNumber(monthlyIncome / 4, 2)}</b> kr
            per week,
            <b>{formatNumber(monthlyIncome / 30, 2)}</b> kr per day, and{' '}
            <b>{formatNumber(monthlyIncome / 30 / 24, 2)}</b> kr per hour.
          </Text>

          <Text>
            You earn 1 million kr every{' '}
            <b>{formatNumber(1000000 / monthlyIncome / 12, 2)}</b> years.
          </Text>
        </StyledIncomeDetails>
      )}

      {!monthlyIncome && (
        <StyledNetIncomeMessage>
          <Text>
            Certain features will not be available until you have set your
            monthly net income.
          </Text>

          <Text>Click the "Update" button below to set it.</Text>

          <Button
            onClick={() => {
              if (openVariableExpensesModal) {
                setOpenVariableExpensesModal(false);
              }

              setOpenNetIncomeModal(true);
            }}
          >
            <Icon icon='edit' marginRight='0.25rem' />
            Update
          </Button>
        </StyledNetIncomeMessage>
      )}

      <NetIncomeModal
        isOpen={openNetIncomeModal}
        setIsOpen={setOpenNetIncomeModal}
      />

      <StyledHeader>
        <Text variant='h1'>Variable Expenses: {currentMonth}</Text>
        <Button
          onClick={() => {
            if (openNetIncomeModal) {
              setOpenNetIncomeModal(false);
            }

            setOpenVariableExpensesModal(true);
          }}
        >
          + Add
        </Button>
      </StyledHeader>

      <Text>
        Your variable expenses for {currentMonth}. Add new expenses by clicking
        the "Add" button above.
      </Text>

      <VariableExpensesModal
        isOpen={openVariableExpensesModal}
        setIsOpen={setOpenVariableExpensesModal}
      />

      {!!expensesThisMonth.length && (
        <Table
          showIndices
          data={expensesThisMonth}
          columns={[
            {
              label: 'Date',
              component: item => (
                <Text truncate fontWeight='bold'>
                  {formatDate(item.date, { short: true })}
                </Text>
              ),
            },
            {
              label: 'Name',
              component: item => (
                <Text truncate fontWeight='bold'>
                  {item.name}
                </Text>
              ),
            },
            {
              label: 'Amount',
              component: item => (
                <Text truncate fontWeight='bold'>
                  {item.amount} kr
                </Text>
              ),
            },
            {
              label: 'Category',
              component: item => (
                <Text truncate fontWeight='bold'>
                  {item.category}
                </Text>
              ),
            },
          ]}
        />
      )}
    </React.Fragment>
  );
};

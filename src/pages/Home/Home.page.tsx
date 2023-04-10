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

const StyledSection = styled.section`
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
  const { currency, monthlyIncome, variableExpenses, fixedExpenses } =
    useExpenses();
  const [openVariableExpensesModal, setOpenVariableExpensesModal] =
    useState(false);
  const [openNetIncomeModal, setOpenNetIncomeModal] = useState(false);

  const variableExpensesThisMonth = useMemo(
    () => getExpensesThisMonth(variableExpenses),
    [variableExpenses]
  );

  const sumVariableExpensesThisMonth = useMemo(
    () => variableExpensesThisMonth.reduce((acc, curr) => acc + curr.amount, 0),
    [variableExpensesThisMonth]
  );

  const sumFixedExpenses = useMemo(
    () => fixedExpenses.reduce((acc, curr) => acc + curr.amount, 0),
    [fixedExpenses]
  );

  const currentMonth = getNameOfMonth(new Date());

  return (
    <React.Fragment>
      <StyledHeader>
        <Text variant='h2'>
          Net Income: {formatNumber(monthlyIncome, { currency })}
        </Text>
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
        <StyledSection>
          <Text>
            Over the course of a year, you will have earned a total of{' '}
            <b>{formatNumber(monthlyIncome * 12, { decimals: 2, currency })}</b>{' '}
            in net income.
          </Text>

          <Text>
            This is equivalent to{' '}
            <b>{formatNumber(monthlyIncome / 4, { decimals: 2, currency })}</b>{' '}
            per week,{' '}
            <b>{formatNumber(monthlyIncome / 30, { decimals: 2, currency })}</b>{' '}
            per day, and{' '}
            <b>
              {formatNumber(monthlyIncome / 30 / 24, { decimals: 2, currency })}
            </b>{' '}
            per hour.
          </Text>

          <Text>
            You earn {formatNumber(1000000, { currency })} (one million) every{' '}
            <b>{formatNumber(1000000 / monthlyIncome / 12, { decimals: 2 })}</b>{' '}
            years.
          </Text>
        </StyledSection>
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
        <Text variant='h2'>
          Fixed Expenses:{' '}
          {formatNumber(sumFixedExpenses, { decimals: 2, currency })}
        </Text>
        <Button disabled>
          <Icon icon='edit' marginRight='0.25rem' />
          Edit
        </Button>
      </StyledHeader>

      <StyledSection>
        <Text>
          The sum of your fixed expenses accounts for{' '}
          <b>
            {formatNumber((sumFixedExpenses / monthlyIncome) * 100, {
              decimals: 2,
            })}
            %
          </b>{' '}
          of your monthly net income.
        </Text>

        <Text>
          The remaining budget for variable expenses per month is{' '}
          <b>
            {formatNumber(monthlyIncome - sumFixedExpenses, {
              decimals: 2,
              currency,
            })}
          </b>
          .
        </Text>
      </StyledSection>

      <StyledHeader>
        <Text variant='h2'>Variable Expenses: {currentMonth}</Text>
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

      <StyledSection>
        <Text>
          You have spent a total of{' '}
          <b>
            {formatNumber(sumVariableExpensesThisMonth, {
              decimals: 2,
              currency,
            })}
          </b>{' '}
          (
          {formatNumber(
            (sumVariableExpensesThisMonth /
              (monthlyIncome - sumFixedExpenses)) *
              100,
            { decimals: 2 }
          )}
          %) of your budget this month.
        </Text>

        <Text>
          Remaining:{' '}
          <b>
            {formatNumber(
              monthlyIncome - sumFixedExpenses - sumVariableExpensesThisMonth,
              { decimals: 2, currency }
            )}
          </b>
          .
        </Text>
      </StyledSection>

      <VariableExpensesModal
        isOpen={openVariableExpensesModal}
        setIsOpen={setOpenVariableExpensesModal}
      />

      {!!variableExpensesThisMonth.length && (
        <Table
          showIndices
          data={variableExpensesThisMonth}
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
                  {formatNumber(item.amount, { decimals: 2, currency })}
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

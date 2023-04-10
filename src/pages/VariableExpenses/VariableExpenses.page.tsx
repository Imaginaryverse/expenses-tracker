import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { Button, Table, Text } from '@src/components/common';
import { VariableExpenseItem } from '@src/types';
import { useExpenses } from '@src/context/ExpensesProvider';
import { formatDate, formatNumber } from '@src/utils';
import { SortOrder } from '@src/components/common/Table/Table.types';
import { ConfirmModal } from '@src/components/common/ConfirmModal/ConfirmModal';
import { VariableExpensesModal } from './components/VariableExpensesModal';

const StyledExpensesHeader = styled.header`
  width: 100%;
  padding: ${({ theme }) => theme.spacing['1']} 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.body.background};
`;

export const VariableExpensesPage: FunctionComponent = () => {
  const { variableExpenses, removeVariableExpense } = useExpenses();
  const [openVariableExpenseModal, setOpenVariableExpenseModal] =
    useState(false);
  const [confirmRemoveVariableExpense, setConfirmRemoveVariableExpense] =
    useState(false);
  const [variableExpenseItem, setVariableExpenseItem] =
    useState<VariableExpenseItem>();

  function sortVariableExpenses(
    items: VariableExpenseItem[],
    label: string,
    sortOrder: SortOrder
  ) {
    return [...items].sort((a, b) => {
      switch (label.toLowerCase()) {
        case 'date':
          return sortOrder === 'ascending'
            ? a.date.getTime() - b.date.getTime()
            : b.date.getTime() - a.date.getTime();
        case 'name':
          return sortOrder === 'ascending'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case 'amount':
          return sortOrder === 'ascending'
            ? a.amount - b.amount
            : b.amount - a.amount;
        case 'category':
          return sortOrder === 'ascending'
            ? a.category.localeCompare(b.category)
            : b.category.localeCompare(a.category);
        default:
          return 0;
      }
    });
  }

  return (
    <React.Fragment>
      <VariableExpensesModal
        item={variableExpenseItem}
        isOpen={openVariableExpenseModal}
        setIsOpen={setOpenVariableExpenseModal}
      />

      {confirmRemoveVariableExpense && !!variableExpenseItem && (
        <ConfirmModal
          title={`Remove "${variableExpenseItem.name}"?`}
          description={[
            `Are you sure you want to remove this item? This action cannot be undone.`,
          ]}
          confirmText='Remove'
          onCancel={() => {
            setVariableExpenseItem(undefined);
            setConfirmRemoveVariableExpense(false);
          }}
          onConfirm={() => {
            removeVariableExpense(variableExpenseItem.id);
            setVariableExpenseItem(undefined);
            setConfirmRemoveVariableExpense(false);
          }}
        />
      )}

      <StyledExpensesHeader>
        <Text variant='h1'>Variable Expenses</Text>
        <Button onClick={() => setOpenVariableExpenseModal(true)}>+ Add</Button>
      </StyledExpensesHeader>

      {!variableExpenses.length && (
        <Text variant='h3' alignSelf='center'>
          No variable expenses yet
        </Text>
      )}

      <Text>
        Variables expenses are expenses that can vary from month to month.
        Examples include groceries, gas, and entertainment, as well as any other
        expenses that are not fixed.
      </Text>

      <Table
        itemsPerPage={variableExpenses.length}
        showIndices
        data={variableExpenses}
        sortFn={sortVariableExpenses}
        defaultSort={{
          label: 'Date',
          sortOrder: 'descending',
        }}
        columns={[
          {
            label: 'Date',
            component: item => (
              <Text fontWeight='bold' truncate>
                {formatDate(new Date(item.date), { short: true })}
              </Text>
            ),
            sortable: true,
          },
          {
            label: 'Name',
            component: item => (
              <Text fontWeight='bold' truncate>
                {item.name}
              </Text>
            ),
            sortable: true,
          },
          {
            label: 'Amount',
            component: item => (
              <Text fontWeight='bold' truncate>
                {formatNumber(item.amount)} kr
              </Text>
            ),
            sortable: true,
          },
          {
            label: 'Category',
            component: item => (
              <Text fontWeight='bold' truncate>
                {item.category}
              </Text>
            ),
            sortable: true,
          },
        ]}
        rowOptions={[
          {
            label: 'Edit',
            icon: 'edit',
            onClick: item => {
              setVariableExpenseItem(item);
              setOpenVariableExpenseModal(true);
            },
          },
          {
            label: 'Remove',
            icon: 'trash',
            onClick: item => {
              setVariableExpenseItem(item);
              setConfirmRemoveVariableExpense(true);
            },
          },
        ]}
      />
    </React.Fragment>
  );
};

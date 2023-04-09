import React, { FunctionComponent, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button, Dropdown, Input, Table, Text } from '@src/components/common';
import { FixedExpenseCategory, FixedExpenseItem } from '@src/types';
import { useExpenses } from '@src/context/ExpensesProvider';
import { createUUID, formatNumber } from '@src/utils';
import { SortOrder } from '@src/components/common/Table/Table.types';
import { ObjectTable } from '@src/components/common/Table/ObjectTable';
import { SlideInModal } from '@src/components/common/SlideInModal/SlideInModal';
import { ConfirmModal } from '@src/components/common/ConfirmModal/ConfirmModal';

const CATEGORIES = Object.keys(FixedExpenseCategory) as FixedExpenseCategory[];

function findCategory(idx: number) {
  if (idx < 0) {
    FixedExpenseCategory.Other;
  }

  return CATEGORIES[idx];
}

const StyledExpensesHeader = styled.header`
  width: 100%;
  padding: ${({ theme }) => theme.spacing['1']} 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.body.background};
`;

const StyledExpenseForm = styled.form`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing['1']} 5%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing['2']};

  background-color: ${({ theme }) => theme.colors.primary.alt};
`;

const StyledInformationContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing['1']} 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing['2']};

  background-color: rgba(0, 0, 0, 0.15);
  border-radius: ${({ theme }) => theme.borderRadius.M};
`;

type FixedExpenseModalProps = {
  item?: FixedExpenseItem;
  onClose: () => void;
  onAdd: (item: FixedExpenseItem) => void;
  onEdit: (item: FixedExpenseItem) => void;
};

const FixedExpenseModal: FunctionComponent<FixedExpenseModalProps> = ({
  item,
  onClose,
  onAdd,
  onEdit,
}) => {
  const [name, setName] = useState(item?.name || '');
  const [amount, setAmount] = useState(item?.amount || '');
  const [categoryIdx, setCategoryIdx] = useState(
    item ? CATEGORIES.indexOf(item.category) : -1
  );

  const disableSubmit = useMemo(() => {
    if (item) {
      const isUnchanged =
        item.name === name &&
        item.amount === Number(amount) &&
        item.category === findCategory(categoryIdx);

      return (
        isUnchanged || !name || Number.isNaN(amount) || Number(amount) <= 0
      );
    }

    return !name || Number.isNaN(amount) || Number(amount) <= 0;
  }, [name, amount, categoryIdx, item]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (disableSubmit) {
      return;
    }

    if (item) {
      const updatedItem: FixedExpenseItem = {
        ...item,
        name,
        amount: Number(amount),
        category: findCategory(categoryIdx),
      };

      onEdit(updatedItem);
    } else {
      const newFixedExpense: FixedExpenseItem = {
        id: createUUID(),
        name,
        amount: Number(amount),
        category: findCategory(categoryIdx),
      };

      onAdd(newFixedExpense);
    }

    setName('');
    setAmount('');
    setCategoryIdx(-1);
    onClose();
  }

  return (
    <SlideInModal
      title={`${item ? `Edit "${item.name}"` : 'Add Fixed Expense'}`}
      onClose={onClose}
      closeOnOverlayClick
    >
      <StyledExpenseForm onSubmit={handleSubmit}>
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
          options={CATEGORIES}
          onChange={setCategoryIdx}
          customStyle={{
            maxWidth: '100%',
          }}
        />

        <Button type='submit' disabled={disableSubmit}>
          {item ? 'Save' : 'Submit'}
        </Button>

        {!item && (
          <StyledInformationContainer>
            <Text variant='label'>
              Fixed expenses are expenses that are the same every month, such as
              rent, utilities, and subscriptions. They are not affected by your
              spending habits.
            </Text>
          </StyledInformationContainer>
        )}
      </StyledExpenseForm>
    </SlideInModal>
  );
};

export const FixedExpensesPage: FunctionComponent = () => {
  const {
    fixedExpenses,
    addFixedExpense,
    updateFixedExpense,
    removeFixedExpense,
  } = useExpenses();
  const [openFixedExpenseModal, setOpenFixedExpenseModal] = useState(false);
  const [confirmRemoveFixedExpense, setConfirmRemoveFixedExpense] =
    useState(false);
  const [fixedExpenseItem, setFixedExpenseItem] = useState<FixedExpenseItem>();

  function sortFixedExpenses(
    items: FixedExpenseItem[],
    label: string,
    sortOrder: SortOrder
  ) {
    return [...items].sort((a, b) => {
      switch (label.toLowerCase()) {
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

  const sumFixedExpenses = useMemo(
    () => fixedExpenses.reduce((acc, item) => acc + item.amount, 0),
    [fixedExpenses]
  );

  return (
    <React.Fragment>
      {openFixedExpenseModal && (
        <FixedExpenseModal
          item={fixedExpenseItem}
          onClose={() => {
            setFixedExpenseItem(undefined);
            setOpenFixedExpenseModal(false);
          }}
          onAdd={addFixedExpense}
          onEdit={updateFixedExpense}
        />
      )}

      {confirmRemoveFixedExpense && !!fixedExpenseItem && (
        <ConfirmModal
          title={`Remove "${fixedExpenseItem.name}"?`}
          description={[
            `Are you sure you want to remove this item? This action cannot be undone.`,
            `Type "${fixedExpenseItem.name}" in the field below to confirm.`,
          ]}
          requiredInput={fixedExpenseItem.name}
          inputPlaceholder={fixedExpenseItem.name}
          onCancel={() => {
            setFixedExpenseItem(undefined);
            setConfirmRemoveFixedExpense(false);
          }}
          onConfirm={() => {
            removeFixedExpense(fixedExpenseItem.id);
            setFixedExpenseItem(undefined);
            setConfirmRemoveFixedExpense(false);
          }}
        />
      )}

      <StyledExpensesHeader>
        <Text variant='h1'>Fixed Expenses ({fixedExpenses.length})</Text>
        <Button onClick={() => setOpenFixedExpenseModal(true)}>+ Add</Button>
      </StyledExpensesHeader>

      {!fixedExpenses.length && (
        <Text variant='h3' alignSelf='center'>
          No fixed expenses yet
        </Text>
      )}

      <Table
        itemsPerPage={fixedExpenses.length}
        showIndices
        expandOnRowPress
        data={fixedExpenses}
        sortFn={sortFixedExpenses}
        defaultSort={{
          label: 'Amount',
          sortOrder: 'descending',
        }}
        columns={[
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
                {item.amount} kr
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
        expandContent={item => (
          <ObjectTable
            data={item}
            entries={[
              {
                label: 'Per Year',
                component: item => (
                  <Text fontWeight='bold'>
                    {formatNumber(item.amount * 12, 2)} kr
                  </Text>
                ),
              },
              {
                label: 'Per Month',
                component: item => (
                  <Text fontWeight='bold'>
                    {formatNumber(item.amount, 2)} kr
                  </Text>
                ),
              },
              {
                label: 'Per Week',
                component: item => (
                  <Text fontWeight='bold'>
                    {formatNumber(item.amount / 4, 2)} kr
                  </Text>
                ),
              },
              {
                label: 'Per Day',
                component: item => (
                  <Text fontWeight='bold'>
                    {formatNumber(item.amount / 30, 2)} kr
                  </Text>
                ),
              },
              {
                label: 'Per Hour',
                component: item => (
                  <Text fontWeight='bold'>
                    {formatNumber(item.amount / 720, 2)} kr
                  </Text>
                ),
              },
              {
                label: 'Per Minute',
                component: item => (
                  <Text fontWeight='bold'>
                    {formatNumber(item.amount / 43200, 2)} kr
                  </Text>
                ),
              },
            ]}
          />
        )}
        rowOptions={[
          {
            label: 'Edit',
            icon: 'edit',
            onClick: item => {
              setFixedExpenseItem(item);
              setOpenFixedExpenseModal(true);
            },
          },
          {
            label: 'Remove',
            icon: 'trash',
            onClick: item => {
              setFixedExpenseItem(item);
              setConfirmRemoveFixedExpense(true);
            },
          },
        ]}
        footer={{
          label: 'Total',
          component: () => (
            <Text fontWeight='bold' color='primary'>
              {formatNumber(sumFixedExpenses, 3)} kr
            </Text>
          ),
        }}
      />
    </React.Fragment>
  );
};

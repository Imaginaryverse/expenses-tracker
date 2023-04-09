import React, { FunctionComponent, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  Table,
  Text,
} from '@src/components/common';
import {
  FixedExpenseCategory,
  FixedExpenseItem,
  VariableExpenseCategory,
  VariableExpenseItem,
} from '@src/types';
import { useExpenses } from '@src/context/ExpensesProvider';
import { createUUID, formatDate, formatNumber } from '@src/utils';
import { SortOrder } from '@src/components/common/Table/Table.types';
import { ObjectTable } from '@src/components/common/Table/ObjectTable';
import { SlideInModal } from '@src/components/common/SlideInModal/SlideInModal';
import { ConfirmModal } from '@src/components/common/ConfirmModal/ConfirmModal';

const CATEGORIES = Object.keys(
  VariableExpenseCategory
) as VariableExpenseCategory[];

function findCategory(idx: number) {
  if (idx < 0) {
    VariableExpenseCategory.Other;
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

type VariableExpenseModalProps = {
  item?: VariableExpenseItem;
  onClose: () => void;
  onAdd: (item: VariableExpenseItem) => void;
  onEdit: (item: VariableExpenseItem) => void;
};

const VariableExpenseModal: FunctionComponent<VariableExpenseModalProps> = ({
  item,
  onClose,
  onAdd,
  onEdit,
}) => {
  const [date, setDate] = useState(item?.date || new Date());
  const [name, setName] = useState(item?.name || '');
  const [amount, setAmount] = useState(item?.amount || '');
  const [categoryIdx, setCategoryIdx] = useState(
    item ? CATEGORIES.indexOf(item.category) : -1
  );

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
      const updatedItem: VariableExpenseItem = {
        ...item,
        date,
        name,
        amount: Number(amount),
        category: findCategory(categoryIdx),
      };

      onEdit(updatedItem);
    } else {
      const newVariableExpense: VariableExpenseItem = {
        id: createUUID(),
        date,
        name,
        amount: Number(amount),
        category: findCategory(categoryIdx),
      };

      onAdd(newVariableExpense);
    }

    setName('');
    setAmount('');
    setCategoryIdx(-1);
    onClose();
  }

  return (
    <SlideInModal
      title={`${item ? `Edit "${item.name}"` : 'Add Variable Expense'}`}
      onClose={onClose}
      closeOnOverlayClick
    >
      <StyledExpenseForm onSubmit={handleSubmit}>
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
              Variables expenses are expenses that can vary from month to month.
              Examples include groceries, gas, and entertainment, as well as any
              other expenses that are not fixed.
            </Text>
          </StyledInformationContainer>
        )}
      </StyledExpenseForm>
    </SlideInModal>
  );
};

export const VariableExpensesPage: FunctionComponent = () => {
  const {
    variableExpenses,
    addVariableExpense,
    updateVariableExpense,
    removeVariableExpense,
  } = useExpenses();
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
      {openVariableExpenseModal && (
        <VariableExpenseModal
          item={variableExpenseItem}
          onClose={() => {
            setVariableExpenseItem(undefined);
            setOpenVariableExpenseModal(false);
          }}
          onAdd={addVariableExpense}
          onEdit={updateVariableExpense}
        />
      )}

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
        // footer={{
        //   label: 'Total',
        //   component: () => (
        //     <Text fontWeight='bold' color='primary'>
        //       {formatNumber(sumFixedExpenses, 3)} kr
        //     </Text>
        //   ),
        // }}
      />
    </React.Fragment>
  );
};

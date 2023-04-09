import { useState, useMemo } from 'react';
import {
  Button,
  DatePicker,
  Dropdown,
  Icon,
  Input,
  Text,
} from './components/common';
import { useExpenses } from './context/ExpensesProvider';
import { FixedExpenseCategory, FixedExpenseItem } from './types';

const categories = Object.keys(FixedExpenseCategory) as FixedExpenseCategory[];

function findCategory(idx: number) {
  if (idx < 0) {
    FixedExpenseCategory.Other;
  }

  return categories[idx];
}

function App() {
  const {
    fixedExpenses,
    variableExpenses,
    addFixedExpense,
    addVariableExpense,
    updateFixedExpense,
    updateVariableExpense,
    removeFixedExpense,
    removeVariableExpense,
  } = useExpenses();

  const [fixedExpenseName, setFixedExpenseName] = useState('');
  const [fixedExpenseAmount, setFixedExpenseAmount] = useState('');
  const [fixedExpenseCategoryIdx, setFixedExpenseCategoryIdx] = useState(-1);

  function handleAddFixedExpense(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !fixedExpenseName ||
      Number.isNaN(fixedExpenseAmount) ||
      Number(fixedExpenseAmount) <= 0
    ) {
      return;
    }

    const newFixedExpense: FixedExpenseItem = {
      id: `${fixedExpenses.length + 1}`,
      name: fixedExpenseName,
      amount: Number(fixedExpenseAmount),
      category: findCategory(fixedExpenseCategoryIdx),
    };

    addFixedExpense(newFixedExpense);

    setFixedExpenseName('');
    setFixedExpenseAmount('');
    setFixedExpenseCategoryIdx(-1);
  }

  const disableAddFixedExpense = useMemo(
    () =>
      !fixedExpenseName ||
      Number.isNaN(fixedExpenseAmount) ||
      Number(fixedExpenseAmount) <= 0,
    [fixedExpenseName, fixedExpenseAmount]
  );

  return (
    <div
      className='App'
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <Text variant='h1'>Hello world!</Text>

      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        onSubmit={handleAddFixedExpense}
      >
        <Input
          label='Name'
          placeholder='Enter name'
          value={fixedExpenseName}
          onChange={setFixedExpenseName}
        />
        <Input
          label='Amount'
          placeholder='Enter amount'
          value={String(fixedExpenseAmount)}
          onChange={setFixedExpenseAmount}
          inputMode='numeric'
          filter='number'
        />
        <Dropdown
          label='Category'
          placeholder='Select category'
          selectedOptionIdx={fixedExpenseCategoryIdx}
          options={categories}
          onChange={setFixedExpenseCategoryIdx}
        />
        <Button type='submit' disabled={disableAddFixedExpense}>
          Add fixed expense
        </Button>
      </form>

      <Text variant='h2'>Fixed expenses</Text>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {fixedExpenses.map(fixedExpense => (
          <li key={fixedExpense.id}>
            <Text variant='h3'>{fixedExpense.name}</Text>
            <Text variant='h4'>{fixedExpense.amount}</Text>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

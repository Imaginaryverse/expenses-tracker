import { createContext, useContext, useState } from 'react';

import { FixedExpenseItem, VariableExpenseItem } from '../types';

/**
 * Converts all date strings in an object to Date objects.
 * This is useful when parsing JSON data from the local storage.
 * @param obj Object to parse
 * @returns Object with all date strings converted to Date objects
 */
function parseDateStringsInObject(obj: any) {
  const temp = obj;

  for (const key in temp) {
    if (key.toLowerCase().includes('date') && typeof temp[key] === 'string') {
      temp[key] = new Date(temp[key]);
    }
  }

  return temp;
}

function loadMonthlyIncome(): number {
  const monthlyIncome = localStorage.getItem('monthlyIncome');

  if (!monthlyIncome) {
    return 0;
  }

  return Number(monthlyIncome);
}

function saveMonthlyIncome(monthlyIncome: number) {
  localStorage.setItem('monthlyIncome', monthlyIncome.toString());
}

function loadFixedExpenses(): FixedExpenseItem[] {
  const fixedExpenses = localStorage.getItem('fixedExpenses');

  if (!fixedExpenses) {
    return [];
  }

  return JSON.parse(fixedExpenses);
}

function saveFixedExpenses(fixedExpenses: FixedExpenseItem[]) {
  localStorage.setItem('fixedExpenses', JSON.stringify(fixedExpenses));
}

function loadVariableExpenses(): VariableExpenseItem[] {
  const variableExpenses = localStorage.getItem('variableExpenses');

  if (!variableExpenses) {
    return [];
  }

  const parsedVariableExpenses = JSON.parse(variableExpenses);

  return parsedVariableExpenses.map((expense: VariableExpenseItem) =>
    parseDateStringsInObject(expense)
  );
}

function saveVariableExpenses(variableExpenses: VariableExpenseItem[]) {
  localStorage.setItem('variableExpenses', JSON.stringify(variableExpenses));
}

type ExpensesContextType = {
  monthlyIncome: number;
  fixedExpenses: FixedExpenseItem[];
  variableExpenses: VariableExpenseItem[];
  updateMonthlyIncome: (income: number) => void;
  addFixedExpense: (fixedExpense: FixedExpenseItem) => void;
  addVariableExpense: (variableExpense: VariableExpenseItem) => void;
  updateFixedExpense: (fixedExpense: FixedExpenseItem) => void;
  updateVariableExpense: (variableExpense: VariableExpenseItem) => void;
  removeFixedExpense: (id: string) => void;
  removeVariableExpense: (id: string) => void;
};

const ExpensesContext = createContext<ExpensesContextType | undefined>(
  undefined
);

export const useExpenses = () => {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error('useExpenses must be used within ExpensesProvider');
  }

  return context;
};

export const ExpensesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(
    loadMonthlyIncome()
  );

  const [fixedExpenses, setFixedExpenses] = useState<FixedExpenseItem[]>(
    loadFixedExpenses()
  );

  const [variableExpenses, setVariableExpenses] = useState<
    VariableExpenseItem[]
  >(loadVariableExpenses());

  const updateMonthlyIncome = (income: number) => {
    setMonthlyIncome(income);
    saveMonthlyIncome(income);
  };

  const addFixedExpense = (fixedExpense: FixedExpenseItem) => {
    setFixedExpenses(prev => {
      const newFixedExpenses = [...prev, fixedExpense];
      saveFixedExpenses(newFixedExpenses);
      return newFixedExpenses;
    });
  };

  const addVariableExpense = (variableExpense: VariableExpenseItem) => {
    setVariableExpenses(prev => {
      const newVariableExpenses = [...prev, variableExpense];
      saveVariableExpenses(newVariableExpenses);
      return newVariableExpenses;
    });
  };

  const updateFixedExpense = (fixedExpense: FixedExpenseItem) => {
    setFixedExpenses(prev => {
      const newFixedExpenses = prev.map(item =>
        item.id === fixedExpense.id ? fixedExpense : item
      );
      saveFixedExpenses(newFixedExpenses);
      return newFixedExpenses;
    });
  };

  const updateVariableExpense = (variableExpense: VariableExpenseItem) => {
    setVariableExpenses(prev => {
      const newVariableExpenses = prev.map(item =>
        item.id === variableExpense.id ? variableExpense : item
      );
      saveVariableExpenses(newVariableExpenses);
      return newVariableExpenses;
    });
  };

  const removeFixedExpense = (id: string) => {
    setFixedExpenses(prev => {
      const newFixedExpenses = prev.filter(item => item.id !== id);
      saveFixedExpenses(newFixedExpenses);
      return newFixedExpenses;
    });
  };

  const removeVariableExpense = (id: string) => {
    setVariableExpenses(prev => {
      const newVariableExpenses = prev.filter(item => item.id !== id);
      saveVariableExpenses(newVariableExpenses);
      return newVariableExpenses;
    });
  };

  return (
    <ExpensesContext.Provider
      value={{
        monthlyIncome,
        fixedExpenses,
        variableExpenses,
        updateMonthlyIncome,
        addFixedExpense,
        addVariableExpense,
        updateFixedExpense,
        updateVariableExpense,
        removeFixedExpense,
        removeVariableExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

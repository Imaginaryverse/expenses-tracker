export enum FixedExpenseCategory {
  Bills = 'Bills', // e.g. rent, electricity, water, gas
  Entertainment = 'Entertainment', // e.g. Netflix, Spotify
  Food = 'Food', // e.g. groceries, eating out
  Membership = 'Membership', // e.g. gym, library
  Shopping = 'Shopping', // e.g. electronics, furniture
  Travel = 'Travel', // e.g. public transport, taxi
  Other = 'Other', // e.g. gifts, donations
}

export const FIXED_EXPENSE_CATEGORIES: FixedExpenseCategory[] =
  Object.values(FixedExpenseCategory);

export enum VariableExpenseCategory {
  Activities = 'Activities', // e.g. going to the cinema, going to the gym
  Education = 'Education', // e.g. books, courses
  Food = 'Food', // e.g. groceries, eating out
  Health = 'Health', // e.g. doctor, dentist
  Hygiene = 'Hygiene', // e.g. toiletries, haircuts
  Shopping = 'Shopping', // e.g. electronics, furniture
  Travel = 'Travel', // e.g. public transport, taxi
  Other = 'Other', // e.g. gifts, donations, money transfers
}

export const VARIABLE_EXPENSE_CATEGORIES: VariableExpenseCategory[] =
  Object.values(VariableExpenseCategory);

type BaseExpenseItem = {
  id: string;
  name: string;
  amount: number;
};

export type FixedExpenseItem = BaseExpenseItem & {
  category: FixedExpenseCategory;
};

export type VariableExpenseItem = BaseExpenseItem & {
  date: Date;
  category: VariableExpenseCategory;
};

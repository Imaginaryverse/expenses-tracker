import { Route, Routes } from 'react-router-dom';
import { Layout } from '@src/style/Layout';
import {
  HomePage,
  FixedExpensesPage,
  VariableExpensesPage,
  IncomePage,
} from '@src/pages';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='variable_expenses' element={<VariableExpensesPage />} />
        <Route path='fixed_expenses' element={<FixedExpensesPage />} />
        <Route path='income' element={<IncomePage />} />
      </Route>
    </Routes>
  );
};

import React, { FunctionComponent, useState } from 'react';
import { Button, Icon, Text } from '@src/components/common';
import { useExpenses } from '@src/context/ExpensesProvider';
import styled from 'styled-components';
import { NetIncomeModal } from './components/NetIncomeModal';

const IncomePageHeader = styled.header`
  width: 100%;
  padding: ${({ theme }) => theme.spacing['1']} 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.body.background};
`;

export const IncomePage: FunctionComponent = () => {
  const { monthlyIncome } = useExpenses();

  const [openNetIncomeModal, setOpenNetIncomeModal] = useState(false);

  return (
    <React.Fragment>
      <IncomePageHeader>
        <Text variant='h1'>Net Income</Text>
        <Button onClick={() => setOpenNetIncomeModal(true)}>
          <Icon icon='edit' marginRight='0.25rem' />
          Update
        </Button>
      </IncomePageHeader>

      {!monthlyIncome && (
        <Text>
          Certain features will not be available until you have set your monthly
          net income. Click the "Update" button above to set it.
        </Text>
      )}

      <NetIncomeModal
        isOpen={openNetIncomeModal}
        setIsOpen={setOpenNetIncomeModal}
      />
    </React.Fragment>
  );
};

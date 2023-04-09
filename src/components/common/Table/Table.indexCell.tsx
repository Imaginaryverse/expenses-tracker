import { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledTableIndexCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type TableIndexCellProps = {
  children?: React.ReactNode;
};

export const TableIndexCell: FunctionComponent<TableIndexCellProps> = ({ children }) => {
  return <StyledTableIndexCell>{children}</StyledTableIndexCell>;
};

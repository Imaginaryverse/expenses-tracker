import styled from 'styled-components';
import { TableIndexCell } from './Table.indexCell';
import { Column, SortOrder } from './Table.types';
import { getHeaderTemplateColumns } from './Table.utils';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';

type TableHeaderProps<T> = {
  columns: Column<T>[];
  expandedRows: number[];
  showIndices?: boolean;
  showOptions?: boolean;
  showExpandBtn?: boolean;
  onExpandRowsPress: () => void;
  currentSortLabel?: string;
  currentSortOrder?: SortOrder;
  onColumnSort: (column: Column<T>) => void;
  hasSortFn: boolean;
};

const StyledTableHeader = styled.div<{
  columns: number;
  showIndices: boolean;
  showOptions: boolean;
  showExpandBtn: boolean;
}>`
  width: 100%;
  display: grid;
  grid-template-columns: ${({
    showIndices,
    columns,
    showOptions,
    showExpandBtn,
  }) =>
    getHeaderTemplateColumns(showIndices, columns, showOptions, showExpandBtn)};
  gap: 0.5rem;
  padding: 0.5rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.body.border};
`;

export const TableHeader = <T extends {}>({
  columns,
  expandedRows,
  showIndices,
  showOptions,
  showExpandBtn,
  onExpandRowsPress,
  currentSortLabel,
  currentSortOrder,
  onColumnSort,
  hasSortFn,
}: TableHeaderProps<T>) => {
  return (
    <StyledTableHeader
      columns={columns.length}
      showIndices={!!showIndices}
      showOptions={!!showOptions}
      showExpandBtn={!!showExpandBtn}
    >
      {showIndices && (
        <TableIndexCell>
          <Text variant='label' opaque>
            #
          </Text>
        </TableIndexCell>
      )}
      {columns.map((column, idx) => {
        const isSortable = !!hasSortFn && !!column.sortable;

        return (
          <Text
            key={idx}
            variant='label'
            fontWeight='bold'
            opaque
            truncate
            onClick={!isSortable ? undefined : () => onColumnSort(column)}
            stopPropagation
            title={!isSortable ? undefined : `Sort by ${column.label}`}
          >
            {column.label}
            {currentSortLabel === column.label && (
              <Icon
                icon={
                  currentSortOrder === 'ascending'
                    ? 'chevron-up'
                    : 'chevron-down'
                }
                marginLeft='0.125rem'
                verticalAlign='middle'
              />
            )}
          </Text>
        );
      })}
      {!!showOptions && (
        <Text variant='label' fontWeight='bold' opaque>
          Opts.
        </Text>
      )}
      {!!showExpandBtn && (
        <TableIndexCell>
          <Icon
            icon={!!expandedRows.length ? 'chevrons-up' : 'chevrons-down'}
            onClick={onExpandRowsPress}
            title={!!expandedRows.length ? 'Collapse all' : 'Expand all'}
          />
        </TableIndexCell>
      )}
    </StyledTableHeader>
  );
};

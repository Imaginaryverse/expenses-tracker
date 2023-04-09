import React from 'react';
import styled from 'styled-components';
import { TableIndexCell } from './Table.indexCell';
import { Column, TableProps } from './Table.types';
import {
  getExpandContentTemplateColumns,
  getHeaderTemplateColumns,
} from './Table.utils';
import { Text } from '../Text/Text';
import { Icon } from '../Icon/Icon';
import { TableOptionsCell } from './Table.optionsCell';

type TableRowProps<T> = {
  data: T;
  idx: number;
  columns: Column<T>[];
  itemsPerPage: number;
  currentPage: number;
  showIndices: boolean;
  rowOptions?: TableProps<T>['rowOptions'];
  expandedRows: number[];
  expandContent?: (data: T) => React.ReactNode;
  onRowPress?: (data: T) => void;
  /**
   * If true, the row will expand when it is pressed.
   * Note that this will override the onRowPress callback.
   */
  expandOnRowPress?: boolean;
  onExpandRowPress?: (idx: number) => void;
};

const StyledTableRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: background-color ${({ theme }) => theme.transition.duration.M}
    ease-in-out;

  > * {
    > * {
      align-self: center;
    }
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.body.border};
  }

  &.pressable {
    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.primary.alt};
    }
  }
`;

const StyledTableRowHeader = styled.div<{
  columns: number;
  showIndices: boolean;
  showOptions: boolean;
  expandContent: boolean;
}>`
  width: 100%;
  display: grid;
  vertical-align: middle; // center content vertically
  grid-template-columns: ${({
    showIndices,
    columns,
    showOptions,
    expandContent,
  }) =>
    getHeaderTemplateColumns(showIndices, columns, showOptions, expandContent)};
  gap: 0.5rem;

  padding: 1rem 0.5rem;
`;

const StyledExpandedContentContainer = styled.div<{
  showIndices: boolean;
  expandContent: boolean;
}>`
  width: 100%;
  display: grid;

  // showIndices and expandContent are used to align the content with values in the table
  grid-template-columns: ${({ showIndices, expandContent }) =>
    getExpandContentTemplateColumns(showIndices, expandContent)};
  gap: 0.5rem;
`;

const StyledExpandedContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.spacing['1']};
`;

export const TableRow = <T extends {}>({
  data,
  idx,
  columns,
  itemsPerPage,
  currentPage,
  showIndices,
  rowOptions,
  expandedRows,
  expandContent,
  onRowPress,
  expandOnRowPress,
  onExpandRowPress,
}: TableRowProps<T>) => {
  return (
    <StyledTableRow
      className={!!onRowPress || expandOnRowPress ? 'pressable' : undefined}
      onClick={
        expandOnRowPress
          ? () => onExpandRowPress?.(idx)
          : () => onRowPress?.(data)
      }
    >
      <StyledTableRowHeader
        columns={columns.length}
        showIndices={!!showIndices}
        showOptions={!!rowOptions}
        expandContent={!!expandContent}
      >
        {showIndices && (
          <TableIndexCell>
            <Text opaque>{idx + 1 + itemsPerPage * currentPage}</Text>
          </TableIndexCell>
        )}
        {columns.map((column, columnIdx) => (
          <React.Fragment key={columnIdx}>
            {column.component(data, idx)}
          </React.Fragment>
        ))}

        {!!rowOptions && (
          <TableOptionsCell data={data} rowOptions={rowOptions} />
        )}

        {!!expandContent && (
          <TableIndexCell>
            <Icon
              icon={expandedRows.includes(idx) ? 'chevron-up' : 'chevron-down'}
              onClick={() => onExpandRowPress?.(idx)}
              stopPropagation
              size='small'
            />
          </TableIndexCell>
        )}
      </StyledTableRowHeader>
      {!!expandContent && expandedRows.includes(idx) && (
        <StyledExpandedContentContainer
          showIndices={showIndices}
          expandContent={!!expandContent}
        >
          {showIndices && <TableIndexCell />}
          <StyledExpandedContent>{expandContent(data)}</StyledExpandedContent>
          {showIndices && <TableIndexCell />}
        </StyledExpandedContentContainer>
      )}
    </StyledTableRow>
  );
};

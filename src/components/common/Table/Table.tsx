import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Column, SortOrder, TableProps } from './Table.types';
import { TableHeader } from './Table.header';
import { TableRow } from './Table.row';
import { TablePagination } from './Table.pagination';
import { Text } from '../Text/Text';

const StyledTableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const createPages = <T extends {}>(
  data: T[],
  itemsPerPage: number
): Array<T[]> => {
  const pages = [];
  for (let i = 0; i < data.length; i += itemsPerPage) {
    pages.push(data.slice(i, i + itemsPerPage));
  }

  return pages;
};

export const Table = <T extends {}>({
  data,
  columns,
  footer,
  onRowPress,
  rowOptions,
  expandOnRowPress = false,
  showIndices = false,
  expandContent,
  itemsPerPage = 10,
  sortFn,
  defaultSort,
}: TableProps<T>) => {
  if (!data?.length) {
    return null;
  }

  const [currentPage, setCurrentPage] = useState(0);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const [currentSortLabel, setCurrentSortLabel] = useState<string | undefined>(
    defaultSort?.label
  );

  const [currentSortOrder, setCurrentSortOrder] = useState<SortOrder>(
    defaultSort?.sortOrder || 'ascending'
  );

  function handleSort(column: Column<T>) {
    if (!sortFn) {
      return;
    }

    // Reset the expanded rows
    setExpandedRows([]);

    // If the column is already sorted, toggle the sort order
    if (currentSortLabel === column.label && currentSortOrder === 'ascending') {
      setCurrentSortOrder('descending');
      return;
    }

    // If the column is already sorted in descending order, remove the sort
    if (
      currentSortLabel === column.label &&
      currentSortOrder === 'descending'
    ) {
      setCurrentSortLabel(undefined);
      setCurrentSortOrder('ascending');
      return;
    }

    setCurrentSortLabel(column.label);
    setCurrentSortOrder('ascending');
  }

  /**
   * Handles the press of the expand button in the header
   * Expands or collapses all rows
   */
  const handleExpandRowsPress = () => {
    if (expandedRows.length > 0) {
      setExpandedRows([]);
    } else {
      setExpandedRows(data.map((_, idx) => idx));
    }
  };

  /**
   * Handles the press of the expand button in a row
   * Expands or collapses the row
   * @param idx The index of the row
   */
  const handleExpandRowPress = (idx: number) => {
    if (expandedRows.includes(idx)) {
      setExpandedRows(expandedRows.filter(i => i !== idx));
      return;
    }

    setExpandedRows([...expandedRows, idx]);
  };

  const sortedData = useMemo(() => {
    if (!sortFn || !currentSortLabel) {
      return data;
    }

    return sortFn(data, currentSortLabel, currentSortOrder);
  }, [data, currentSortLabel, currentSortOrder, sortFn]);

  const pages = useMemo(
    () => createPages(sortedData, itemsPerPage),
    [sortedData, itemsPerPage]
  );

  useEffect(() => {
    setExpandedRows([]);
  }, [data]);

  return (
    <StyledTableContainer>
      <TableHeader
        columns={columns}
        expandedRows={expandedRows}
        showIndices={showIndices}
        showOptions={!!rowOptions?.length}
        showExpandBtn={!!expandContent}
        onExpandRowsPress={handleExpandRowsPress}
        currentSortLabel={currentSortLabel}
        currentSortOrder={currentSortOrder}
        onColumnSort={handleSort}
        hasSortFn={!!sortFn}
      />

      {pages[currentPage]?.map((row, idx) => (
        <TableRow
          key={idx}
          data={row}
          idx={idx}
          columns={columns}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          showIndices={showIndices}
          rowOptions={rowOptions}
          expandedRows={expandedRows}
          expandContent={expandContent}
          onRowPress={onRowPress}
          expandOnRowPress={expandOnRowPress}
          onExpandRowPress={handleExpandRowPress}
        />
      ))}

      {footer && (
        <StyledTableFooter>
          <Text fontWeight='bold'>{footer.label}:</Text>
          {footer.component(data)}
        </StyledTableFooter>
      )}

      {pages.length > 1 && (
        <TablePagination
          numPages={pages.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </StyledTableContainer>
  );
};

const StyledTableFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  gap: 0.5rem;
`;

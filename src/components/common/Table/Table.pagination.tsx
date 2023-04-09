import { FunctionComponent, useMemo } from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { disabledStyle } from '@src/style/css';

type PaginationProps = {
  numPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const StyledPaginationContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing['1']} 0;
`;

const StyledButtonGroup = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

const StyledPaginationPressable = styled.button`
  border: none;
  background-color: transparent;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.M};

  font-weight: bold;
  color: ${({ theme }) => theme.colors.body.text};

  transition: all ${({ theme }) => theme.transition.duration.M} ease-in-out;

  &.current {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: underline;
    text-underline-offset: 2px;
    background-color: ${({ theme }) => theme.colors.primary.alt};
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primary.alt};
  }

  &:disabled {
    ${disabledStyle}
  }
`;

export const TablePagination: FunctionComponent<PaginationProps> = ({
  numPages,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = useMemo(() => {
    if (numPages <= 5) {
      return Array.from({ length: numPages }, (_, i) => i);
    }

    const start = currentPage - 2;
    const end = currentPage + 2;

    if (start < 0) {
      return Array.from({ length: 5 }, (_, i) => i);
    }

    if (end >= numPages) {
      return Array.from({ length: 5 }, (_, i) => numPages - 5 + i);
    }

    return Array.from({ length: 5 }, (_, i) => start + i);
  }, [numPages, currentPage]);

  const isOnFirstPage = currentPage === 0;
  const isOnLastPage = currentPage === numPages - 1;

  return (
    <StyledPaginationContainer>
      <StyledButtonGroup>
        {numPages > 1 && (
          // <Button
          //   onClick={() => setCurrentPage(0)}
          //   title='First page'
          //   ghost
          //   disabled={isOnFirstPage}
          // >
          //   First
          // </Button>
          <StyledPaginationPressable
            onClick={() => setCurrentPage(0)}
            title='First page'
            disabled={isOnFirstPage}
          >
            First
          </StyledPaginationPressable>
        )}

        {numPages > 1 && (
          // <Button
          //   onClick={() => setCurrentPage(currentPage - 1)}
          //   title='Previous page'
          //   ghost
          //   disabled={isOnFirstPage}
          // >
          //   <Icon color='inherit' icon='chevron-left' />
          // </Button>
          <StyledPaginationPressable
            onClick={() => setCurrentPage(currentPage - 1)}
            title='Previous page'
            disabled={isOnFirstPage}
          >
            <Icon color='inherit' icon='chevron-left' />
          </StyledPaginationPressable>
        )}
      </StyledButtonGroup>

      <StyledButtonGroup>
        {pageNumbers.map(pageIdx => (
          // <Button
          //   key={pageIdx}
          //   onClick={() => setCurrentPage(pageIdx)}
          //   title={`Page ${pageIdx + 1}`}
          //   ghost={currentPage !== pageIdx}
          // >
          //   {pageIdx + 1}
          // </Button>
          <StyledPaginationPressable
            key={pageIdx}
            className={currentPage === pageIdx ? 'current' : ''}
            onClick={() => setCurrentPage(pageIdx)}
            title={`Page ${pageIdx + 1}`}
          >
            {pageIdx + 1}
          </StyledPaginationPressable>
        ))}
      </StyledButtonGroup>

      <StyledButtonGroup>
        {numPages > 1 && (
          // <Button
          //   onClick={() => setCurrentPage(currentPage + 1)}
          //   title='Next page'
          //   ghost
          //   disabled={isOnLastPage}
          // >
          //   <Icon color='inherit' icon='chevron-right' />
          // </Button>
          <StyledPaginationPressable
            onClick={() => setCurrentPage(currentPage + 1)}
            title='Next page'
            disabled={isOnLastPage}
          >
            <Icon color='inherit' icon='chevron-right' />
          </StyledPaginationPressable>
        )}

        {numPages > 1 && (
          // <Button
          //   onClick={() => setCurrentPage(numPages - 1)}
          //   title='Last page'
          //   ghost
          //   disabled={isOnLastPage}
          // >
          //   Last ({numPages})
          // </Button>
          <StyledPaginationPressable
            onClick={() => setCurrentPage(numPages - 1)}
            title='Last page'
            disabled={isOnLastPage}
          >
            Last ({numPages})
          </StyledPaginationPressable>
        )}
      </StyledButtonGroup>
    </StyledPaginationContainer>
  );
};

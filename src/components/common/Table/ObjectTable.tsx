import styled, { DefaultTheme } from 'styled-components';
import { Text } from '../Text/Text';

type Entry<T> = {
  /**
   * The label of the entry to be above the value
   */
  label: string;
  /**
   * Component to be displayed in the entry.
   * Recommended to use Text component with variant='p'
   * @param data The data of the row
   * @param index The index of the row
   */
  component: (data: T, index: number) => React.ReactNode;
};

type ObjectTableProps<T> = {
  /**
   * The data to be displayed in the table
   */
  data: T;
  /**
   * The entries to be rendered in the table. Each entry takes a label and a component.
   * @see Entry type for more information
   */
  entries: Entry<T>[];
  /**
   * Top padding of the table
   * @default 0
   */
  paddingTop?: keyof DefaultTheme['spacing'];
  /**
   * Bottom padding of the table
   * @default 0
   */
  paddingBottom?: keyof DefaultTheme['spacing'];
  /**
   * Left padding of the table
   * @default 0
   */
  paddingLeft?: keyof DefaultTheme['spacing'];
  /**
   * Right padding of the table
   * @default 0
   */
  paddingRight?: keyof DefaultTheme['spacing'];
  /**
   * Whether to display a border on the top of the table
   * @default false
   */
  borderTop?: boolean;
  /**
   * Whether to display a border on the right of the table
   * @default false
   */
  borderRight?: boolean;
  /**
   * Whether to display a border on the bottom of the table
   * @default false
   */
  borderBottom?: boolean;
  /**
   * Whether to display a border on the left of the table
   * @default false
   */
  borderLeft?: boolean;
};

const StyledObjectTableContainer = styled.div<{
  paddingTop?: keyof DefaultTheme['spacing'];
  paddingBottom?: keyof DefaultTheme['spacing'];
  paddingRight?: keyof DefaultTheme['spacing'];
  paddingLeft?: keyof DefaultTheme['spacing'];
  borderTop?: boolean;
  borderRight?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
}>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 0.5rem;

  padding-top: ${({ theme, paddingTop }) =>
    !paddingTop ? '0' : theme.spacing[paddingTop]};
  padding-bottom: ${({ theme, paddingBottom }) =>
    !paddingBottom ? '0' : theme.spacing[paddingBottom]};
  padding-right: ${({ theme, paddingRight }) =>
    !paddingRight ? '0' : theme.spacing[paddingRight]};
  padding-left: ${({ theme, paddingLeft }) =>
    !paddingLeft ? '0' : theme.spacing[paddingLeft]};

  border-top: ${({ theme, borderTop }) =>
    borderTop ? `1px solid ${theme.colors.body.border}` : 'none'};
  border-right: ${({ theme, borderRight }) =>
    borderRight ? `1px solid ${theme.colors.body.border}` : 'none'};
  border-bottom: ${({ theme, borderBottom }) =>
    borderBottom ? `1px solid ${theme.colors.body.border}` : 'none'};
  border-left: ${({ theme, borderLeft }) =>
    borderLeft ? `1px solid ${theme.colors.body.border}` : 'none'};

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StyledObjectTableEntry = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.12rem;

  // truncate text
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/**
 * A table that displays a single object.
 */
export const ObjectTable = <T extends {}>({
  data,
  entries,
  paddingTop,
  paddingBottom,
  paddingRight,
  paddingLeft,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
}: ObjectTableProps<T>) => {
  if (!data) {
    return null;
  }

  return (
    <StyledObjectTableContainer
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      paddingRight={paddingRight}
      paddingLeft={paddingLeft}
      borderTop={borderTop}
      borderRight={borderRight}
      borderBottom={borderBottom}
      borderLeft={borderLeft}
    >
      {entries.map(({ label, component }, idx) => (
        <StyledObjectTableEntry key={idx}>
          <Text variant='label' opaque>
            {label}
          </Text>
          {component(data, idx)}
        </StyledObjectTableEntry>
      ))}
    </StyledObjectTableContainer>
  );
};

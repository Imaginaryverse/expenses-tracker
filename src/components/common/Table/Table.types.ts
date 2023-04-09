import { FeatherIconName } from '../Icon/Icon';

export type SortOrder = 'ascending' | 'descending';

export type Column<T> = {
  /**
   * The label of the column to be displayed in the header
   */
  label: string;
  /**
   * Component to be displayed in the column for each row
   */
  component: (data: T, index: number) => React.ReactNode;
  /**
   * Determines whether the column is sortable
   * @default false
   */
  sortable?: boolean;
};

export type TableProps<T> = {
  /**
   * The data to be displayed in the table
   */
  data: T[];
  /**
   * The columns to be rendered in the table. Each column takes a label and a component.
   * @see Column type for more information
   */
  columns: Column<T>[];
  /**
   * The footer of the table. This is displayed at the bottom of the table.
   * Useful for displaying totals.
   * @param data The data of the table
   * @returns The footer component
   */
  footer?: {
    label: string;
    component: (data: T[]) => React.ReactNode;
  };
  /**
   * The function to be called when a row is pressed
   * @param data The data of the row
   */
  onRowPress?: (data: T) => void;
  /**
   * If provided, an icon will be displayed on the right side of each row.
   * When pressed, a menu will be displayed with the options provided.
   * @param data The data of the row
   * @returns The options to be displayed in the menu
   * @example
   * [
   *  {
   *   label: 'Edit',
   *   onPress: (data) => console.log('Edit', data),
   * },
   */
  rowOptions?: {
    label: string;
    icon?: FeatherIconName;
    onClick: (data: T) => void;
  }[];
  /**
   * Determines whether to expand the row when it is pressed.
   * If true, the onRowPress function will not be called.
   * @default false
   */
  expandOnRowPress?: boolean;
  /**
   * Determines whether to show the indices of the rows
   */
  showIndices?: boolean;
  /**
   * Content to be displayed when a row is expanded
   * @param data The data of the row
   */
  expandContent?: (data: T) => React.ReactNode;
  /**
   * The number of items to be displayed per page
   * @default 20
   * @see itemsPerPage
   * */
  itemsPerPage?: number;
  /**
   * Function defining how to sort the data. This function is called when a column label is pressed.
   * If undefined, sorting will not be enabled.
   * @param data The data to be sorted
   * @param label The label of the column to be sorted
   * @param sortOrder The current sort order
   * @returns The sorted data
   */
  sortFn?: (data: T[], label: Column<T>['label'], sortOrder: SortOrder) => T[];
  /**
   * The default sort order of the table
   * @default undefined
   * @see sortFn
   * @see sortOrder
   * @example
   * {
   *   label: 'Name',
   *   sortOrder: 'ascending',
   * }
   */
  defaultSort?: {
    /**
     * The label of the column to be sorted
     */
    label: Column<T>['label'];
    /**
     * The sort order of the column
     * @default 'ascending'
     */
    sortOrder: SortOrder;
  };
};

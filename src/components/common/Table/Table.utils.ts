/**
 * Generates the template columns for the table header and table row header
 * @param showIndices - whether or not to show the index column
 * @param numColumns - the number of columns in the table
 * @param expandContent - whether or not to show the expand content column
 * @returns {string} css template columns
 */
export function getHeaderTemplateColumns(
  showIndices: boolean,
  numColumns: number,
  showOptions: boolean,
  expandContent: boolean
): string {
  return `
  ${showIndices ? '1rem ' : ''}
  repeat(${numColumns}, 1fr)
  ${showOptions ? '0.25fr' : ''}
  ${expandContent ? '1rem' : ''}
  `;
}

/**
 * Generates the template columns for expand content container
 * @param showIndices - whether or not to show the index column
 * @param expandContent - whether or not to show the expand content column
 * @returns {string} css template columns
 */
export function getExpandContentTemplateColumns(
  showIndices: boolean,
  expandContent: boolean
): string {
  return `
  ${showIndices ? '1rem ' : ''}
  1fr
  ${expandContent ? '1rem' : ''}
  `;
}

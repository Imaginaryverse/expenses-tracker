import { FunctionComponent } from 'react';
import styled, { DefaultTheme, css } from 'styled-components';

type SectionProps = {
  children: React.ReactNode;
  /**
   * Determines the width of the section.
   * @default '100%'
   * @example
   * <Section width='100%' />
   * <Section width='25rem' />
   */
  width?: `${number}%` | `${number}rem`;
  /**
   * Determines the max-width of the section.
   * @default '100%'
   * @example
   * <Section maxWidth='100%' />
   * <Section maxWidth='25rem' />
   */
  maxWidth?: `${number}%` | `${number}rem`;
  /**
   * Determines the flex-direction of the section.
   * @default 'column'
   */
  flexDirection?: 'row' | 'column';
  /**
   * Determines the justify-content of the section.
   * @default 'center'
   */
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between';
  /**
   * Determines the align-items of the section.
   * @default 'center'
   */
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  /**
   * Determines the gap between the children of the section.
   * @default '1'
   * @example
   * <Section gap='1' />
   */
  gap?: keyof DefaultTheme['spacing'];
  /**
   * Determines whether the section should have a border.
   * @default undefined
   * @example
   * <Section border={{ vertical: true, horizontal: true }} />
   * <Section border={{ top: true, bottom: true, left: true, right: true }} />
   */
  border?: {
    vertical?: boolean;
    horizontal?: boolean;
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
  };
  /**
   * Determines whether the section should have border-radius.
   * @default '0'
   * @example
   * <Section borderRadius='S' />
   * <Section borderRadius='M' />
   * <Section borderRadius='L' />
   */
  borderRadius?: keyof DefaultTheme['borderRadius'];
  /**
   * Determines whether the section should have padding.
   * @default top: '2', bottom: '2', left: '1', right: '1'
   * @example
   * <Section padding={{ vertical: '1', horizontal: '2' }} />
   * <Section padding={{ top: '1', bottom: '2', left: '3', right: '4' }} />
   */
  padding?: {
    top?: keyof DefaultTheme['spacing'];
    bottom?: keyof DefaultTheme['spacing'];
    left?: keyof DefaultTheme['spacing'];
    right?: keyof DefaultTheme['spacing'];
  };
  /**
   * Determines whether the section should have margins.
   * @default top: '2', bottom: '2'
   * @example
   * <Section margin={{ vertical: '1', horizontal: '2' }} />
   * <Section margin={{ top: '1', bottom: '2', left: '3', right: '4' }} />
   */
  margin?: {
    top?: keyof DefaultTheme['spacing'];
    bottom?: keyof DefaultTheme['spacing'];
    left?: keyof DefaultTheme['spacing'];
    right?: keyof DefaultTheme['spacing'];
  };
  /**
   * Determines whether the section should have a background color.
   * @default 'transparent'
   * @example
   * <Section background='primary' />
   * <Section background='secondary' />
   * <Section background='transparent' />
   */
  background?: keyof DefaultTheme['colors'] | 'transparent';
};

function applyGapStyle(gap: SectionProps['gap'], theme: DefaultTheme) {
  if (!gap) return '1rem';

  return theme.spacing[gap];
}

function applyBorderStyle(border: SectionProps['border'], theme: DefaultTheme) {
  if (!border) return 'none';

  const { vertical, horizontal, top, bottom, left, right } = border;

  return css`
    border: ${vertical &&
    horizontal &&
    `1px solid ${theme.colors.body.border}`};
    border-top: ${(top || vertical) && `1px solid ${theme.colors.body.border}`};
    border-bottom: ${(bottom || vertical) &&
    `1px solid ${theme.colors.body.border}`};
    border-left: ${(left || horizontal) &&
    `1px solid ${theme.colors.body.border}`};
    border-right: ${(right || horizontal) &&
    `1px solid ${theme.colors.body.border}`};
  `;
}

function applyBorderRadiusStyle(
  borderRadius: SectionProps['borderRadius'],
  theme: DefaultTheme
) {
  if (!borderRadius) return '0';

  return theme.borderRadius[borderRadius];
}

function applyBackgroundStyle(
  background: SectionProps['background'],
  theme: DefaultTheme
) {
  if (!background) return 'transparent';

  switch (background) {
    case 'primary':
    case 'secondary':
      return theme.colors[background].alt;
    case 'body':
      return theme.colors.body.background;
    case 'transparent':
    default:
      return 'transparent';
  }
}

const StyledSection = styled.section<SectionProps>`
  display: flex;
  width: ${({ width }) => width};
  max-width: ${({ maxWidth }) => maxWidth};
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  gap: ${({ gap, theme }) => applyGapStyle(gap, theme)};
  border: ${({ border, theme }) => applyBorderStyle(border, theme)};
  border-radius: ${({ borderRadius, theme }) =>
    applyBorderRadiusStyle(borderRadius, theme)};
  padding: ${({ padding, theme }) => {
    if (!padding) return 0;

    const { top, bottom, left, right } = padding;

    return `
      ${top ? theme.spacing[top] : 0}
      ${right ? theme.spacing[right] : 0}
      ${bottom ? theme.spacing[bottom] : 0}
      ${left ? theme.spacing[left] : 0}
    `;
  }};
  margin: ${({ margin, theme }) => {
    if (!margin) return 0;

    const { top, bottom, left, right } = margin;

    return `
      ${top ? theme.spacing[top] : 0}
      ${right ? theme.spacing[right] : 0}
      ${bottom ? theme.spacing[bottom] : 0}
      ${left ? theme.spacing[left] : 0}
    `;
  }};
  background: ${({ background, theme }) =>
    applyBackgroundStyle(background, theme)};
`;

export const Section: FunctionComponent<SectionProps> = ({
  children,
  width = '100%',
  maxWidth = '100%',
  flexDirection = 'column',
  justifyContent = 'center',
  alignItems = 'center',
  gap = '1',
  border,
  borderRadius,
  padding = { top: '2', bottom: '2', left: '1', right: '1' },
  margin = { top: '2', bottom: '2' },
  background = 'transparent',
}) => {
  return (
    <StyledSection
      width={width}
      maxWidth={maxWidth}
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={gap}
      border={border}
      borderRadius={borderRadius}
      padding={padding}
      margin={margin}
      background={background}
    >
      {children}
    </StyledSection>
  );
};

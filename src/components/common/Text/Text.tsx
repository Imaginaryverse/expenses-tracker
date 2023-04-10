import { FunctionComponent } from 'react';
import styled, { DefaultTheme, css } from 'styled-components';

type TextProps = {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label';
  color?: 'inherit' | 'primary' | 'secondary' | 'error';
  textAlign?: 'left' | 'center' | 'right';
  fontWeight?: 'normal' | 'bold';
  alignSelf?: 'flex-start' | 'center' | 'flex-end';
  justifySelf?: 'flex-start' | 'center' | 'flex-end';

  margin?: {
    top?: `${number}rem`;
    bottom?: `${number}rem`;
    left?: `${number}rem`;
    right?: `${number}rem`;
  };

  opaque?: boolean;
  truncate?: boolean;

  onClick?: Function;
  stopPropagation?: boolean;
  title?: string;
};

function applyFontWeight(
  type: TextProps['variant'],
  fontWeight?: TextProps['fontWeight']
) {
  if (fontWeight) {
    return fontWeight;
  }
  switch (type) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return 'bold';
    case 'p':
    case 'label':
    case 'span':
    default:
      return 'normal';
  }
}

function applyColor(color: TextProps['color'], theme: DefaultTheme) {
  switch (color) {
    case 'primary':
    case 'secondary':
      return theme.colors[color].main;
    case 'error':
      return 'red';
    case 'inherit':
      return 'inherit';
    default:
      return theme.colors.body.text;
  }
}

const StyledText = styled.p<TextProps>`
  ${({ variant }) => {
    switch (variant) {
      case 'h1':
        return css`
          font-size: 2rem;

          @media screen and (max-width: 768px) {
            font-size: 1.75rem;
          }
        `;
      case 'h2':
        return css`
          font-size: 1.75rem;

          @media screen and (max-width: 768px) {
            font-size: 1.5rem;
          }
        `;
      case 'h3':
        return css`
          font-size: 1.5rem;

          @media screen and (max-width: 768px) {
            font-size: 1.25rem;
          }
        `;
      case 'h4':
        return css`
          font-size: 1.25rem;

          @media screen and (max-width: 768px) {
            font-size: 1.125rem;
          }
        `;
      case 'h5':
        return css`
          font-size: 1rem;
        `;
      case 'h6':
        return css`
          font-size: 0.875rem;
        `;
      case 'p':
      case 'span':
        return css`
          font-size: 1rem;
        `;
      case 'label':
        return css`
          font-size: 0.875rem;
        `;
      default:
        return css`
          font-size: 1rem;
        `;
    }
  }}

  font-weight: ${({ variant, fontWeight }) =>
    applyFontWeight(variant, fontWeight)};
  color: ${({ color, theme }) => applyColor(color, theme)};

  text-align: ${({ textAlign }) => textAlign};
  align-self: ${({ alignSelf }) => alignSelf};
  justify-self: ${({ justifySelf }) => justifySelf};

  margin-top: ${({ margin }) => margin?.top};
  margin-bottom: ${({ margin }) => margin?.bottom};
  margin-left: ${({ margin }) => margin?.left};
  margin-right: ${({ margin }) => margin?.right};

  opacity: ${({ opaque }) => (opaque ? 0.75 : 1)};

  // max 75 characters per line
  max-width: calc(75ch + 1rem);

  ${({ truncate }) =>
    truncate &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      max-width: 100%;
    `}

  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'inherit')};
  user-select: ${({ onClick }) => (onClick ? 'none' : 'inherit')};
`;

export const Text: FunctionComponent<TextProps> = ({
  children,
  variant = 'p',
  color,
  textAlign,
  fontWeight,
  alignSelf,
  justifySelf,
  margin,
  opaque = false,
  truncate = false,
  onClick,
  stopPropagation = false,
  title,
}) => {
  function handleOnClick(e: React.MouseEvent) {
    if (stopPropagation) {
      e?.preventDefault();
      e?.stopPropagation();
    }

    onClick?.();
  }

  return (
    <StyledText
      as={variant}
      variant={variant}
      color={color}
      textAlign={textAlign}
      fontWeight={fontWeight}
      alignSelf={alignSelf}
      justifySelf={justifySelf}
      margin={margin}
      opaque={opaque}
      truncate={truncate}
      onClick={!onClick ? undefined : handleOnClick}
      title={title}
    >
      {children}
    </StyledText>
  );
};

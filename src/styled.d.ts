import 'styled-components';

type Spacing = `${number}rem`;
type BorderRadius = `${number}px`;
type TransitionDuration = `${number}ms`;

interface Theme {
  colors: {
    body: {
      background: string;
      // surface: string;
      border: string;
      text: string;
    };
    primary: {
      main: string;
      alt: string;
      text: string;
    };
    secondary: {
      main: string;
      alt: string;
      text: string;
    };
    danger: {
      main: string;
      alt: string;
      text: string;
    };
  };
  spacing: {
    '0.125': Spacing; // 0.125rem
    '0.25': Spacing; // 0.25rem
    '0.5': Spacing; // 0.5rem
    '1': Spacing; // 1rem
    '2': Spacing; // 2rem
    '4': Spacing; // 4rem
    '8': Spacing; // 8rem
  };
  borderRadius: {
    S: BorderRadius; // 4px
    M: BorderRadius; // 8px
    L: BorderRadius; // 16px
  };
  transition: {
    duration: {
      S: TransitionDuration; // 100ms
      M: TransitionDuration; // 200ms
      L: TransitionDuration; // 300ms
    };
  };
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

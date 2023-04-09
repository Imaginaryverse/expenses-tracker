import { scrollbarStyle } from '@src/style/css';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

type PageProps = {
  children: React.ReactNode | React.ReactNode[];
};

const StyledPage = styled.main`
  width: 100%;
  max-width: 1440px;
  height: 100%;
  padding: 0 2.5% 2.5rem 2.5%;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  ${scrollbarStyle}
`;

export const Page: FunctionComponent<PageProps> = ({ children }) => {
  return <StyledPage>{children}</StyledPage>;
};

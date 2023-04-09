import { NavBar } from '@src/components/NavBar/NavBar';
import { Page } from '@src/components/Page/Page';
import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.body.background};
`;

export const Layout: FunctionComponent = () => {
  return (
    <StyledApp>
      <NavBar />
      <Page>
        <Outlet />
      </Page>
    </StyledApp>
  );
};

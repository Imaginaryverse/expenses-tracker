import { FunctionComponent, useEffect, useState } from 'react';
import { focusStyle } from '@src/style/css';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { SlideInModal } from '../common/SlideInModal/SlideInModal';
import styled from 'styled-components';
import { useWindowSize } from '../hooks';

enum Routes {
  HOME = '/',
  FIXED_EXPENSES = '/fixed_expenses',
  VARIABLE_EXPENSES = '/variable_expenses',
}

const StyledNavBar = styled.nav`
  width: 100%;
  max-width: 1440px;
  height: 5rem;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2.5%;

  padding: 0 2.5%;

  background-color: ${({ theme }) => theme.colors.body.background};
`;

const StyledNavList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2.5%;

  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const StyledNavListItem = styled.li`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.body.text};

  text-decoration: none;

  transition: all ${({ theme }) => theme.transition.duration.M} ease-in-out;

  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 0.125rem;
    background-color: ${({ theme }) => theme.colors.primary.main};
    transition: all ${({ theme }) => theme.transition.duration.L} ease-in-out;

    opacity: 0;
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary.main};

    &::after {
      width: 100%;
      opacity: 1;
    }
  }

  &:hover {
    &:not(.active) {
      &::after {
        width: 100%;

        background-color: ${({ theme }) => theme.colors.body.text};
        opacity: 1;
      }
    }
  }

  &:focus {
    ${focusStyle}
  }

  &:visited {
    &:not(.active) {
      color: ${({ theme }) => theme.colors.body.text};
    }
  }
`;

export const NavBar: FunctionComponent = () => {
  const { width } = useWindowSize();
  const { pathname } = useLocation();
  const [openHambugerMenu, setOpenHambugerMenu] = useState(false);

  useEffect(() => {
    if (!width) {
      return;
    }

    if (width > 768 && openHambugerMenu) {
      setOpenHambugerMenu(false);
    }
  }, [width]);

  return (
    <StyledNavBar>
      <StyledNavList>
        {Object.entries(Routes).map(([key, value]) => {
          const isActive = pathname === value;
          const title = key.replace('_', ' ');

          return (
            <StyledNavListItem key={key}>
              <StyledNavLink to={value} className={isActive ? 'active' : ''}>
                {title}
              </StyledNavLink>
            </StyledNavListItem>
          );
        })}
      </StyledNavList>

      <StyledHamburgerBtn
        onClick={() => setOpenHambugerMenu(!openHambugerMenu)}
      >
        <StyledHamburgerIcon className={openHambugerMenu ? 'open' : ''} />
        <StyledHamburgerIcon className={openHambugerMenu ? 'open' : ''} />
        <StyledHamburgerIcon className={openHambugerMenu ? 'open' : ''} />
      </StyledHamburgerBtn>

      {openHambugerMenu && (
        <SlideInModal
          title='Navigation'
          onClose={() => setOpenHambugerMenu(false)}
          from='left'
        >
          <StyledHamburgerMenu>
            <StyledHamburgerMenuList>
              {Object.entries(Routes).map(([key, value]) => {
                const isActive = pathname === value;
                const title = key.replace('_', ' ');

                return (
                  <StyledHamburgerMenuListItem key={key}>
                    <StyledNavLink
                      to={value}
                      className={isActive ? 'active' : ''}
                      onClick={() => setOpenHambugerMenu(false)}
                    >
                      {title}
                    </StyledNavLink>
                  </StyledHamburgerMenuListItem>
                );
              })}
            </StyledHamburgerMenuList>
          </StyledHamburgerMenu>
        </SlideInModal>
      )}
    </StyledNavBar>
  );
};

const StyledHamburgerMenu = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  background-color: ${({ theme }) => theme.colors.body.background};
`;

const StyledHamburgerBtn = styled.button`
  position: relative;
  width: 2rem;
  height: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  background-color: transparent;
  border: none;
  outline: none;

  cursor: pointer;

  &:hover {
    & > div {
      background-color: ${({ theme }) => theme.colors.primary.main};
    }
  }

  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const StyledHamburgerIcon = styled.div`
  position: absolute;
  width: 100%;
  height: 0.125rem;

  background-color: ${({ theme }) => theme.colors.body.text};
  border-radius: 0.5rem;

  transition: all ${({ theme }) => theme.transition.duration.M} ease-in-out;

  &:nth-child(1) {
    transform: translateY(-0.5rem);
  }

  &:nth-child(2) {
    transform: translateY(0);
  }

  &:nth-child(3) {
    transform: translateY(0.5rem);
  }

  &.open {
    &:nth-child(1) {
      transform: rotate(45deg) translateY(0);
      transform-origin: center;
    }

    &:nth-child(2) {
      opacity: 0;
    }

    &:nth-child(3) {
      transform: rotate(-45deg) translateY(0);
      transform-origin: center;
    }
  }
`;

const StyledHamburgerMenuList = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2.5%;
  padding: 5%;
  background-color: ${({ theme }) => theme.colors.primary.alt};

  z-index: 100;

  transition: all ${({ theme }) => theme.transition.duration.M} ease-in-out;
`;

const StyledHamburgerMenuListItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

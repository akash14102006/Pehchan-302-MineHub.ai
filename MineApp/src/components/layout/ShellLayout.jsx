import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import SideBar from './SideBar';
import ContextBar from './ContextBar';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f4f4f4;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const MainContent = styled.main`
  margin-left: 85px;
  width: calc(100% - 85px);
  min-height: 100vh;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

const ShellLayout = () => {
  return (
    <Container>
      <TopNavBar />
      <ContentWrapper>
        <SideBar />
        <MainContent>
          <ContextBar />
          <Outlet />
        </MainContent>
      </ContentWrapper>
    </Container>
  );
};

export default ShellLayout;

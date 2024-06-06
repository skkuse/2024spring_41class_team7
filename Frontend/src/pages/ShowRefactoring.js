import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import Header from '../components/Header';

const buttonColor = '#1A4D2E';
const titleColor = '#4F6F52';
const layerColor1 = '#F5EFE6';
const layerColor2 = '#E8DFCA';
const backColor = '#FFFFFF';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Container = styled.div` 
  display: flex;
  flex-direction: column;
  background: transparent;
  margin: 1vh;
  width: 80%;
  align-items: center;
  min-height: calc(100vh - 80px);
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 10px 0;
  border-radius: 10px;
  width: 100%;
`;

const FormContainer = styled.div`
  background-color: ${layerColor1};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 50%;
  margin-right: 40px;
  text-align: center;
  margin-right: 20px;
  text-align: center;
  
  &:last-child {
    margin-right: 0;
  }
`;

const HeaderBox = styled.div`
  background-color: ${layerColor1};
  font-size: 50px;
  font-weight: bold;
  width: 100%;
  height: 100px;
  line-height: 100px;
  color: ${titleColor};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-indent: 50px;
  margin-bottom: 20px;
  position: relative;
`;

const SubTitle = styled.h2`
  font-size: 40px;
  font-weight: bold;
  color: ${titleColor};
  margin: 50px;
`;

const ShowCode = styled.div`
    width: 90%;
    margin-left: 5%;
    margin-bottom: 30px;
    min-height: calc(100vh - 80px);
    background-color: ${backColor};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  width: 20%;
  height: 60px;
  border-radius: 5px;
  background-color: ${buttonColor};
  color: white;
  font-size: 20px;
  border: none;
  cursor: pointer;
  margin-left: 500px;
  margin-top: 20px;
  position: absolute;

  &:hover {
    background-color: #45a049;
  }
`;

function ShowRefactoring() {


  return (
    <Wrapper>
      <Container>
        <Header />
        <HeaderBox>
          Green Coders
          <Button>Code analysis</Button>
        </HeaderBox>
        <Box>
          <FormContainer>
            <SubTitle>User Code</SubTitle>
            <ShowCode></ShowCode>
          </FormContainer>
          <FormContainer>
            <SubTitle>Green Code</SubTitle>
            <ShowCode></ShowCode>
          </FormContainer>
        </Box>
      </Container>
    </Wrapper>
  );
}

export default ShowRefactoring;
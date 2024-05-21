import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';

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
  justify-content: center;
  display: flex; 
  align-items: flex-start;
  background-color: ${backColor};
  min-height: calc(100vh - 80px);
  margin-top: 80px;
  width: 80%;
`;

const FormContainer = styled.div`
  background-color: ${layerColor1};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 50%;
  margin-right: 40px;
  text-align: center;
  width: 50%; 
  margin-right: 20px;
  text-align: center;
  
  &:last-child {
    margin-right: 0;
  }
`;

const Header = styled.div`
  background-color: ${layerColor1};
  font-size: 50px;
  font-weight: bold;
  width: 80%;
  height: 100px;
  line-height: 100px;
  color: ${titleColor};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-indent: 50px;
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

function ShowRefactoring() {



    return (
        <Wrapper>
            <Header>Green Coders</Header>
            <Container>
                <FormContainer>
                    <SubTitle>User Code</SubTitle>
                    <ShowCode></ShowCode>
                </FormContainer>
                <FormContainer>
                    <SubTitle>Green Code</SubTitle>
                    <ShowCode></ShowCode>
                </FormContainer>
            </Container>
        </Wrapper>
    );
}

export default ShowRefactoring;
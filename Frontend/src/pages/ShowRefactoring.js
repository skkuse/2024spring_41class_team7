import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
  margin-right: 20px;
  position: relative;

  &:last-child {
    margin-right: 0;
  }
`;

const HeaderBox = styled(Link)`
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
  text-decoration-line: none;
`;

const SubTitle = styled.h2`
  font-size: 40px;
  font-weight: bold;
  color: ${titleColor};
  margin: 50px;
  text-align: center;
`;

const ShowCode = styled.div`
  width: 80%;
  margin-left: 5%;
  margin-bottom: 30px;
  min-height: calc(100vh - 80px);
  background-color: ${backColor};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  white-space: pre;
  padding: 25px;
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
  position: absolute;
  right: 185px;
  top: 125px;

  &:hover {
    background-color: #45a049;
  }
`;

function ShowRefactoring() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userCode, setUserCode] = useState('');
  const [greenCode, setGreenCode] = useState('');
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const buggyCodeId = queryParams.get('buggyCodeId');
  const fixedCodeText = queryParams.get('fixedCodeText');

  useEffect(() => {
    if (fixedCodeText) {
      setGreenCode(fixedCodeText);
    }
  }, [fixedCodeText]);

  useEffect(() => {
    if (buggyCodeId) {
      fetch(`/api/buggyCodes/${buggyCodeId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.status === 'success') {
            setUserCode(data.onSuccess.code_text);
            if (!fixedCodeText) {
              setGreenCode(data.onSuccess.fixed_code || '');
            }
          } else {
            throw new Error(data.onError.message || 'Error fetching code data');
          }
        })
        .catch(error => {
          console.error('Fetch error:', error);
          setError(error.message);
        });
    }
  }, [buggyCodeId, fixedCodeText]);

  const handleCodeConversion = () => {
    navigate('/resultpage', { state: { codeId: buggyCodeId, fixedText: greenCode } });
  };

  return (
    <Wrapper>
      <Container>
        <Header />
        <HeaderBox to="/">Green Coders</HeaderBox>
        <Button onClick={handleCodeConversion}>Code analysis</Button>
        <Box>
          <FormContainer>
            <SubTitle>User Code</SubTitle>
            <ShowCode>{userCode}</ShowCode>
          </FormContainer>
          <FormContainer>
            <SubTitle>Green Code</SubTitle>
            <ShowCode>{greenCode}</ShowCode>
          </FormContainer>
        </Box>
        {error && <div>Error: {error}</div>}
      </Container>
    </Wrapper>
  );
}

export default ShowRefactoring;
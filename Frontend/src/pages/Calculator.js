import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';

const buttonColor = '#1A4D2E';
const titleColor = '#4F6F52';
const layerColor1 = '#F5EFE6';
const layerColor2 = '#E8DFCA';
const backColor = '#FFFFFF';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #fff;
  flex-direction: column;
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
  width: 70%;
  margin-right: 20px;
  text-align: center;
  box-sizing: border-box;
`;

const SettingsContainer = styled.div`
  background-color: ${layerColor1};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 30%;
  height: auto;
  box-sizing: border-box;
`;


const InputSection = styled.div`
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 90%;
  height: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
`;

const SettingItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  flex-grow: 1;
  line-height: 35px;
  margin-left: 10px;
`;

const Input = styled.input`
  width: 50px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-right: 10px;
`;

const Button = styled.button`
  width: 90%;
  padding: 10px;
  margin-left: 5%;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: ${buttonColor};
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: #45a049;
  }
`;

const SubTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  color: ${titleColor};
  margin: 20px;
`;

const SubTitle2 = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: ${titleColor};
  margin: 20px;
  margin-bottom: 30px;
  text-align: center;
`;

const Button2 = styled.button`
  margin: 10px;
  margin-bottom: 20px;
  width: 80px;
  height: 30px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  line-height: 30px;
  background-color: ${({ selected }) => (selected ? buttonColor : backColor)};
  color: ${({ selected }) => (selected ? backColor : "#000")};
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Button3 = styled.button`
  margin: 5px;
  width: 50px;
  height: 30px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  line-height: 30px;
  background-color: ${({ selected }) => (selected ? buttonColor : backColor)};
  color: ${({ selected }) => (selected ? backColor : "#000")};
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

function Calculator() {
  const [code, setCode] = useState('');
  const [cpu, setCPU] = useState('');
  const [cores, setCores] = useState(0);
  const [memory, setMemory] = useState(0);
  const [visibility, setVisibility] = useState('private');
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      alert('Please enter your Java code.');
      return;
    }
    if (!['Low', 'Mid', 'High'].includes(cpu)) {
      alert('Please select a valid CPU specification.');
      return;
    }
    const data = { java_code: code, cpu, cores, memory, visibility };
    console.log(data);  // 데이터 형식을 확인하기 위한 로그 출력
    const response = await fetch('/api/calculate/carbon-emission/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error:', errorData);
    } else {
      const responseData = await response.json();
      setResult(responseData.carbon_emission);
    }
  };
  useEffect(() => {
    if (result !== null) {
      console.log(result); //탄소배출량 결과
      navigate('/showrefactoring');
    }
  }, [result, navigate]);

  return (
    <Wrapper>
      <Container>
        <Header />
        <HeaderBox>Green Coders</HeaderBox>
        <Box>
          <FormContainer>
            <SubTitle>Input Code</SubTitle>
            <Button2 selected={visibility === 'public'} onClick={() => setVisibility('public')}>Public</Button2>
            <Button2 selected={visibility === 'private'} onClick={() => setVisibility('private')}>Private</Button2>
            <InputSection>
              <TextArea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter your Java code here"
              />
            </InputSection>
          </FormContainer>
          <SettingsContainer>
            <SubTitle2>Details about your algorithm</SubTitle2>
            <SettingItem>
              <Label>CPU specification</Label>
              <Button3 selected={cpu === 'Low'} onClick={() => setCPU('Low')}>Low</Button3>
              <Button3 selected={cpu === 'Mid'} onClick={() => setCPU('Mid')}>Mid</Button3>
              <Button3 selected={cpu === 'High'} onClick={() => setCPU('High')}>High</Button3>
            </SettingItem>
            <SettingItem>
              <Label>Number of cores</Label>
              <Input type="number" value={cores} onChange={(e) => setCores(parseInt(e.target.value))} />
            </SettingItem>
            <SettingItem>
              <Label>Memory available (in GB)</Label>
              <Input type="number" value={memory} onChange={(e) => setMemory(parseInt(e.target.value))} />
            </SettingItem>
            <Button onClick={handleSubmit}>Run</Button>
          </SettingsContainer>
        </Box>
      </Container>
    </Wrapper>
  );
}

export default Calculator;

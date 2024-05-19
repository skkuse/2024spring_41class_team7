import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  background-color: #f3f3f3;
  height: calc(100vh - 80px);
`;

const FormContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 600px;
  margin-right: 40px;
`;

const InputSection = styled.div`
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 95%;
  height: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
`;

const SettingsContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const SettingItem = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: #45a049;
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #e8f5e9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

function CalculatorForm() {
  const [code, setCode] = useState('');
  const [t, setT] = useState(0);
  const [nc, setNc] = useState(0);
  const [nm, setNm] = useState(0);
  const [uc, setUc] = useState(0);
  const [Pc, setPc] = useState(0);
  const [Pm, setPm] = useState(0);
  const [PUE, setPUE] = useState(0);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { java_code: code, t, nc, nm, uc, Pc, Pm, PUE };
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

  return (
    <Container>
      <FormContainer>
        <h2>Input Code</h2>
        <InputSection>
          <TextArea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your Java code here"
          />
        </InputSection>
        {result && (
          <ResultContainer>
            <h3>Carbon Emission</h3>
            <p>{result} kg CO2</p>
          </ResultContainer>
        )}
      </FormContainer>
      <SettingsContainer>
        <h2>환경 설정</h2>
        <SettingItem>
          <Label>Running time (hours)</Label>
          <Input type="number" value={t} onChange={(e) => setT(parseFloat(e.target.value))} />
        </SettingItem>
        <SettingItem>
          <Label>Number of cores</Label>
          <Input type="number" value={nc} onChange={(e) => setNc(parseInt(e.target.value))} />
        </SettingItem>
        <SettingItem>
          <Label>Memory available (GB)</Label>
          <Input type="number" value={nm} onChange={(e) => setNm(parseInt(e.target.value))} />
        </SettingItem>
        <SettingItem>
          <Label>Core usage factor</Label>
          <Input type="number" value={uc} onChange={(e) => setUc(parseFloat(e.target.value))} />
        </SettingItem>
        <SettingItem>
          <Label>Power draw of a computing core (Watt)</Label>
          <Input type="number" value={Pc} onChange={(e) => setPc(parseFloat(e.target.value))} />
        </SettingItem>
        <SettingItem>
          <Label>Power draw of memory (Watt)</Label>
          <Input type="number" value={Pm} onChange={(e) => setPm(parseFloat(e.target.value))} />
        </SettingItem>
        <SettingItem>
          <Label>PUE (efficiency coefficient)</Label>
          <Input type="number" value={PUE} onChange={(e) => setPUE(parseFloat(e.target.value))} />
        </SettingItem>
        <Button onClick={handleSubmit}>Run</Button>
      </SettingsContainer>
    </Container>
  );
}

export default CalculatorForm;

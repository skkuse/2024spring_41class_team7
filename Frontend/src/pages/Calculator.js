import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

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
  text-decoration-line: none;
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

const StyledModal = styled(Modal)`
  &.ReactModal__Overlay {
    background-color: rgba(0, 0, 0, 0.5) !important;
  }
  &.ReactModal__Content {
    inset: 40px !important;
    border: none !important;
    border-radius: 10px !important;
    padding: 0 !important;
    max-width: 500px;
    margin: auto;
    margin-top: 200px;
  }
`;

const ModalContent = styled.div`
  background: #F5EFE6;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  margin: 0 auto;
`;

const ModalButton = styled.button`
  background-color: #4F6F52;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: #fff;
  width: 70px;
  height: 40px;
  margin-left: 370px;
  margin-bottom: 20px;
  &:hover {
    background-color: #45a049;
  }
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin-left: 20px;
  padding-top: 20px;
`;

const Box2 = styled.div`
  width: 100%;
  height: 60%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Contents = styled.p`
  margin: 20px;
  color: red;
  font-size: 13px;
`;

const Toptitle = styled.h1`
  font-weight: bold;
  margin: 20px;
`;

function Calculator() {
  const [code, setCode] = useState('');
  const [cpu, setCPU] = useState('');
  const [cores, setCores] = useState(0);
  const [memory, setMemory] = useState(0);
  const [visibility, setVisibility] = useState('private');
  const [result, setResult] = useState(null);
  const [buggyCodeId, setBuggyCodeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


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
    console.log(data);
    try {
      const response = await fetch('/api/calculate/carbon-emission/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error:', errorText);
        setIsModalOpen(true);
      } else {
        const responseData = await response.json();
        console.log("abc",responseData);
        setResult(responseData.carbon_emission);

        const buggyCodeData = {
          code_text: code,
          fixed_code_text: 'null',
          emission_amount: responseData.carbon_emission,
          core_type: cpu,
          core_model: 'default',
          core_num: cores,
          memory: memory,
        };

        const buggyCodeResponse = await fetch('/api/buggyCodes/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(buggyCodeData),
        });
        let id = null;
        if (!buggyCodeResponse.ok) {
          const errorText = await buggyCodeResponse.text();
          console.error('Error saving buggy code:', errorText);
          setIsModalOpen(true);
        } else {
          const buggyResponseData = await buggyCodeResponse.json();
          console.log('Result:', buggyResponseData);

          if (buggyResponseData.status === 'success') {
            id = buggyResponseData.onSuccess.buggy_code_id;
            setBuggyCodeId(id);
          } else {
            console.error('Error:', buggyResponseData.onError);
          }
        }

        const refactorResponse = await fetch('http://localhost:8080/refactoring/all', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: buggyCodeData.code_text,
        });
        if (!refactorResponse.ok) {
          const errorText = await refactorResponse.text();
          console.error('Error refactoring code:', errorText);
          setIsModalOpen(true);
        } else {
          const fixedData = await refactorResponse.json();
          console.log('result: ', fixedData.fixedCodeText);

          const text = fixedData.fixedCodeText.replace(/Fixed/g, 'Buggy');
          const fixedCodeData = {
            java_code: text,
            cpu,
            cores,
            memory,
            visibility,
          };

          const fixedEmissionResponse = await fetch('/api/calculate/carbon-emission/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(fixedCodeData),
          });
          if (!fixedEmissionResponse.ok) {
            const errorText = await fixedEmissionResponse.text();
            console.error('Error calculating fixed code emission:', errorText);
            return;
          }
          const fixedEmissionData = await fixedEmissionResponse.json();

          const reducedAmount = responseData.carbon_emission - fixedEmissionData.carbon_emission;
          const reducedRate = (reducedAmount / responseData.carbon_emission) * 100;
          console.log('reducedAmount', reducedAmount);
          console.log('reducedRate', reducedRate);

          const refactoringIds = [1, 2, 3];
          for (const refactoringId of refactoringIds) {
            const refactorPartResponse = await fetch(`http://localhost:8080/refactoring/${refactoringId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: buggyCodeData.code_text,
            });

            if (!refactorPartResponse.ok) {
              const errorText = await refactorPartResponse.text();
              console.error(`Error refactoring code for id ${refactoringId}:`, errorText);
              continue;
            } else {
              const fixed = await refactorPartResponse.json();
              console.log('result: ', fixed);
              console.log('id', id);
              console.log('fixed', fixed.entireCode);
              for (let i = 0; i < fixed.buggyParts.length; i++) {
                const postData = {
                  buggy_part: fixed.buggyParts[i],
                  fixed_part: fixed.fixedParts[i],
                  reduced_amount: reducedAmount,
                  reduced_rate: reducedRate,
                  buggy_code_id: id,
                  fix_strategy_id: refactoringId,
                  fixed_code_text: fixed.entireCode,
                };
                console.log(postData);
                const postResponse = await fetch('/api/fixedCodes/', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(postData),
                });

                if (!postResponse.ok) {
                  const errorText = await postResponse.text();
                  console.error(`Error posting fixed code for strategy ${refactoringId}:`, errorText);
                  console.log(postResponse);
                } else {
                  console.log(`Successfully posted fixed code for strategy ${refactoringId}`);
                }
              }
            }
          }

          navigate(`/showrefactoring?buggyCodeId=${id}&fixedCodeText=${encodeURIComponent(fixedData.fixedCodeText)}`);
        }
      }
    } catch (error) {
      setIsModalOpen(true);
      console.error('Unexpected error:', error);
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };



  return (
    <Wrapper>
      <Container>
        <Header />
        <HeaderBox to="/">Green Coders</HeaderBox>
        <Box>
          <FormContainer>
            <SubTitle>Input Code</SubTitle>

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
      <StyledModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Error Modal"
      >
        <ModalContent>
          <Toptitle>Error!</Toptitle>
          <Box2>
            <Title>실행되는 자바코드를 넣어주세요!</Title>
            <Contents>* 클래스 이름을 Buggy으로 해주세요.</Contents>
            <Contents>* 오타가 없는지 확인해주세요.</Contents>
            <ModalButton onClick={closeModal}>Close</ModalButton>
          </Box2>
        </ModalContent>
      </StyledModal>
    </Wrapper>
  );
}

export default Calculator;

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import Plotly from 'plotly.js-dist';
import Header from '../components/Header';
import { useNavigate, useLocation, Link } from 'react-router-dom';

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


const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background: transparent;
  margin: 1vh;
  width: 80%;
  align-items: center;
`;

const FirstBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background-color: #F5EFE6;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-indent: 50px;
  margin-bottom: 20px;
`;

const FirstBoxLeft = styled(Link)`
  color: #4F6F52;
  font-size: 50px;
  font-weight: bold;
  text-decoration-line: none;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  border-radius: 10px;
  width: 100%;
`;

const InnerBoxLeft = styled.div`
  margin: 0 10px 0 0;
  padding: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  width: 60%;
  height: 100%;
  background-color: #F5EFE6;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InnerBoxLeftHeader = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: left;
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  height: 15%;
  margin-left: 30px;
`;

const InnerBoxLeftContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
`;

const CarbonPrintBox1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #FFF;
  width: 100%;
  margin: 5px;
`;

const CarbonPrintBox2 = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #FFF;
  width: 100%;
  height: 250px;
  margin: 5px;
  margin-bottom: 40px;
`;

const ValueBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #FFF;
  width: 100%;
  height: 100px;
`;
const Value = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
    height: 70%;
`;

const Explain = styled.div`
    font-size:17px;
    height: 50px;
    height: 20%;
`;

const InnerBoxRight = styled.div`
  margin: 0 0 0 10px;
  padding: 10px;
  background: #e0e0e0;
  border-radius: 10px;
  width: 40%;
  height: 100%;
  background-color: #F5EFE6;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InnerBoxRightHeader = styled.div`
  display: flex;
  font-size: 25px;
  font-weight: bold;
  justify-content: left;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin: 20px;
`;

const InnerBoxRightContents = styled.div`
  display: flex;
  font-size: 17px;
  justify-content: space-between;
  width: 100%;
  padding: 7px 10px;
  box-sizing: border-box;
`;

const InnerBoxRightSubContents = styled.div`
`;

const LastBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  border-radius: 10px;
  width: 100%;
  background-color: #F5EFE6;
  height: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const BoxHeader = styled.div`
  display: flex;
  font-size: 30px;
  font-weight: bold;
  justify-content: left;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin: 30px;
`;

function ResultPage() {
  const location = useLocation();
  const { codeId, fixedText } = location.state || {};

  const [userCode, setUserCode] = useState('');
  const [originEmission, setOriginEmission] = useState(null);
  const [afterEmission, setAfterEmission] = useState(null);
  const [percentageEmission, setPercentageEmission] = useState(null);
  const [originEmissionRaw, setOriginEmissionRaw] = useState(null);
  const [afterEmissionRaw, setAfterEmissionRaw] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (codeId) {
        try {
          const response = await fetch(`/api/buggyCodes/${codeId}`);
          const data = await response.json();

          if (data.status === 'success') {
            const { code_text: codeText, core_type: coreType, core_num: coreNum, memory: memory } = data.onSuccess;
            setUserCode(codeText);
            console.log(coreType, coreNum, memory);

            const calculateEmission = async (code) => {
              const postData = {
                java_code: code,
                cpu: coreType,
                cores: coreNum,
                memory: memory,
                visibility: 'public',
              };

              try {
                const response = await fetch('/api/calculate/carbon-emission/', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(postData),
                });

                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }

                const responseData = await response.json();
                return responseData.carbon_emission;
              } catch (error) {
                console.error('Error calculating carbon emission:', error);
                setError(error.message);
                return null;
              }
            };

            const userEmission = await calculateEmission(codeText);
            if (userEmission !== null) {
              const userEmissionRounded = userEmission.toFixed(4) + 'g';
              setOriginEmission(userEmissionRounded);
              setOriginEmissionRaw(userEmission);
            }

            if (fixedText) {
              const buggyText = fixedText.replace(/Fixed/g, 'Buggy');
              const greenEmission = await calculateEmission(buggyText);
              if (greenEmission !== null) {
                const greenEmissionRounded = greenEmission.toFixed(4) + 'g';
                setAfterEmission(greenEmissionRounded);
                setAfterEmissionRaw(greenEmission);

                if (userEmission !== null && greenEmission !== null) {
                  const improvementPercentage = ((userEmission - greenEmission) / userEmission) * 100;
                  setPercentageEmission(improvementPercentage.toFixed(2) + '%');
                }
              }
            }
          } else {
            throw new Error(data.onError.message || 'Error fetching code data');
          }
        } catch (error) {
          console.error('Fetch error:', error);
          setError(error.message);
        }
      }
    };

    fetchData();
  }, [codeId, fixedText]);

  const savedCarbonEmission = originEmissionRaw && afterEmissionRaw ? (originEmissionRaw - afterEmissionRaw) : null;


  return (
    <Wrapper>
    <Container>
      <Header />
      <FirstBox>
        <FirstBoxLeft to="/">Green Coders</FirstBoxLeft>
      </FirstBox>
      <Box>
        <InnerBoxLeft>
          <InnerBoxLeftHeader>Carbon footprint</InnerBoxLeftHeader>
          <InnerBoxLeftContents>
            <CarbonPrintBox1>
              <img src="./img/flash.png" alt="Earth" id="flash"></img>
              <ValueBox><Value>{savedCarbonEmission ? (savedCarbonEmission * 1000 / 3600).toFixed(4) + ' Wh' : '-'}</Value><Explain>Energy needed</Explain></ValueBox>
            </CarbonPrintBox1>
            <CarbonPrintBox1>
              <img src="./img/CO2.png" alt="Earth" id="CO2"></img>
              <ValueBox><Value>{savedCarbonEmission ? savedCarbonEmission.toFixed(4) + 'g CO2e' : '-'}</Value><Explain>Carbon footprint</Explain></ValueBox>
            </CarbonPrintBox1>
          </InnerBoxLeftContents>
          <InnerBoxLeftContents>
            <CarbonPrintBox2>
              <img src="./img/tree.png" alt="Earth" id="tree"></img>
              <ValueBox><Value>{savedCarbonEmission ? (savedCarbonEmission / 22).toFixed(4) + ' tree-months' : '-'}</Value><Explain>Carbon sequestration</Explain></ValueBox>
            </CarbonPrintBox2>
            <CarbonPrintBox2>
              <img src="./img/car.png" alt="Earth" id="car"></img>
              <ValueBox><Value>{savedCarbonEmission ? (savedCarbonEmission * 1000 / 192).toFixed(4) + ' m' : '-'}</Value><Explain>In a passenger car</Explain></ValueBox>
            </CarbonPrintBox2>
            <CarbonPrintBox2>
              <img src="./img/aircraft.png" alt="Earth" id="aircraft"></img>
              <ValueBox><Value>{savedCarbonEmission ? (savedCarbonEmission / 1000).toFixed(6) + '%' : '-'}</Value><Explain>Of a flight Paris-London</Explain></ValueBox>
            </CarbonPrintBox2>
          </InnerBoxLeftContents>
        </InnerBoxLeft>
        <InnerBoxRight>
          <InnerBoxRightHeader>
            분석 결과
          </InnerBoxRightHeader>
          <InnerBoxRightContents>
            <InnerBoxRightSubContents>기존 코드 탄소 발생</InnerBoxRightSubContents>
            <InnerBoxRightSubContents>{originEmission}</InnerBoxRightSubContents>
          </InnerBoxRightContents>
          <InnerBoxRightContents>
            <InnerBoxRightSubContents>수정된 코드 탄소 발생</InnerBoxRightSubContents>
            <InnerBoxRightSubContents>{afterEmission}</InnerBoxRightSubContents>
          </InnerBoxRightContents>
          <InnerBoxRightContents>
            <InnerBoxRightSubContents>에너지 소비 개선</InnerBoxRightSubContents>
            <InnerBoxRightSubContents>{percentageEmission}</InnerBoxRightSubContents>
          </InnerBoxRightContents>
        </InnerBoxRight>
      </Box>
    </Container>
  </Wrapper>
  )
}

export default ResultPage;
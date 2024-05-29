import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Plotly from 'plotly.js-dist';


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
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #F5EFE6;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
`;

const FirstBoxLeft = styled.div`
  color: #4F6F52;
  font-size: 50px;
  font-weight: bold;
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
`;
const Value = styled.div`
    font-size:20px;
    font-weight:bold;
    margin-bottom: 15px;
`;

const Explain = styled.div`
    font-size:17px;
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
`;

const InnerBoxRightHeader = styled.div`
  display: flex;
  font-size: 25px;
  font-weight: bold;
  justify-content: left;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
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
`;

const BoxHeader = styled.div`
  font-size: 35px;
  font-weight: bold;
  text-align: left;
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  height: 15%;
  margin-left: 30px;
`;

function ResultPage(){

    return(
        <Wrapper>
            <Container>
                <FirstBox>
                    <FirstBoxLeft>Green Coders</FirstBoxLeft>
                </FirstBox>
                <Box>
                    <InnerBoxLeft>
                        <InnerBoxLeftHeader>Carbon footprint</InnerBoxLeftHeader>
                        <InnerBoxLeftContents>
                            <CarbonPrintBox1>
                                <img src="./img/flash.png" alt="Earth" id="flash"></img>
                                <ValueBox><Value>2.28 kWh</Value><Explain>Energy needed</Explain></ValueBox>
                            </CarbonPrintBox1>
                            <CarbonPrintBox1>
                                <img src="./img/co2.png" alt="Earth" id="co2"></img>
                                <ValueBox><Value>948.13g CO2e</Value><Explain>Carbon footprint</Explain></ValueBox>
                            </CarbonPrintBox1>
                        </InnerBoxLeftContents>
                        <InnerBoxLeftContents>
                            <CarbonPrintBox2>
                                <img src="./img/tree.png" alt="Earth" id="tree"></img>
                                <ValueBox><Value>1.03 tree-months</Value><Explain>Carbon sequestration</Explain></ValueBox>
                            </CarbonPrintBox2>
                            <CarbonPrintBox2>
                                <img src="./img/car.png" alt="Earth" id="car"></img>
                                <ValueBox><Value>1.45 km</Value><Explain>In a passenger car</Explain></ValueBox>
                            </CarbonPrintBox2>
                            <CarbonPrintBox2>
                                <img src="./img/aircraft.png" alt="Earth" id="aircraft"></img>
                                <ValueBox><Value>2%</Value><Explain>Of a flight Paris-London</Explain></ValueBox>
                            </CarbonPrintBox2>
                        </InnerBoxLeftContents>
                    </InnerBoxLeft>
                    <InnerBoxRight>
                        <InnerBoxRightHeader>
                            분석 결과
                        </InnerBoxRightHeader>
                        <InnerBoxRightContents>
                        <InnerBoxRightSubContents>기존 코드 탄소 발생</InnerBoxRightSubContents>
                        <InnerBoxRightSubContents>1398</InnerBoxRightSubContents>
                        </InnerBoxRightContents>
                        <InnerBoxRightContents>
                        <InnerBoxRightSubContents>수정된 코드 탄소 발생</InnerBoxRightSubContents>
                        <InnerBoxRightSubContents>600</InnerBoxRightSubContents>
                        </InnerBoxRightContents>
                        <InnerBoxRightContents>
                        <InnerBoxRightSubContents>에너지 소비 개선</InnerBoxRightSubContents>
                        <InnerBoxRightSubContents>13.98%</InnerBoxRightSubContents>
                        </InnerBoxRightContents>
                    </InnerBoxRight>
                </Box>
                <LastBox>
                    <BoxHeader>Code analysis</BoxHeader>
                </LastBox>
            </Container>
        </Wrapper>
    )
}

export default ResultPage;
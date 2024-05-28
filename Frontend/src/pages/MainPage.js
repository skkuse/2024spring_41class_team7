import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Plotly from 'plotly.js-dist';

const titleColor = '#1A4D2E';
const layerColor1 = '#1A4D2E';


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

const Header = styled.div`
  width: 105%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const HeaderBox = styled.div`
  font-weight: bold;
`;

const HeaderButton = styled.button`
  font-weight: bold;
  background-color: #FFF;
  border: none;
  &:hover {
    cursor: pointer;
  }
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
  box-sizing: border-box;
`;

const FirstBoxLeft = styled.div`
  color: #4F6F52;
  font-size: 30px;
  font-weight: bold;
`;

const FirstBoxRight = styled.button`
  color: #fff;
  background-color: #4F6F52;
  font-size: 20px;
  border-radius: 10px;
  padding: 8px 30px;
  border: none;
  &:hover {
    cursor: pointer;
    background-color: #0056B3;
  }
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
  font-size: 25px;
  font-weight: bold;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 15%;
`;

const InnerBoxLeftContents = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
`;

const SpaceImage = styled.img`
  position: absolute;
  transition: margin-left 0.2s;
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
  font-size: 20px;
  font-weight: bold;
  justify-content: left;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const InnerBoxRightContents = styled.div`
  display: flex;
  font-size: 15px;
  justify-content: space-between;
  width: 100%;
  padding: 7px 10px;
  box-sizing: border-box;
`;

const InnerBoxRightSubContents = styled.div`
`;

const GraphContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Graph = styled.div`
  width: 48%;
`;

const LastBox = styled.div`
  display: flex;
  justify-content: top;
  align-items: center;
  flex-direction: column;
  margin: 10px 0;
  border-radius: 10px;
  width: 100%;
  background-color: #F5EFE6;
  padding: 20px 0;
  margin-bottom: 50px;
  position: relative;
`;

const LastBoxHeader = styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  padding: 10px;
`;

const PatternBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  width: 90%;
  background-color: #E8DFCA;
  margin-top: 10px;
  position: relative;
`;

const PatternBoxHeader = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 10px;
`;

const LastBoxButton = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  color: #fff;
  background-color: #4F6F52;
  border: none;
  &:hover {
    cursor: pointer;
    background-color: #0056B3;
  }
`;

const SubPatternBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Before = styled.div`
  border-radius: 10px;
  width: 50%;
  background-color: #fff;
  margin-top: 10px;
  margin: 10px 10px 10px 20px;
  padding: 10px;
  height: 400px;
  overflow: auto;
`;

const After = styled.div`
  border-radius: 10px;
  width: 50%;
  background-color: #fff;
  margin-top: 10px;
  margin: 10px 20px 10px 10px;
  padding: 10px;
  height: 400px;
  overflow: auto;
`;

const Title = styled.div`
  padding: 10px;
`;

const CodeConternts = styled.div`
  font-size: 15px;
  text-align: left;
`;

function MainPage(){
  const graph1Ref = useRef(null);
  const graph2Ref = useRef(null);
  const innerBoxRightRef = useRef(null);
  const [beforeCode, setBeforeCode] = useState('Before Code');
  const [afterCode, setAfterCode] = useState('After Code');

  const resizeGraphs = () => {
    if (innerBoxRightRef.current) {
      const containerWidth = innerBoxRightRef.current.clientWidth / 2 - 10;

      const layout = {
        autosize: true,
        width: containerWidth,
        height: containerWidth,
        margin: {
          l: 20,
          r: 20,
          b: 20,
          t: 30,
          pad: 0
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
      };

      Plotly.newPlot(graph1Ref.current, [{
        x: ['A', 'B', 'C'],
        y: [10, 15, 13],
        type: 'bar'
      }], layout);

      Plotly.newPlot(graph2Ref.current, [{
        x: ['X', 'Y', 'Z'],
        y: [5, 10, 8],
        type: 'line'
      }], layout);
    }
  };

  useEffect(() => {
    resizeGraphs();
    window.addEventListener('resize', resizeGraphs);
    return () => window.removeEventListener('resize', resizeGraphs);
  }, []);

  return(
    <Wrapper>
      <Container>
        <Header>
          <HeaderBox>Green Coder</HeaderBox>
          <HeaderButton>About</HeaderButton>
        </Header>
        <FirstBox>
          <FirstBoxLeft>Green Coders</FirstBoxLeft>
          <FirstBoxRight>Green코드 변환하기</FirstBoxRight>
        </FirstBox>
        <Box>
          <InnerBoxLeft>
            <InnerBoxLeftHeader>Earth-Mars with green algorithm</InnerBoxLeftHeader>
            <InnerBoxLeftContents>
              <img src="./img/earth.png" alt="Earth" id="earth"></img>
              <SpaceImage src="./img/space.png" alt="Space" id="space" />
              <img src="./img/mars.png" alt="Mars" id="mars"></img>
            </InnerBoxLeftContents>
          </InnerBoxLeft>
          <InnerBoxRight ref={innerBoxRightRef}>
            <InnerBoxRightHeader>
              일간 통계
            </InnerBoxRightHeader>
            <InnerBoxRightContents>
              <InnerBoxRightSubContents>일일 방문자</InnerBoxRightSubContents>
              <InnerBoxRightSubContents>1398</InnerBoxRightSubContents>
            </InnerBoxRightContents>
            <InnerBoxRightContents>
              <InnerBoxRightSubContents>가장 많이 절약된 비율</InnerBoxRightSubContents>
              <InnerBoxRightSubContents>13.98%</InnerBoxRightSubContents>
            </InnerBoxRightContents>
            <InnerBoxRightContents>
              <InnerBoxRightSubContents>일일 방문자</InnerBoxRightSubContents>
              <InnerBoxRightSubContents>1398</InnerBoxRightSubContents>
            </InnerBoxRightContents>
            <GraphContainer>
              <graph ref={graph1Ref}></graph>
              <graph ref={graph2Ref}></graph>
            </GraphContainer>
          </InnerBoxRight>
        </Box>
        <LastBox>
          <LastBoxHeader>Best Refactoring Codes</LastBoxHeader>
          <PatternBox>
            <PatternBoxHeader>Green Pattern</PatternBoxHeader>
            <LastBoxButton>신고하기</LastBoxButton>
            <SubPatternBox>
              <Before>
                <Title>Before Code</Title>
                <CodeConternts>{beforeCode}</CodeConternts>
              </Before>
              <After>
                <Title>After Code</Title>
                <CodeConternts>{afterCode}</CodeConternts>
              </After>
            </SubPatternBox>
          </PatternBox>
        </LastBox>
      </Container>
    </Wrapper>
  )

}

export default MainPage;
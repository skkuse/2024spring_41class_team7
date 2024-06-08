import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import Plotly from 'plotly.js-dist';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Modal from 'react-modal';

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
  margin-bottom: 20px;
`;

const FirstBoxLeft = styled.div`
  color: #4F6F52;
  font-size: 50px;
  font-weight: bold;
  text-indent: 50px;
  cursor: pointer;
`;

const FirstBoxRight = styled.button`
  width: 250px;
  height: 50px;
  margin-right: 30px;
  color: #fff;
  background-color: #4F6F52;
  font-size: 20px;
  border-radius: 10px;
  padding: 8px 30px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InnerBoxRightHeader = styled.div`
  font-size: 25px;
  font-weight: bold;
  justify-content: left;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  margin-bottom: 20px;
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LastBoxHeader = styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  padding: 20px;
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
  margin-top: 30px;
  font-weight: bold;
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
  cursor: pointer;
  margin-top: 30px;
  &:hover {
    background-color: #45a049;
  }
`;

const SubPatternBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const Before = styled.div`
  border-radius: 10px;
  width: 50%;
  background-color: #fff;
  margin-top: 20px;
  margin: 10px 10px 10px 20px;
  padding: 10px;
  height: 400px;
  overflow: auto;
`;

const After = styled.div`
  border-radius: 10px;
  width: 50%;
  background-color: #fff;
  margin-top: 20px;
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

const ModalContent = styled.div`
  background: #F5EFE6;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  margin: 0 auto;
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
    margin-top: 80px;
  }
`;

const Button1 = styled.button`
  background-color: #4F6F52;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: #fff;
  width: 70px;
  height: 40px;
  margin-left: 300px;
  &:hover {
    background-color: #45a049;
  }
`;

const Button2 = styled.button`
  background-color: #45a049;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: #fff;
  width: 70px;
  height: 40px;
  margin-left: 15px;
  &:hover {
    background-color: #4F6F52;
  }
`;

const Toptitle = styled.h1`
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
`;

const TextArea = styled.textarea`
  width: 95%;
  height: 200px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
`;

function MainPage() {
  const graph1Ref = useRef(null);
  const graph2Ref = useRef(null);
  const innerBoxRightRef = useRef(null);
  const [beforeCode, setBeforeCode] = useState('Before Code');
  const [afterCode, setAfterCode] = useState('After Code');
  const navigate = useNavigate();
  const handleCodeConversion = () => {
    navigate('/calculator');
  };

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Wrapper>
      <Container>
        <Header />
        <FirstBox>
          <FirstBoxLeft>Green Coders</FirstBoxLeft>
          <FirstBoxRight onClick={handleCodeConversion}>
            Green코드 변환하기
          </FirstBoxRight>
        </FirstBox>
        <Box>
          <InnerBoxLeft>
            <InnerBoxLeftHeader>Earth - Mars with green algorithm</InnerBoxLeftHeader>
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
              <Graph ref={graph1Ref}></Graph>
              <Graph ref={graph2Ref}></Graph>
            </GraphContainer>
          </InnerBoxRight>
        </Box>
        <LastBox>
          <LastBoxHeader>Best Refactoring Codes</LastBoxHeader>
          <PatternBox>
            <PatternBoxHeader>Green Pattern</PatternBoxHeader>
            <LastBoxButton onClick={openModal}>신고하기</LastBoxButton>
            <StyledModal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
            >
              <ModalContent>
                <Toptitle>신고 사유</Toptitle><br />
                <form>
                  <TextArea></TextArea>
                </form>
                <Button1>신고하기</Button1>
                <Button2 onClick={closeModal}>닫기</Button2>
              </ModalContent>
            </StyledModal>
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
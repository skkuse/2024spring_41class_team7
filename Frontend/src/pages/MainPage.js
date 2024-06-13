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
  margin-top : 150px;
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
  height: 300px;
  overflow: auto;
`;

const After = styled.div`
  border-radius: 10px;
  width: 50%;
  background-color: #fff;
  margin-top: 20px;
  margin: 10px 20px 10px 10px;
  padding: 10px;
  height: 300px;
  overflow: auto;
`;

const Title = styled.div`
  padding: 10px;
`;

const CodeConternts = styled.div`
  font-size: 15px;
  text-align: left;
  display: flex;
  align-items: center; // 수직 가운데 정렬
  height: 60%; // 부모 요소의 전체 높이를 차지하도록 설정
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

const SelectWrapper = styled.div`
  position: relative;
  width: 110px;
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23525252" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-color: #f8f8f8;
`;

function MainPage() {
  const graph1Ref = useRef(null);
  const graph2Ref = useRef(null);
  const innerBoxRightRef = useRef(null);
  const [beforeCode, setBeforeCode] = useState('Before Code');
  const [afterCode, setAfterCode] = useState('After Code');
  const [fixed, setFixed] = useState(1);
  const [visitor, setVisitor] = useState(1398);
  const [ratio, setRatio] = useState('3%');
  const [amount, setAmount] = useState('0.03g');
  const imageContainerRef = useRef(null);
  const earthImageRef = useRef(null);
  const marsImageRef = useRef(null);
  const spaceImageRef = useRef(null);
  const [reducedAmount, setReducedAmount] = useState(0);
  const [reportDescription, setReportDescription] = useState(''); // 신고 내용
  const [selectedType, setSelectedType] = useState(1);
  const navigate = useNavigate();
  const handleCodeConversion = () => {
    navigate('/calculator');
  };

  // Graph1 데이터 가져오는 함수
  const fetchFixedCodesData = async () => {
    const response = await fetch('/api/fixedCodes');
    const data = await response.json();

    // 데이터 구조 확인을 위해 출력
    console.log("Fixed Codes Data:", data);

    // 데이터 구조에 맞게 카운트를 세는 로직
    const counts = { 1: 0, 2: 0, 3: 0 };

    // assuming data.onSuccess.items is an array
    data.onSuccess.items.forEach(item => {
      if (counts[item.fix_strategy_id] !== undefined) {
        counts[item.fix_strategy_id]++;
      }
    });

    return counts;
  };

  const getDates = (days) => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.unshift(date.toISOString().split('T')[0]); // 최신 날짜가 먼저 오도록 배열의 앞에 추가
    }
    return dates;
  };

  const fetchDataForDates = async (dates) => {
    const promises = dates.map(date =>
      fetch(`/api/buggyCodes/date/${date}`)
        .then(res => res.json())
        .then(data => ({ ...data, date })) // 날짜를 데이터에 포함
    );
    return Promise.all(promises);
  };

  // 날짜 생성 함수 (오늘 날짜를 반환)
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // 오늘 날짜의 방문자 수 가져오는 함수
  const fetchTodayVisitorCount = async () => {
    const today = getTodayDate();
    const response = await fetch(`/api/buggyCodes/date/${today}`);
    const data = await response.json();
    return data.onSuccess.nItems;
  };

  const drawGraphs = (fixedCodesData, datesData) => {
    if (innerBoxRightRef.current) {
      const containerWidth = innerBoxRightRef.current.clientWidth / 2 - 10;

      const layout = {
        autosize: true,
        width: containerWidth,
        height: containerWidth + 60,
        margin: {
          l: 30,
          r: 30,
          b: 60,
          t: 100,
          pad: 0
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
      };

      // 색상 설정
      const strategy1Color = '#4682B4'; // SteelBlue
      const strategy2Color = '#FF6347'; // Tomato
      const strategy3Color = '#3CB371'; // MediumSeaGreen

      const donutData = [{
        labels: ['전략 1', '전략 2', '전략 3'],
        values: [fixedCodesData[1], fixedCodesData[2], fixedCodesData[3]],
        type: 'pie',
        hole: 0.4, // 이 값은 도넛의 중앙 구멍 크기를 설정합니다. 0.4는 40%를 의미합니다.
        marker: {
          colors: [strategy1Color, strategy2Color, strategy3Color]
        }
      }];

      const lineData = [{
        x: datesData.map(item => item.date),
        y: datesData.map(item => item.onSuccess.nItems),
        type: 'scatter',
        mode: 'lines+markers',
        marker: {
          color: strategy1Color // 선 그래프와 1번 유형 색상 동일하게 설정
        },
        line: {
          color: strategy1Color // 선 그래프와 1번 유형 색상 동일하게 설정
        }
      }];

      Plotly.newPlot(graph1Ref.current, donutData, { ...layout, title: '패턴 유형 횟수' });
      Plotly.newPlot(graph2Ref.current, lineData, { ...layout, title: '일일 이용자' });
    }
  };

  useEffect(() => {
    // 각 fetch 요청을 Promise.all로 처리하여 모든 요청이 완료될 때까지 기다림
    Promise.all([
      fetch(`/api/fixedCodes/ranking/1/1`).then(response => response.json()),
      fetch(`/api/fixedCodes/ranking/2/1`).then(response => response.json()),
      fetch(`/api/fixedCodes/ranking/3/1`).then(response => response.json())
    ])
    .then(responses => {
      // 모든 fetch 요청의 응답을 받았을 때 실행되는 부분
      let max = -Infinity;
      responses.forEach(data => {
        const reduced_rate = data.onSuccess.items[0].reduced_rate;
        const formattedReducedRate = (reduced_rate).toFixed(2);
        if (parseFloat(formattedReducedRate) > max) {
          max = parseFloat(formattedReducedRate);
        }
      });
      const formattedMax = max.toString() + '%';
      setRatio(formattedMax);
      console.log(formattedMax);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []); // 빈 배열을 전달하여 useEffect가 한 번만 실행되도록 설정

  useEffect(() => {
    fetch(`/api/fixedCodes/ranking/${selectedType}/1`)
      .then(response => response.json()) // 응답을 JSON 형태로 파싱
      .then(data => {
        const { buggy_part, fixed_part, fixed_code_id } = data.onSuccess.items[0];
        console.log(buggy_part, fixed_part);
        setBeforeCode(<pre>{buggy_part}</pre>);
        setAfterCode(<pre>{fixed_part}</pre>);
        setFixed(fixed_code_id);

      })
      .catch(error => {
        console.error('Error fetching data:', error); // 에러가 발생하면 콘솔에 출력
      });
  }, [selectedType]);

  useEffect(() => {
    const dates = getDates(5);

    Promise.all([fetchFixedCodesData(), fetchDataForDates(dates)])
      .then(([fixedCodesData, datesData]) => {
        drawGraphs(fixedCodesData, datesData);
      })
      .catch(err => console.error('Error fetching data:', err));


      fetch('/api/fixedCodes')
      .then(response => response.json()) // 응답을 JSON 형태로 파싱
      .then(data => {
        // 모든 아이템의 reduced_amount를 합산
        const totalReducedAmount = data.onSuccess.items
          .reduce((sum, item) => sum + item.reduced_amount, 0);

        // 합산한 값을 소수점 둘째 자리까지 자르고 뒤에 g를 붙임
        const formattedTotalReducedAmount = totalReducedAmount.toFixed(4) + 'g';

        // setAmount로 설정
        setAmount(formattedTotalReducedAmount);
      })
      .catch(error => {
        console.error('Error fetching data:', error); // 에러가 발생하면 콘솔에 출력
      });

    fetchTodayVisitorCount()
      .then(visitorCount => setVisitor(visitorCount))
      .catch(err => console.error('Error fetching visitor count:', err));

  }, []);

  useEffect(() => {
    // API 호출로 reduced_amount 가져오기
    fetch('/api/fixedCodes')
      .then(response => response.json())
      .then(data => {
        const totalReducedAmount = data.onSuccess.items.reduce((sum, item) => sum + item.reduced_amount, 0);
        setReducedAmount(totalReducedAmount);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (imageContainerRef.current && earthImageRef.current && marsImageRef.current && spaceImageRef.current) {
      const maxDistance = imageContainerRef.current.clientWidth - earthImageRef.current.clientWidth - marsImageRef.current.clientWidth;
      const marginLeft = 50 + (reducedAmount / 100 * maxDistance);
      spaceImageRef.current.style.marginLeft = `${marginLeft + 100}px`; // 실제 서비스에서는 적절한 값 사용 필요 현재는 시각적 효과로 조금 더 더함
    }
  }, [reducedAmount]);



  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const reportSubmit = () => {
    // 서버로 데이터를 보내는 부분
    const reportData = {
      description: reportDescription,
      fixed_code_id: fixed // selectedType을 사용하여 신고하는 코드의 ID를 설정
    };

    console.log(reportData);
    fetch('/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reportData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // 신고가 성공적으로 제출되면 모달을 닫습니다.
      closeModal();
    })
    .catch(error => {
      console.error('Error submitting report:', error);
    });
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
            <InnerBoxLeftContents ref={imageContainerRef}>
              <img src="./img/earth.png" alt="Earth" id="earth" ref={earthImageRef}></img>
              <SpaceImage src="./img/space.png" alt="Space" id="space" ref={spaceImageRef}/>
              <img src="./img/mars.png" alt="Mars" id="mars" ref={marsImageRef}></img>
            </InnerBoxLeftContents>
          </InnerBoxLeft>
          <InnerBoxRight ref={innerBoxRightRef}>
            <InnerBoxRightHeader>
              일간 통계
            </InnerBoxRightHeader>
            <InnerBoxRightContents>
              <InnerBoxRightSubContents style={{ fontWeight: 'bold' }}>일일 방문자</InnerBoxRightSubContents>
              <InnerBoxRightSubContents>{visitor}</InnerBoxRightSubContents>
            </InnerBoxRightContents>
            <InnerBoxRightContents>
              <InnerBoxRightSubContents style={{ fontWeight: 'bold' }}>절약된 탄소</InnerBoxRightSubContents>
              <InnerBoxRightSubContents>{amount}</InnerBoxRightSubContents>
            </InnerBoxRightContents>
            <InnerBoxRightContents>
              <InnerBoxRightSubContents style={{ fontWeight: 'bold' }}>가장 많이 절약된 비율</InnerBoxRightSubContents>
              <InnerBoxRightSubContents>{ratio}</InnerBoxRightSubContents>
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
            <SelectWrapper>
              <Select value={selectedType} onChange={(e) => setSelectedType(parseInt(e.target.value))}>
                <option value={1}>Pattern 1</option>
                <option value={2}>Pattern 2</option>
                <option value={3}>Pattern 3</option>
              </Select>
            </SelectWrapper>
            <LastBoxButton onClick={openModal}>신고하기</LastBoxButton>
            <StyledModal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
            >
              <ModalContent>
                <Toptitle>신고 사유</Toptitle><br />
                <form>
                  <TextArea value={reportDescription} onChange={(e) => setReportDescription(e.target.value)}></TextArea>
                </form>
                <Button1 onClick={reportSubmit}>신고하기</Button1>
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
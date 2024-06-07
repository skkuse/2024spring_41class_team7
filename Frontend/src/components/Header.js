import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import React, { useState } from 'react';

const titleColor = '#4F6F52';
const Box = styled.div`
  width: 105%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const HeaderBox = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: inherit;
  &:hover {
    cursor: pointer;
  }
`;

const HeaderButton = styled.button`
  font-weight: bold;
  background-color: #FFF;
  border: none;
  &:hover {
    cursor: pointer;
  }
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

const Button = styled.button`
  background-color: #4F6F52;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: #fff;
  width: 70px;
  height: 40px;
  margin-left: 370px;
  &:hover {
    background-color: #45a049;
  }
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 20px;
`;

const Toptitle = styled.h1`
  font-weight: bold;
  margin-top: 20px;
  color: ${titleColor};
`;

Modal.setAppElement('#root');

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <Box>
            <HeaderBox to="/">Green Coder</HeaderBox>
            <HeaderButton onClick={openModal}>About</HeaderButton>
            <StyledModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
            >
                <ModalContent>
                    <Toptitle>About Green Coders</Toptitle><br />
                    <Title>What is Green Coders?</Title>
                    <p>Green Coders에서 그린화 패턴을 적용하고 싶은 코드를 입력하면 <br />탄소배출량과 함께 리팩토링한 코드를 제공한다. 이를 통해 사용자는 <br />더적은 탄소를 배출하는 친환경적인 코드를 얻을 수 있다.</p><br />
                    <Title>Why should we use green coders?</Title>
                    <p>코드가 실행될 때 발생하는 탄소 배출량을 측정함으로써 개발자가 <br />소프트웨어의 탄소 배출량을 실감할 수 있도록 도와주어 환경 친화적인 <br />개발을 장려한다.</p><br />
                    <Title>Carbon Emission Formula</Title>
                    <p>𝐶 = 𝐸 × 𝐶𝐼</p>
                    <p>𝐸 = 𝑡 × (𝑛𝑐 × 𝑃𝑐 × 𝑢𝑐 + 𝑛𝑚 × 𝑃𝑚) × 𝑃𝑈𝐸 × 0.001</p>
                    <p>𝐶 = 𝑡 × (𝑛𝑐 × 𝑃𝑐 × 𝑢𝑐 + 𝑛𝑚 × 𝑃𝑚) × 𝑃𝑈𝐸 × 𝐶𝐼 × 0.001</p>
                    <br />
                    <Button onClick={closeModal}>닫기</Button>
                </ModalContent>
            </StyledModal>
        </Box>
    );
}
import React, { useState } from 'react';
import styled from 'styled-components';
import Table from '../components/Table';
import { useEffect } from 'react';
import Modal from 'react-modal';

const buttonColor = '#1A4D2E';
const titleColor = '#4F6F52';
const layerColor1 = '#F5EFE6';
const layerColor2 = '#E8DFCA';
const backColor = '#FFFFFF';


const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: ${layerColor1};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const H1 = styled.h1`
  margin: 30px;
  color: ${titleColor};
`;

const H3 = styled.h3`
  margin: 30px;
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
    margin-top: 50px;
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

const data = [
  { id: 1, text: '안녕하시오저는 누누누누누누누누누ㅜㄴㄹ넘;ㅣㄴ올;먀ㅗㄴ더ㅏ우런뮤ㅏㅕ노다고지ㅏㅓ누피ㅏㅜ피너ㅏㅙ햐ㅕㅈ도새ㅑㅗㅈ;미라ㅗ니;ㅏㅗㅇ리ㅏㅜㅋㅌ처,ㅜㄴ아뢔ㅔ쟈ㅗㄷ긴망;ㅣ라ㅟㄴㅁㅇ푸 ,튜파ㅓㄴ아롲대ㅑㅗㄹ;나ㅣㅓㅜㅇㄹ,ㅡ피' },
  { id: 2, text: 'Data 2' },
  { id: 3, text: 'Data 3' }
];

const AdminPage = () => {
  const [tableData, setTableData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  // useEffect(() => {
  //   // 데이터를 백엔드에서 가져오는 함수 호출
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('/');
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch data');
  //     }
  //     const data = await response.json();
  //     setTableData(data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await fetch(`/${id}`, {
  //       method: 'DELETE'
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to delete data');
  //     }
  //     setTableData(prevData => prevData.filter(item => item.id !== id));
  //   } catch (error) {
  //     console.error('Error deleting data:', error);
  //   }
  // };

  const handleConfirmDelete = () => {
    // 여기서 삭제 기능을 구현합니다.
    const newData = tableData.filter(item => item.id !== deleteItemId);
    setTableData(newData);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AdminContainer>
      <H1>Admin Page</H1>
      <Table data={tableData} onDelete={openModal} />
      <StyledModal isOpen={isModalOpen}
        onRequestClose={closeModal}>
        <ModalContent>
          <H3>삭제하시겠습니까?</H3>
          <Button1 onClick={handleConfirmDelete}>Yes</Button1>
          <Button2 onClick={closeModal}>No</Button2>
        </ModalContent>

      </StyledModal>
    </AdminContainer>
  );
};

export default AdminPage;

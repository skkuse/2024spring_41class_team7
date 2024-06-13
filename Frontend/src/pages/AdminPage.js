import React, { useState } from 'react';
import styled from 'styled-components';
import Table from '../components/Table';
import { useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

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

const AdminPage = ({ auth }) => {
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      alert('You are not authorized to access this page.');
      navigate('/admin');
    }
  }, [auth, navigate]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/reports');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Fetched data:', data);

      if (data.status === 'success' && data.onSuccess && Array.isArray(data.onSuccess.items)) {
        const reports = data.onSuccess.items.map(report => ({
          id: report.report_id,
          description: report.description,
        }));
        console.log(reports);
        setTableData(reports);
      } else {
        throw new Error(data.onError.message || 'Error fetching reports');
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/reports/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete data');
      } else {
        console.log(response);
      }
      setTableData(prevData => prevData.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error.message);
    }
  };


  const handleConfirmDelete = () => {
    handleDelete(deleteItemId)
    setIsModalOpen(false);
  };

  const openModal = (id) => {
    setDeleteItemId(id);
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
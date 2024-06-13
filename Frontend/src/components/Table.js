import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  word-break: break-word;
`;

const DeleteButton = styled.button`
  background-color: #4F6F52;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: #fff;
  width: 70px;
  height: 40px;
  &:hover {
    background-color: #45a049;
  }
`;

const TableContainer = styled.div`
  max-width: 800px;
  margin: auto;
  overflow-x: auto;
`;

const TableComponent = ({ data, onDelete }) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader>Pattern</TableHeader>
            <TableHeader>Report message</TableHeader>
            <TableHeader>Action</TableHeader>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <DeleteButton onClick={() => onDelete(item.id)}>Delete</DeleteButton>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
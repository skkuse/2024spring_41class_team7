import React, { useState } from 'react';
import styled from 'styled-components';
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
  width: 500px;
  background-color: ${layerColor1};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 30px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
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

const H1 = styled.h1`
  margin-top: 30px;
  color: ${titleColor};
`;

function Admin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the authentication logic
    if (password === 'ss') {
      alert('Login successful!');
      navigate('/adminpage');
      // Redirect or show admin content
    } else {
      alert('Incorrect password.');
    }
  };

  return (
    <AdminContainer>
      <H1>Administrator Login</H1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
        />
        <Button type="submit">Login</Button>
      </Form>
    </AdminContainer>
  );
}

export default Admin;

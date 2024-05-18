import React, { useState } from 'react';
import styled from 'styled-components';

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 16px;
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
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: #45a049;
  }
`;

function Admin() {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the authentication logic
    if (password === 'your_admin_password') {
      alert('Login successful!');
      // Redirect or show admin content
    } else {
      alert('Incorrect password.');
    }
  };

  return (
    <AdminContainer>
      <h2>Admin Login</h2>
      <Form onSubmit={handleSubmit}>
        <Label>Password</Label>
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

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalculatorForm from './components/CalculatorForm';
import Admin from './components/Admin';
import styled from 'styled-components';

const Header = styled.header`
  background-color: #4caf50;
  padding: 20px;
  text-align: center;
  color: white;
`;

const Title = styled.h1`
  margin: 0;
`;

const MainContent = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  background-color: #e8f5e9;
  width: 100%;
`;

function App() {
  return (
    <Router>
      <div className="App">
        <Header>
          <Title>Green Coders</Title>
        </Header>
        <MainContent>
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<CalculatorForm />} />
          </Routes>
        </MainContent>
      </div>
    </Router>
  );
}

export default App;

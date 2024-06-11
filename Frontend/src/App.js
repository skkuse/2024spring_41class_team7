import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calculator from './pages/Calculator';
import Admin from './components/Admin';
import styled from 'styled-components';
import AdminPage from './pages/AdminPage';
import ShowRefactoring from './pages/ShowRefactoring';
import MainPage from './pages/MainPage';
import ResultPage from './pages/ResultPage';
import { useState } from 'react';

const Title = styled.h1`
  margin: 0;
`;

const MainContent = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  background-color: #FFFFFF;
  width: 100%;
`;

function App() {
  const [auth, setAuth] = useState(false);
  return (
    <Router>
      <div className="App">
        <MainContent>
          <Routes>
            <Route path="/showrefactoring" element={<ShowRefactoring />} />
            <Route path="/admin" element={<Admin setAuth={setAuth} />} />
            <Route path="/adminpage" element={<AdminPage auth={auth} />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/resultpage" element={<ResultPage />} />
          </Routes>
        </MainContent>
      </div>
    </Router>
  );
}

export default App;

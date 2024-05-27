import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calculator from './pages/Calculator';
import Admin from './components/Admin';
import styled from 'styled-components';
import AdminPage from './pages/AdminPage';
import ShowRefactoring from './pages/ShowRefactoring';

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
  return (
    <Router>
      <div className="App">
        <MainContent>
          <Routes>
            <Route path="/showrefactoring" element={<ShowRefactoring />} />
            <Route path="/adminpage" element={<AdminPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/calculator" element={<Calculator />} />
          </Routes>
        </MainContent>
      </div>
    </Router>
  );
}

export default App;

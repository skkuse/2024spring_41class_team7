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

const H1 = styled.h1`
  margin-top: 30px;
  color: ${titleColor};
`;

function Admin() {

    return (
        <AdminContainer>
            <H1>Green Coders - Administrator</H1>
            <table>

            </table>
        </AdminContainer>
    );
}

export default Admin;

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FiLoader } from 'react-icons/fi';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #ffffff;
  font-family: 'Inter', sans-serif;
`;

const LoadingText = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1rem;
  background: linear-gradient(to right, #60a5fa, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Spinner = styled(FiLoader)`
  font-size: 3rem;
  color: #60a5fa;
  animation: ${spin} 1s linear infinite;
`;

const Loading = () => (
  <LoadingContainer>
    <Spinner />
    <LoadingText>Loading ElixirCache...</LoadingText>
  </LoadingContainer>
);

export default Loading;
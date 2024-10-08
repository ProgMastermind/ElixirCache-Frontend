import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiServer, FiDatabase } from 'react-icons/fi';
import CommandExplanation from './CommandExplanation';
import ConnectionArchitecture from './ConnectionArchitecture';
import MasterReplicaArchitecture from './MasterReplicaArchitecture';

const DocumentationContainer = styled.div`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  min-height: 100vh;
  color: #f3f4f6;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #60a5fa;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SmallLogo = styled.div`
  width: 40px;
  height: 40px;
`;

const LogoSVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const LogoText = styled.span`
  background: linear-gradient(to right, #60a5fa, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem;
  font-weight: 900;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;

  &:hover {
    color: #60a5fa;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #60a5fa, #34d399);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &.active {
    color: #60a5fa;
  }

  &.active::after {
    transform: scaleX(1);
  }
`;

const ContentWrapper = styled.div`
  padding-top: 5rem;
  padding: 7rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(to right, #60a5fa, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Tab = styled(motion.button)`
  background: ${props => props.active ? 'rgba(96, 165, 250, 0.2)' : 'transparent'};
  border: none;
  color: ${props => props.active ? '#60a5fa' : '#94a3b8'};
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(96, 165, 250, 0.1);
  }
`;

const ContentContainer = styled(motion.div)`
  background: rgba(30, 41, 59, 0.5);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DocumentationPage = () => {
  const [activeTab, setActiveTab] = useState('commands');

  useEffect(() => {
    return () => {
      setActiveTab('commands'); 
    };
  }, []);

  const tabContent = {
    commands: <CommandExplanation />,
    connection: <ConnectionArchitecture />,
    masterReplica: <MasterReplicaArchitecture />
  };

  return (
    <DocumentationContainer>
      <NavBar>
        <Logo to="/">
          <SmallLogo>
            <LogoSVG viewBox="0 0 200 200">
              <defs>
                <linearGradient id="smallLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
              <path
                d="M100,10 L178,55 L178,145 L100,190 L22,145 L22,55 Z"
                fill="none"
                stroke="url(#smallLogoGradient)"
                strokeWidth="10"
              />
              <path
                d="M100,40 L150,70 L150,130 L100,160 L50,130 L50,70 Z"
                fill="none"
                stroke="url(#smallLogoGradient)"
                strokeWidth="8"
              />
              <circle cx="100" cy="100" r="30" fill="url(#smallLogoGradient)" />
            </LogoSVG>
          </SmallLogo>
          <LogoText>ElixirCache</LogoText>
        </Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/benchmarks">Benchmarks</NavLink>
          <NavLink to="/documentation" className="active">Docs</NavLink>
        </NavLinks>
      </NavBar>
      <ContentWrapper>
        <Title>ElixirCache Documentation</Title>
        <TabContainer>
          <Tab
            active={activeTab === 'commands'}
            onClick={() => setActiveTab('commands')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiCode /> Commands
          </Tab>
          <Tab
            active={activeTab === 'connection'}
            onClick={() => setActiveTab('connection')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiServer /> Connection Architecture
          </Tab>
          <Tab
            active={activeTab === 'masterReplica'}
            onClick={() => setActiveTab('masterReplica')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiDatabase /> Master-Replica Architecture
          </Tab>
        </TabContainer>
        <AnimatePresence mode="wait">
          <ContentContainer
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {tabContent[activeTab]}
          </ContentContainer>
        </AnimatePresence>
      </ContentWrapper>
    </DocumentationContainer>
  );
};

export default DocumentationPage;
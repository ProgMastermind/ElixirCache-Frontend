import React, { useState } from 'react';
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
  padding: 2rem;
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

  const tabContent = {
    commands: <CommandExplanation />,
    connection: <ConnectionArchitecture />,
    masterReplica: <MasterReplicaArchitecture />
  };

  return (
    <DocumentationContainer>
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
    </DocumentationContainer>
  );
};

export default DocumentationPage;
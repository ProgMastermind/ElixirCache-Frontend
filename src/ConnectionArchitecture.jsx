import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMonitor, FiServer, FiDatabase, FiArrowRight, FiArrowLeft, FiCircle } from 'react-icons/fi';

const ArchitectureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 3rem;
  color: #60a5fa;
  text-align: center;
  letter-spacing: -0.5px;
`;

const DiagramContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const ComponentBox = styled(motion.div)`
  width: 200px;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ComponentIcon = styled.div`
  font-size: 3rem;
  color: #60a5fa;
`;

const ComponentName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #f3f4f6;
  text-align: center;
`;

const ArrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const ArrowLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: #94a3b8;
`;

const BidirectionalArrow = styled(motion.div)`
  display: flex;
  align-items: center;
  color: #60a5fa;
  font-size: 1.5rem;
  gap: 0.5rem;
`;

const DescriptionList = styled.ul`
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 800px;
  text-align: left;
  color: #e2e8f0;
  margin-top: 2rem;
  padding-left: 1.5rem;
`;

const DescriptionItem = styled.li`
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;
`;

const ItemIcon = styled(FiCircle)`
  color: #60a5fa;
  font-size: 0.8rem;
  margin-right: 1rem;
  margin-top: 0.5rem;
`;

const ItemText = styled.span`
  font-weight: 400;
`;

const HighlightText = styled.span`
  color: #34d399;
  font-weight: 600;
`;

const ConnectionArchitecture = () => {
  return (
    <ArchitectureContainer>
      <Title>ElixirCache Connection Architecture</Title>
      <DiagramContainer>
        <ComponentBox
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ComponentIcon as={FiMonitor} />
          <ComponentName>Frontend Client</ComponentName>
        </ComponentBox>
        
        <ArrowContainer>
          <ArrowLabel>WebSocket</ArrowLabel>
          <BidirectionalArrow>
            <FiArrowLeft />
            <FiArrowRight />
          </BidirectionalArrow>
        </ArrowContainer>
        
        <ComponentBox
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ComponentIcon as={FiServer} />
          <ComponentName>WebSocket Server</ComponentName>
        </ComponentBox>
        
        <ArrowContainer>
          <ArrowLabel>Internal Communication</ArrowLabel>
          <BidirectionalArrow>
            <FiArrowLeft />
            <FiArrowRight />
          </BidirectionalArrow>
        </ArrowContainer>
        
        <ComponentBox
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ComponentIcon as={FiDatabase} />
          <ComponentName>ElixirCache Server</ComponentName>
        </ComponentBox>
      </DiagramContainer>
      
      <DescriptionList>
        <DescriptionItem>
          <ItemIcon />
          <ItemText>
            <HighlightText>Three-Tier Architecture:</HighlightText> The system is composed of three main components - Frontend Client, WebSocket Server, and ElixirCache Server.
          </ItemText>
        </DescriptionItem>
        <DescriptionItem>
          <ItemIcon />
          <ItemText>
            <HighlightText>WebSocket Communication:</HighlightText> Frontend Client and WebSocket Server communicate via WebSocket protocol, allowing for real-time, bidirectional data flow.
          </ItemText>
        </DescriptionItem>
        <DescriptionItem>
          <ItemIcon />
          <ItemText>
            <HighlightText>Intermediary Server:</HighlightText> The WebSocket Server acts as an intermediary, handling connections and routing messages between clients and the ElixirCache Server.
          </ItemText>
        </DescriptionItem>
        <DescriptionItem>
          <ItemIcon />
          <ItemText>
            <HighlightText>Backend Processing:</HighlightText> The ElixirCache Server processes commands, manages data, and communicates results back through the WebSocket Server.
          </ItemText>
        </DescriptionItem>
        <DescriptionItem>
          <ItemIcon />
          <ItemText>
            <HighlightText>Bidirectional Flow:</HighlightText> Data and commands can flow in both directions, allowing for responsive interactions and server-initiated updates.
          </ItemText>
        </DescriptionItem>
      </DescriptionList>
    </ArchitectureContainer>
  );
};

export default ConnectionArchitecture;
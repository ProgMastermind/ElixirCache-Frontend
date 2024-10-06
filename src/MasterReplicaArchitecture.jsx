import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiDatabase, FiArrowDown, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const ArchitectureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: #60a5fa;
  text-align: center;
  letter-spacing: -0.5px;
`;

const ArchitectureDiagram = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: 3rem;
  position: relative;
`;

const ComponentBox = styled(motion.div)`
  background: rgba(30, 41, 59, 0.8);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 150px;
`;

const ComponentIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => props.color || '#60a5fa'};
`;

const ComponentName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #f3f4f6;
  text-align: center;
`;

const ReplicaContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 3rem;
  position: relative;
`;

const Arrow = styled(motion.div)`
  position: absolute;
  color: #60a5fa;
  font-size: 1.5rem;
`;

const DescriptionContainer = styled.div`
  background: rgba(30, 41, 59, 0.5);
  border-radius: 1rem;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
`;

const DescriptionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #60a5fa;
  margin-bottom: 1rem;
`;

const DescriptionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const DescriptionItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  color: #e2e8f0;
`;

const ItemIcon = styled(FiDatabase)`
  color: #34d399;
  font-size: 1.2rem;
  margin-right: 1rem;
  margin-top: 0.3rem;
`;

const ItemText = styled.span`
  font-size: 1rem;
  line-height: 1.6;
`;

const HighlightText = styled.span`
  color: #34d399;
  font-weight: 600;
`;

const MasterReplicaArchitecture = () => {
  return (
    <ArchitectureContainer>
      <Title>ElixirCache Master-Replica Architecture</Title>
      <ArchitectureDiagram>
        <ComponentBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ComponentIcon color="#fbbf24"><FiDatabase /></ComponentIcon>
          <ComponentName>Master</ComponentName>
        </ComponentBox>
        <Arrow
          as={FiArrowDown}
          style={{ top: '140px', left: 'calc(50% - 12px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        <ReplicaContainer>
          {[1, 2, 3].map((index, i) => (
            <ComponentBox
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
            >
              <ComponentIcon color="#34d399"><FiDatabase /></ComponentIcon>
              <ComponentName>Replica {index}</ComponentName>
            </ComponentBox>
          ))}
          <Arrow
            as={FiArrowLeft}
            style={{ top: '50%', left: '28%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          />
          <Arrow
            as={FiArrowRight}
            style={{ top: '50%', left: '32%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />
          <Arrow
            as={FiArrowLeft}
            style={{ top: '50%', right: '32%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          />
          <Arrow
            as={FiArrowRight}
            style={{ top: '50%', right: '28%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          />
        </ReplicaContainer>
      </ArchitectureDiagram>
      <DescriptionContainer>
        <DescriptionTitle>Replication Process and Benefits</DescriptionTitle>
        <DescriptionList>
          <DescriptionItem>
            <ItemIcon />
            <ItemText>
              <HighlightText>Handshake Process:</HighlightText> The replica initiates a connection to the master through a series of commands, establishing a secure replication link.
            </ItemText>
          </DescriptionItem>
          <DescriptionItem>
            <ItemIcon />
            <ItemText>
              <HighlightText>Full Synchronization:</HighlightText> After the handshake, the master performs a FULLRESYNC to bring the replica up to date with the current dataset.
            </ItemText>
          </DescriptionItem>
          <DescriptionItem>
            <ItemIcon />
            <ItemText>
              <HighlightText>Read Scalability:</HighlightText> Replicas can handle read operations, effectively distributing the query load across multiple servers.
            </ItemText>
          </DescriptionItem>
          <DescriptionItem>
            <ItemIcon />
            <ItemText>
              <HighlightText>Data Redundancy:</HighlightText> Replication provides a real-time backup of data, significantly improving fault tolerance and data availability.
            </ItemText>
          </DescriptionItem>
          <DescriptionItem>
            <ItemIcon />
            <ItemText>
              <HighlightText>Read-Only Replicas:</HighlightText> Replicas are read-only by default, ensuring data consistency by not processing write commands directly.
            </ItemText>
          </DescriptionItem>
          <DescriptionItem>
            <ItemIcon />
            <ItemText>
              <HighlightText>Automatic Failover:</HighlightText> In case of a master failure, a replica can be promoted to become the new master, ensuring continuous operation.
            </ItemText>
          </DescriptionItem>
        </DescriptionList>
      </DescriptionContainer>
    </ArchitectureContainer>
  );
};

export default MasterReplicaArchitecture;
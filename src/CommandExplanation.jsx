import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap, FiPlus, FiMinus, FiInfo } from 'react-icons/fi';

const CommandSection = styled.div`
  margin-bottom: 2rem;
`;

const CommandTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #60a5fa;
`;

const CommandDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ExampleContainer = styled.div`
  background: rgba(15, 23, 42, 0.5);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const ExampleTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #34d399;
`;

const CodeBlock = styled.pre`
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  border-radius: 0.25rem;
  overflow-x: auto;
`;

const NoteContainer = styled(motion.div)`
  background: rgba(96, 165, 250, 0.1);
  border-left: 4px solid #60a5fa;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 0 0.5rem 0.5rem 0;
`;

const NoteTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #60a5fa;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NoteContent = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ExpandButton = styled(motion.button)`
  background: none;
  border: none;
  color: #60a5fa;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const CommandExplanation = () => {
  const [expandedNotes, setExpandedNotes] = useState({});

  const toggleNote = (command) => {
    setExpandedNotes(prev => ({...prev, [command]: !prev[command]}));
  };

  const commands = [
    {
      name: 'SET',
      description: 'Sets the value of a key',
      example: 'SET mykey "Hello, ElixirCache!"',
      note: 'The SET command overwrites any existing value for the key. You can use the NX (Only Set if Not eXists) or XX (Only Set if eXists) options to modify this behavior.'
    },
    {
      name: 'GET',
      description: 'Retrieves the value of a key',
      example: 'GET mykey',
      note: 'If the key does not exist, GET returns nil. It\'s important to handle this case in your application logic.'
    },
    {
      name: 'INCR',
      description: 'Increments the integer value of a key by 1',
      example: 'INCR mycounter',
      note: 'If the key doesn\'t exist, INCR sets it to 0 before incrementing. If the value isn\'t an integer, INCR returns an error.'
    },
    {
      name: 'INFO REPLICATION',
      description: 'Provides information about the replication state of the server',
      example: 'INFO REPLICATION',
      note: 'This command is crucial for monitoring the health and status of your master-replica setup. It provides details such as the role of the server, number of connected replicas, and replication offset.'
    }
  ];

  return (
    <div>
      <h2>ElixirCache Commands</h2>
      {commands.map((command) => (
        <CommandSection key={command.name}>
          <CommandTitle>
            <FiZap /> {command.name}
          </CommandTitle>
          <CommandDescription>{command.description}</CommandDescription>
          <ExampleContainer>
            <ExampleTitle>Example:</ExampleTitle>
            <CodeBlock>{command.example}</CodeBlock>
          </ExampleContainer>
          <ExpandButton
            onClick={() => toggleNote(command.name)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {expandedNotes[command.name] ? <FiMinus /> : <FiPlus />}
            {expandedNotes[command.name] ? 'Hide Note' : 'Show Note'}
          </ExpandButton>
          <AnimatePresence>
            {expandedNotes[command.name] && (
              <NoteContainer
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <NoteTitle><FiInfo /> Note</NoteTitle>
                <NoteContent>{command.note}</NoteContent>
              </NoteContainer>
            )}
          </AnimatePresence>
        </CommandSection>
      ))}
    </div>
  );
};

export default CommandExplanation;

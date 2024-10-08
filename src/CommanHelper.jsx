import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCopy, FiChevronDown, FiChevronUp, FiExternalLink } from 'react-icons/fi';

const CommandHelperContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background-color: ${props => props.theme.colors.paper};
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const CommandHelperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CommandHelperTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  background: ${props => props.theme.colors.heading};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
`;

const CommandList = styled(motion.div)`
  display: grid;
  gap: 0.5rem;
`;

const CommandItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: ${props => props.theme.colors.background};
  border-radius: 0.25rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
  }
`;

const DocLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
  font-size: 0.75rem;
  text-decoration: none;
  margin-top: 0.5rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  svg {
    margin-right: 0.25rem;
  }
`;

const CommandHelper = ({ onCommandSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const commands = ['PING', 'ECHO hey','SET name prakash', 'GET name', 'INCR counter', 'INFO replication'];

  return (
    <CommandHelperContainer
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? 0 : "calc(100% - 40px)" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <CommandHelperHeader onClick={() => setIsOpen(!isOpen)}>
        <CommandHelperTitle>Quick Test Commands</CommandHelperTitle>
        <ToggleButton>
          {isOpen ? <FiChevronDown /> : <FiChevronUp />}
        </ToggleButton>
      </CommandHelperHeader>
      <CommandList
        initial="collapsed"
        animate={isOpen ? "open" : "collapsed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          collapsed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3 }}
      >
        {commands.map((command, index) => (
          <CommandItem key={index}>
            {command}
            <CopyButton onClick={() => onCommandSelect(command)}>
              <FiCopy />
            </CopyButton>
          </CommandItem>
        ))}
        <DocLink href="/documentation" target="_blank" rel="noopener noreferrer">
          <FiExternalLink /> Refer docs for more commands
        </DocLink>
      </CommandList>
    </CommandHelperContainer>
  );
};

export default CommandHelper;
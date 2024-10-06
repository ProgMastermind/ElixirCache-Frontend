import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap, FiServer, FiDatabase, FiCloud, FiCpu, FiLayers, FiSend, FiDownload, FiCode } from 'react-icons/fi';
import ElixirCacheHero from './ElixirCacheHero';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const LandingPage = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #ffffff;
  font-family: 'Inter', sans-serif;
`;

const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: #1a2234;
  margin-top: -4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(to right, #60a5fa, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(30, 41, 59, 0.8);
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: #60a5fa;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const FeatureDescription = styled.p`
  color: #94a3b8;
  font-size: 1rem;
`;

const ShowcaseSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
`;

const ShowcaseContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ShowcaseGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

const CodeBlock = styled(SyntaxHighlighter)`
  border-radius: 1rem;
  padding: 1.5rem !important;
  font-size: 0.9rem !important;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  max-height: 400px;
  overflow-y: auto;
`;

const DemoContainer = styled.div`
  background: rgba(30, 41, 59, 0.8);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const DemoTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DemoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const DemoInputGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DemoInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const DemoButton = styled.button`
  flex: 1;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  background: #60a5fa;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: #3b82f6;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const DemoResult = styled.div`
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  color: #34d399;
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-all;
`;

const Footer = styled.footer`
  background: #0f172a;
  padding: 3rem 2rem;
  text-align: center;
  color: #94a3b8;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterLink = styled(Link)`
  color: #60a5fa;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #34d399;
  }
`;

const Copyright = styled.div`
  font-size: 0.9rem;
`;

const ElixirCacheLandingPage = () => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [isSetMode, setIsSetMode] = useState(true);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket('wss://elixircache.gigalixirapp.com/ws/master');

    socketRef.current.onopen = () => {
      console.log('Connected to ElixirCache');
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received response:', data);
      if (data.type === 'COMMAND_RESULT') {
        setResult(data.result);
      }
    };

    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  const handleSet = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: 'COMMAND',
        command: `SET ${key} ${value}`
      }));
      setIsSetMode(false);
    }
  };

  const handleGet = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: 'COMMAND',
        command: `GET ${key}`
      }));
      setIsSetMode(true);
    }
  };

  const features = [
    { icon: <FiZap />, title: "Lightning Fast", description: "Experience unparalleled speed with our optimized in-memory storage system." },
    { icon: <FiServer />, title: "Highly Scalable", description: "Effortlessly handle increasing loads as your application grows." },
    { icon: <FiDatabase />, title: "Flexible Data Structures", description: "Support for various data types and complex structures including streams." },
    { icon: <FiCloud />, title: "Replication Support", description: "Built-in master-slave replication for improved reliability and performance." },
    { icon: <FiCpu />, title: "Efficient Command Processing", description: "Optimized command execution for SET, GET, INCR, and more." },
    { icon: <FiLayers />, title: "Transaction Support", description: "MULTI, EXEC, and DISCARD commands for atomic operations." },
  ];

  const connectionCode = `
import WebSocket from 'websocket';

const socket = new WebSocket('wss://elixircache.gigalixirapp.com/ws/master');

socket.onopen = () => {
  console.log('Connected to ElixirCache');
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
  if (data.type === 'COMMAND_RESULT') {
    console.log('Result:', data.result);
  }
};

function sendCommand(command) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      type: 'COMMAND',
      command: command
    }));
  }
}

// Example usage
sendCommand('SET mykey myvalue');
sendCommand('GET mykey');
  `.trim();

  return (
    <LandingPage>
      <ElixirCacheHero />

      <FeaturesSection id="features">
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Why Choose ElixirCache?
        </SectionTitle>
        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </FeaturesSection>

      <ShowcaseSection>
        <ShowcaseContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience the Power of ElixirCache
          </SectionTitle>
          <ShowcaseGrid>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <DemoTitle>
                <FiCode />
                Connect with Ease
              </DemoTitle>
              <CodeBlock language="javascript" style={atomOneDark}>
                {connectionCode}
              </CodeBlock>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <DemoContainer>
                <DemoTitle>Try it Out</DemoTitle>
                <DemoContent>
                  <AnimatePresence mode="wait">
                    {isSetMode ? (
                      <DemoInputGroup
                        key="set"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <DemoInput
                          type="text"
                          placeholder="Key"
                          value={key}
                          onChange={(e) => setKey(e.target.value)}
                        />
                        <DemoInput
                          type="text"
                          placeholder="Value"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                        />
                      </DemoInputGroup>
                    ) : (
                      <DemoInputGroup
                        key="get"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <DemoInput
                          type="text"
                          placeholder="Key"
                          value={key}
                          onChange={(e) => setKey(e.target.value)}
                        />
                      </DemoInputGroup>
                    )}
                  </AnimatePresence>
                  <ButtonGroup>
                    <DemoButton onClick={handleSet} disabled={!isSetMode}>
                      <FiSend /> SET
                    </DemoButton>
                    <DemoButton onClick={handleGet} disabled={isSetMode}>
                      <FiDownload /> GET
                    </DemoButton>
                  </ButtonGroup>
                  {result && <DemoResult>{result}</DemoResult>}
                </DemoContent>
              </DemoContainer>
            </motion.div>
          </ShowcaseGrid>
        </ShowcaseContainer>
      </ShowcaseSection>

      <Footer>
        <FooterLinks>
          <FooterLink to="#features">Features</FooterLink>
          <FooterLink to="#docs">Documentation</FooterLink>
          <FooterLink as="a" href="https://github.com/yourusername/elixircache" target="_blank" rel="noopener noreferrer">GitHub</FooterLink>
          <FooterLink to="#contact">Contact</FooterLink>
        </FooterLinks>
        <Copyright>© 2023 ElixirCache. All rights reserved.</Copyright>
      </Footer>
    </LandingPage>
  );
};

export default ElixirCacheLandingPage;
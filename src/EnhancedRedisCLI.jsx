import React, { useState, useRef, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle, keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiZap, FiServer, FiDatabase, FiCloud, FiCloudOff, 
  FiCpu, FiLayers, FiSend, FiPower, FiMoon, FiSun
} from 'react-icons/fi';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    margin: 0;
    padding: 0;
    transition: all 0.3s ease;
  }
`;

const lightTheme = {
  colors: {
    primary: '#3B82F6',
    secondary: '#10B981',
    background: '#F3F4F6',
    paper: '#FFFFFF',
    text: '#1F2937',
    error: '#EF4444',
    success: '#10B981',
    heading: 'linear-gradient(to right, #3B82F6, #10B981)',
    button: 'linear-gradient(to right, #3B82F6, #10B981)',
    connectionBar: '#D1D5DB',
  },
};

const darkTheme = {
  colors: {
    primary: '#60A5FA',
    secondary: '#34D399',
    background: '#111827',
    paper: '#1F2937',
    text: '#F9FAFB',
    error: '#F87171',
    success: '#34D399',
    heading: 'linear-gradient(to right, #60A5FA, #34D399)',
    button: 'linear-gradient(to right, #60A5FA, #34D399)',
    connectionBar: '#4B5563',
  },
};

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: ${props => props.theme.colors.heading};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnimation} 5s ease infinite;
  background-size: 200% 200%;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  font-size: 1.5rem;
`;

const ReplicationProgress = styled.div`
  background-color: ${props => props.theme.colors.paper};
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProgressTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  background: ${props => props.theme.colors.heading};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-top: 2rem;
`;

const ConnectionBar = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  height: 2px;
  background-color: ${props => props.theme.colors.connectionBar};
  z-index: 0;
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  height: 2px;
  background: ${props => props.theme.colors.heading};
  transition: width 0.3s ease;
  z-index: 1;
  width: ${props => {
    const progress = props.$progress / (props.$steps - 1);
    return `calc((100% - 3rem) * ${progress})`;
  }};
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;

const StepIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${props => props.$active ? props.theme.colors.heading : props.theme.colors.paper};
  color: ${props => props.$active ? props.theme.colors.paper : props.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.theme.colors.primary};
`;

const StepLabel = styled.span`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
`;

const InstancesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const InstanceCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.paper};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const InstanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const InstanceTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  background: ${props => props.theme.colors.heading};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
`;

const ConnectionStatus = styled.span`
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: ${props => props.$connected ? props.theme.colors.success : props.theme.colors.error};
  color: ${props => props.theme.colors.paper};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Terminal = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: 0.5rem;
  padding: 1rem;
  height: 300px;
  overflow-y: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  flex-grow: 1;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }
`;

const TerminalLine = styled.div`
  margin-bottom: 0.25rem;
  color: ${props => props.theme.colors.text};
`;

const InputForm = styled.form`
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex-grow: 1;
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 0.25rem;
  padding: 0.5rem;
  color: ${props => props.theme.colors.text};
  font-family: 'Fira Code', monospace;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary};
  }
`;

const Button = styled.button`
  background: ${props => props.theme.colors.button};
  color: ${props => props.theme.colors.paper};
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EnhancedRedisCLI = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [masterConnected, setMasterConnected] = useState(false);
  const [slaveConnected, setSlaveConnected] = useState(false);
  const [masterOutput, setMasterOutput] = useState([]);
  const [slaveOutput, setSlaveOutput] = useState([]);
  const [masterInput, setMasterInput] = useState('');
  const [slaveInput, setSlaveInput] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const masterOutputRef = useRef(null);
  const slaveOutputRef = useRef(null);
  const masterWs = useRef(null);
  const slaveWs = useRef(null);

  const handshakeSteps = [
    { label: 'Initiate', icon: <FiZap /> },
    { label: 'PING', icon: <FiServer /> },
    { label: 'REPLCONF', icon: <FiDatabase /> },
    { label: 'PSYNC', icon: <FiCloud /> },
    { label: 'Complete', icon: <FiLayers /> },
  ];

  useEffect(() => {
    if (masterOutputRef.current) {
      masterOutputRef.current.scrollTop = masterOutputRef.current.scrollHeight;
    }
    if (slaveOutputRef.current) {
      slaveOutputRef.current.scrollTop = slaveOutputRef.current.scrollHeight;
    }
  }, [masterOutput, slaveOutput]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (masterWs.current && masterWs.current.readyState === WebSocket.OPEN) {
        masterWs.current.send(JSON.stringify({ type: 'reset_server' }));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleMasterConnect = () => {
    masterWs.current = new WebSocket('wss://elixircache.gigalixirapp.com/ws/master');
    masterWs.current.onopen = () => {
      setMasterConnected(true);
      setMasterOutput(prev => [...prev, '> Connected to Redis Master']);
    };
    masterWs.current.onmessage = handleMasterMessage;
    masterWs.current.onerror = handleMasterError;
    masterWs.current.onclose = handleMasterClose;
  };

  const handleSlaveConnect = () => {
    slaveWs.current = new WebSocket('wss://elixircache.gigalixirapp.com/ws/slave');
    slaveWs.current.onopen = () => {
      setSlaveConnected(true);
      setSlaveOutput(prev => [...prev, '> Connected to Redis Slave']);
    };
    slaveWs.current.onmessage = handleSlaveMessage;
    slaveWs.current.onerror = handleSlaveError;
    slaveWs.current.onclose = handleSlaveClose;
  };

  const parseRedisResponse = (response) => {
    if (response.trim() === "$-1") {
      return "(nil)";
    }

    const lines = response.split('\r\n');
    let result = [];
    let i = 0;
  
    const parseItem = () => {
      if (i >= lines.length) return null;
      const line = lines[i];
      i++;
  
      switch (line[0]) {
        case '+': return line.slice(1);
        case '-': return `Error: ${line.slice(1)}`;
        case ':': return line.slice(1);
        case '$': 
          const length = parseInt(line.slice(1));
          if (length === -1) return null;
          return lines[i++];
        case '*':
          const count = parseInt(line.slice(1));
          if (count === -1) return null;
          return Array.from({length: count}, parseItem);
        default: return line;
      }
    };
  
    while (i < lines.length) {
      const item = parseItem();
      if (item !== null) {
        result.push(item);
      }
    }
  
    return result.flat().join('\n');
  };

  const handleMasterMessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'BROADCAST') {
        if (data.connection === 'master' || data.connection === 'all') {
          setMasterOutput(prev => [...prev, data.message]);
        }
        updateHandshakeSteps(data.message);
      } else if (data.type === 'COMMAND_RESULT') {
        const parsedResult = parseRedisResponse(data.result);
        setMasterOutput(prev => [...prev, `> ${parsedResult}`]);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
      setMasterOutput(prev => [...prev, event.data]);
    }
  };

  const handleSlaveMessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'BROADCAST') {
        if (data.connection === 'slave' || data.connection === 'all') {
          setSlaveOutput(prev => [...prev, data.message]);
        }
        updateHandshakeSteps(data.message);
      } else if (data.type === 'COMMAND_RESULT') {
        const parsedResult = parseRedisResponse(data.result);
        setSlaveOutput(prev => [...prev, `> ${parsedResult}`]);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
      setSlaveOutput(prev => [...prev, event.data]);
    }
  };

  const updateHandshakeSteps = (message) => {
    if (message.includes("Handshake started")) setActiveStep(0);
    else if (message.includes("PING")) setActiveStep(1);
    else if (message.includes("REPLCONF")) setActiveStep(2);
    else if (message.includes("PSYNC")) setActiveStep(3);
    else if (message.includes("Handshake completed successfully")) setActiveStep(4);
  };

  const handleMasterError = (error) => {
    console.error('Master WebSocket error:', error);
    setMasterOutput(prev => [...prev, '> Error connecting to Redis Master']);
  };

  const handleSlaveError = (error) => {
    console.error('Slave WebSocket error:', error);
    setSlaveOutput(prev => [...prev, '> Error connecting to Redis Slave']);
  };

  const handleMasterClose = () => {
    setMasterConnected(false);
    setMasterOutput(prev => [...prev, '> Disconnected from Redis Master']);
  };

  const handleSlaveClose = () => {
    setSlaveConnected(false);
    setSlaveOutput(prev => [...prev, '> Disconnected from Redis Slave']);
  };

  const handleMasterCommand = (e) => {
    e.preventDefault();
    if (!masterInput.trim() || !masterConnected) return;
    setMasterOutput(prev => [...prev, `> ${masterInput}`]);
    masterWs.current.send(JSON.stringify({ type: 'COMMAND', command: masterInput }));
    setMasterInput('');
  };

  const handleSlaveCommand = (e) => {
    e.preventDefault();
    if (!slaveInput.trim() || !slaveConnected) return;
    setSlaveOutput(prev => [...prev, `> ${slaveInput}`]);
    slaveWs.current.send(JSON.stringify({ type: 'COMMAND', command: slaveInput }));
    setSlaveInput('');
  };

  const renderInstance = (instance) => (
    <InstanceCard
      key={instance.type}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <InstanceHeader>
        <InstanceTitle>
          {instance.type === 'Master' ? <FiServer /> : <FiDatabase />}
          {instance.type}
        </InstanceTitle>
        <ConnectionStatus $connected={instance.connected}>
          {instance.connected ? <FiCloud /> : <FiCloudOff />}
          {instance.connected ? 'Connected' : 'Disconnected'}
        </ConnectionStatus>
      </InstanceHeader>
      {!instance.connected ? (
        <Button onClick={instance.handleConnect}>
          <FiPower /> Connect to {instance.type}
        </Button>
      ) : (
        <>
          <Terminal ref={instance.outputRef}>
            {instance.output.map((line, index) => (
              <TerminalLine key={index}>{line}</TerminalLine>
            ))}
          </Terminal>
          <InputForm onSubmit={instance.handleCommand}>
            <Input
              value={instance.input}
              onChange={(e) => instance.setInput(e.target.value)}
              placeholder={`Enter Redis command for ${instance.type}...`}
            />
            <Button type="submit" disabled={!instance.input.trim()}>
              <FiSend />
            </Button>
          </InputForm>
        </>
      )}
    </InstanceCard>
  );

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Title>ElixirCache Replication Demo</Title>
          <ThemeToggle onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FiSun /> : <FiMoon />}
          </ThemeToggle>
        </Header>
        <ReplicationProgress>
          <ProgressTitle>Replication Handshake Process</ProgressTitle>
          <StepContainer>
            <ConnectionBar />
            <ProgressBar $progress={activeStep} $steps={handshakeSteps.length} />
            {handshakeSteps.map((step, index) => (
              <Step key={index}>
                <StepIcon $active={index <= activeStep}>{step.icon}</StepIcon>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </StepContainer>
        </ReplicationProgress>
        <InstancesContainer>
          {renderInstance({
            type: 'Master',
            connected: masterConnected,
            output: masterOutput,
            input: masterInput,
            setInput: setMasterInput,
            handleCommand: handleMasterCommand,
            handleConnect: handleMasterConnect,
            outputRef: masterOutputRef,
          })}
          {renderInstance({
            type: 'Slave',
            connected: slaveConnected,
            output: slaveOutput,
            input: slaveInput,
            setInput: setSlaveInput,
            handleCommand: handleSlaveCommand,
            handleConnect: handleSlaveConnect,
            outputRef: slaveOutputRef,
          })}
        </InstancesContainer>
      </AppContainer>
    </ThemeProvider>
  );
};

export default EnhancedRedisCLI;
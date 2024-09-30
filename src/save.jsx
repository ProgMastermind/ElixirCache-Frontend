import React, { useState, useRef, useEffect } from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import {
  CssBaseline, AppBar, Toolbar, Typography, Container, Box, Paper,
  TextField, Button, Divider, Stepper, Step, StepLabel, Card, CardContent,
  IconButton, Tooltip, Chip, Stack, useMediaQuery
} from '@mui/material';
import {
  Brightness4, Brightness7, Send, PowerSettingsNew, ContentCopy, DeleteOutline,
  Cloud, CloudOff, Storage, Speed
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const createCustomTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#2196F3' : '#90CAF9',
    },
    secondary: {
      main: mode === 'light' ? '#FF4081' : '#F48FB1',
    },
    background: {
      default: mode === 'light' ? '#F5F5F5' : '#121212',
      paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
    },
    text: {
      primary: mode === 'light' ? '#212121' : '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light' 
            ? '0 2px 4px rgba(0,0,0,0.1)' 
            : '0 2px 4px rgba(255,255,255,0.1)',
        },
      },
    },
  },
});

const Terminal = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#F8F9FA',
  color: theme.palette.mode === 'dark' ? '#E0E0E0' : '#212121',
  padding: theme.spacing(2),
  height: '300px',
  overflowY: 'auto',
  fontFamily: '"Fira Code", "Roboto Mono", monospace',
  fontSize: '0.9rem',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  scrollBehavior: 'smooth',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.mode === 'dark' ? '#1E1E1E' : '#F1F3F4',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.mode === 'dark' ? '#333333' : '#C1C1C1',
    borderRadius: '4px',
  },
}));

const TerminalLine = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
}));

const StyledStepper = styled(Stepper)(({ theme }) => ({
  backgroundColor: 'transparent',
  '& .MuiStepIcon-root': {
    color: theme.palette.mode === 'dark' ? '#333333' : '#BDBDBD',
    '&.Mui-active': {
      color: theme.palette.primary.main,
    },
    '&.Mui-completed': {
      color: theme.palette.success.main,
    },
  },
}));

const EnhancedRedisCLI = () => {
  const [darkMode, setDarkMode] = useState(true);
  const theme = React.useMemo(() => createCustomTheme(darkMode ? 'dark' : 'light'), [darkMode]);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [masterConnected, setMasterConnected] = useState(false);
  const [slaveConnected, setSlaveConnected] = useState(false);
  const [masterOutput, setMasterOutput] = useState([]);
  const [slaveOutput, setSlaveOutput] = useState([]);
  const [masterInput, setMasterInput] = useState('');
  const [slaveInput, setSlaveInput] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [replicationInfo, setReplicationInfo] = useState(null);

  const masterOutputRef = useRef(null);
  const slaveOutputRef = useRef(null);
  const masterWs = useRef(null);
  const slaveWs = useRef(null);

  const handshakeSteps = ['Initiate', 'PING', 'REPLCONF', 'PSYNC', 'Complete'];

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
      if (masterConnected) {
        handleDisconnectAndReset({ type: 'Master' });
      }
      if (slaveConnected) {
        handleDisconnectAndReset({ type: 'Slave' });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [masterConnected, slaveConnected]);


  const handleMasterConnect = () => {
    masterWs.current = new WebSocket('ws://localhost:3001/ws/master');
    masterWs.current.onopen = () => {
      setMasterConnected(true);
      setMasterOutput(prev => [...prev, '> Connected to Redis Master']);
    };
    masterWs.current.onmessage = handleMasterMessage;
    masterWs.current.onerror = handleMasterError;
    masterWs.current.onclose = handleMasterClose;
  };

  const handleSlaveConnect = () => {
    slaveWs.current = new WebSocket('ws://localhost:3001/ws/slave');
    slaveWs.current.onopen = () => {
      setSlaveConnected(true);
      setSlaveOutput(prev => [...prev, '> Connected to Redis Slave']);
    };
    slaveWs.current.onmessage = handleSlaveMessage;
    slaveWs.current.onerror = handleSlaveError;
    slaveWs.current.onclose = handleSlaveClose;
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
      } else if (data.type === 'RESET_RESULT') {
        setMasterOutput(prev => [...prev, `> ${data.message}`]);
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
      } else if (data.type === 'RESET_RESULT') {
        setSlaveOutput(prev => [...prev, `> ${data.message}`]);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
      setSlaveOutput(prev => [...prev, event.data]);
    }
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

  const handleDisconnectAndReset = (instance) => {
    if (instance.type === 'Master') {
      if (masterWs.current && masterWs.current.readyState === WebSocket.OPEN) {
        masterWs.current.send(JSON.stringify({ type: 'reset_server' }));
        masterWs.current.close();
      }
      setMasterConnected(false);
      setMasterOutput([]);
      setMasterInput('');
    } else {
      if (slaveWs.current && slaveWs.current.readyState === WebSocket.OPEN) {
        slaveWs.current.close();
      }
      setSlaveConnected(false);
      setSlaveOutput([]);
      setSlaveInput('');
    }
  };

  const handleCopyOutput = (output) => {
    navigator.clipboard.writeText(output.join('\n'));
  };

  const handleClearOutput = (setOutput) => {
    setOutput([]);
  };

  const updateHandshakeSteps = (message) => {
    if (message.includes("Handshake started")) setActiveStep(0);
    else if (message.includes("PING")) setActiveStep(1);
    else if (message.includes("REPLCONF")) setActiveStep(2);
    else if (message.includes("PSYNC")) setActiveStep(3);
    else if (message.includes("Handshake completed successfully")) setActiveStep(4);
  };

  const parseRedisResponse = (response) => {
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

  const renderInstance = (instance) => (
    <Card key={instance.type} sx={{ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '180px',
      height: instance.connected ? 'auto' : '180px',
    }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Typography variant="h6" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', color: instance.color }}>
            <Speed sx={{ mr: 1, fontSize: '1.5rem' }} /> {instance.type}
          </Typography>
          <Chip
            icon={instance.connected ? <Cloud /> : <CloudOff />}
            label={instance.connected ? "Connected" : "Disconnected"}
            color={instance.connected ? "success" : "error"}
            variant="outlined"
            size="medium"
          />
        </Box>
        {!instance.connected ? (
          <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
            <Button
              variant="contained"
              style={{ 
                backgroundColor: instance.color, 
                color: '#FFFFFF',
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
              }}
              onClick={instance.handleConnect}
              startIcon={<PowerSettingsNew style={{ fontSize: '1.2rem' }} />}
              fullWidth
              sx={{
                '&:hover': {
                  backgroundColor: instance.color,
                  filter: 'brightness(110%)',
                  boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              Connect to {instance.type}
            </Button>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Terminal ref={instance.outputRef} sx={{ flexGrow: 1, mb: 2 }}>
              {instance.output.map((line, index) => (
                <TerminalLine key={index}>{line}</TerminalLine>
              ))}
            </Terminal>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Tooltip title="Copy Output">
                <IconButton onClick={() => handleCopyOutput(instance.output)} size="small">
                  <ContentCopy />
                </IconButton>
              </Tooltip>
              <Tooltip title="Clear Output">
                <IconButton onClick={() => handleClearOutput(instance.setOutput)} size="small">
                  <DeleteOutline />
                </IconButton>
              </Tooltip>
            </Box>
            <form onSubmit={instance.handleCommand}>
              <TextField
                fullWidth
                variant="outlined"
                value={instance.input}
                onChange={(e) => instance.setInput(e.target.value)}
                placeholder={`Enter Redis command for ${instance.type}...`}
                size="small"
                InputProps={{
                  endAdornment: (
                    <IconButton type="submit" size="small">
                      <Send />
                    </IconButton>
                  ),
                }}
              />
            </form>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Storage sx={{ mr: 1 }} /> Redis Replication Visualizer
          </Typography>
          <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box mb={4}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>Replication Handshake Process</Typography>
            <StyledStepper activeStep={activeStep} alternativeLabel={!isMobile} orientation={isMobile ? "vertical" : "horizontal"}>
              {handshakeSteps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>
                    <Tooltip title={`Step ${index + 1}: ${label}`}>
                      <span>{label}</span>
                    </Tooltip>
                  </StepLabel>
                </Step>
              ))}
            </StyledStepper>
          </Box>
        </motion.div>
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
          {renderInstance({
            type: 'Master',
            connected: masterConnected,
            output: masterOutput,
            input: masterInput,
            setInput: setMasterInput,
            handleCommand: handleMasterCommand,
            handleConnect: handleMasterConnect,
            color: theme.palette.primary.main,
            outputRef: masterOutputRef,
            setOutput: setMasterOutput
          })}
          {renderInstance({
            type: 'Slave',
            connected: slaveConnected,
            output: slaveOutput,
            input: slaveInput,
            setInput: setSlaveInput,
            handleCommand: handleSlaveCommand,
            handleConnect: handleSlaveConnect,
            color: theme.palette.secondary.main,
            outputRef: slaveOutputRef,
            setOutput: setSlaveOutput
          })}
        </Stack>
        {replicationInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Box mt={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                    <Storage sx={{ mr: 1 }} /> Replication Info
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Stack direction="row" flexWrap="wrap" gap={2}>
                    {Object.entries(replicationInfo).map(([key, value]) => (
                      <Paper
                        key={key}
                        elevation={0}
                        sx={{
                          p: 2,
                          flexGrow: 1,
                          flexBasis: { xs: '100%', sm: '45%', md: '30%' },
                          border: '1px solid',
                          borderColor: 'divider',
                          backgroundColor: theme.palette.background.default,
                        }}
                      >
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          {key.replace(/_/g, ' ').toUpperCase()}
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">{value}</Typography>
                      </Paper>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </motion.div>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default EnhancedRedisCLI;
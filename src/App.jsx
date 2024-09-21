import React, { useState, useRef, useEffect } from 'react';

const RedisCLI = () => {
  const [connected, setConnected] = useState(false);
  const [output, setOutput] = useState([]);
  const [input, setInput] = useState('');
  const outputRef = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleConnect = () => {
    ws.current = new WebSocket('ws://localhost:3001');

    ws.current.onopen = () => {
      setConnected(true);
      setOutput(prev => [...prev, '> Connected to Redis server']);
    };

    ws.current.onmessage = (event) => {
      setOutput(prev => [...prev, event.data]);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setOutput(prev => [...prev, '> Error connecting to Redis server']);
    };

    ws.current.onclose = () => {
      setConnected(false);
      setOutput(prev => [...prev, '> Disconnected from Redis server']);
    };
  };

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim() || !connected) return;

    setOutput(prev => [...prev, `> ${input}`]);
    ws.current.send(input);
    setInput('');
  };

  return (
    <div className="h-screen flex bg-gray-900 text-green-400 p-4 font-mono">
      <div className="flex-1 flex flex-col mr-4">
        <h1 className="text-2xl mb-4">Redis Web CLI</h1>
        {!connected ? (
          <button 
            onClick={handleConnect}
            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Connect to Redis Server
          </button>
        ) : (
          <>
            <div 
              ref={outputRef}
              className="flex-grow overflow-auto mb-4 bg-black p-4 rounded"
            >
              {output.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
            <form onSubmit={handleCommand} className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none"
                placeholder="Enter Redis command..."
              />
              <button 
                type="submit"
                className="bg-green-700 text-white px-4 py-2 rounded-r hover:bg-green-600"
              >
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RedisCLI;

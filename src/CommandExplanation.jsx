import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  color: #e2e8f0;
  background-color: #0f172a;
  line-height: 1.6;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #60a5fa;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const RedisMessage = styled.div`
  font-size: 1.2rem;
  color: #34d399;
  background-color: rgba(52, 211, 153, 0.1);
  border-left: 4px solid #34d399;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 500;
`;

const CommandSection = styled.section`
  background: #1e293b;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CommandTitle = styled.h2`
  font-size: 1.8rem;
  color: #60a5fa;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const CommandDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #94a3b8;
`;

const SubSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SubTitle = styled.h3`
  font-size: 1.2rem;
  color: #e2e8f0;
  margin-bottom: 0.75rem;
  font-weight: 500;
`;

const CodeBlock = styled.pre`
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  background: #2d3748;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  color: #e2e8f0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  background: #2d3748;
  color: #60a5fa;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-top: 1px solid #4a5568;
  color: #e2e8f0;
  font-size: 0.9rem;
`;

const NoteContainer = styled(motion.div)`
  background: #2d3748;
  border-left: 3px solid #60a5fa;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 0 4px 4px 0;
`;

const NoteTitle = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #60a5fa;
`;

const NoteContent = styled.p`
  font-size: 0.9rem;
  color: #94a3b8;
`;

const ExpandButton = styled(motion.button)`
  background: #2d3748;
  border: 1px solid #4a5568;
  color: #60a5fa;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-top: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: #3a4a5f;
  }
`;

const CommandExplanation = () => {
  const [expandedNotes, setExpandedNotes] = useState({});

  const toggleNote = (command) => {
    setExpandedNotes(prev => ({...prev, [command]: !prev[command]}));
  };

  const commands = [
    {
      name: 'PING',
      description: 'Checks the connection with the ElixirCache server.',
      syntax: 'PING',
      returns: 'Simple string reply',
      example: {
        command: 'PING',
        output: 'PONG'
      },
      note: 'Use PING to test if a connection is still alive, or to measure latency.'
    },
    {
      name: 'ECHO',
      description: 'Returns the given string.',
      syntax: 'ECHO message',
      returns: 'Bulk string reply',
      example: {
        command: 'ECHO "Hello, ElixirCache!"',
        output: '"Hello, ElixirCache!"'
      },
      note: 'This command simply returns the exact message it receives.'
    },
    {
      name: 'SET',
      description: 'Sets the value of a key in ElixirCache.',
      syntax: 'SET key value [PX milliseconds]',
      returns: 'Simple string reply',
      examples: [
        {
          command: 'SET mykey "Hello, ElixirCache!"',
          output: 'OK'
        },
        {
          command: 'SET mykey "Hello, ElixirCache!" PX 10000',
          output: 'OK'
        }
      ],
      note: 'The optional PX argument sets an expiration time in milliseconds. Without PX, the key will not expire.'
    },
    {
      name: 'GET',
      description: 'Retrieves the value of a key from ElixirCache.',
      syntax: 'GET key',
      returns: 'Bulk string reply: the value of the key, or nil when the key does not exist.',
      example: {
        command: 'GET mykey',
        output: '"Hello, ElixirCache!"'
      },
      note: 'If the key does not exist, GET returns nil. Handle this case in your application logic.'
    },
    {
      name: 'INCR',
      description: 'Increments the integer value of a key by one.',
      syntax: 'INCR key',
      returns: 'Integer reply: the value of the key after the increment.',
      example: {
        command: 'INCR mycounter',
        output: '1'
      },
      note: "If the key doesn't exist, it's set to 0 before the operation. An error is returned if the value isn't an integer."
    },
    {
      name: 'INFO REPLICATION',
      description: 'Provides information about the replication state of the server.',
      syntax: 'INFO REPLICATION',
      returns: 'Bulk string reply: a collection of key-value pairs about the replication status.',
      examples: [
        {
          title: 'Master Response',
          command: 'INFO REPLICATION',
          output: `role:master
master_replid:8371b4fb1155b71f4a04d3e1bc3e18c4a990aeeb
master_repl_offset:0`
        },
        {
          title: 'Slave Response',
          command: 'INFO REPLICATION',
          output: 'role:slave'
        }
      ],
      note: 'The response differs depending on whether the server is a master or a slave. For a master, it includes the replication ID and offset. For a slave, it simply indicates the role.'
    },
    {
      name: 'WAIT',
      description: 'Waits for the replication of all previous write commands.',
      syntax: 'WAIT numreplicas timeout',
      returns: 'Integer reply: the number of replicas that processed the write commands.',
      example: {
        command: 'WAIT 1 10000',
        output: '1'
      },
      note: "This command waits for replicas to acknowledge the processing of write commands. It returns the number of replicas that processed the commands, up to 'numreplicas'. The 'timeout' is in milliseconds. If there are no pending writes, it immediately returns the number of connected replicas."
    },
    {
      name: 'MULTI',
      description: 'Marks the start of a transaction block.',
      syntax: 'MULTI',
      returns: 'Simple string reply: always OK.',
      example: {
        command: 'MULTI',
        output: 'OK'
      },
      note: "MULTI starts a transaction. All subsequent commands will be queued and executed as a single atomic operation when EXEC is called. If a MULTI is issued inside an existing transaction, an error is returned."
    },
    {
      name: 'EXEC',
      description: 'Executes all commands issued after MULTI.',
      syntax: 'EXEC',
      returns: 'Array reply: each element being the reply to each of the commands in the atomic transaction.',
      example: {
        command: `MULTI
SET key1 "Hello"
SET key2 "World"
EXEC`,
        output: `1) OK
2) OK`
      },
      note: "EXEC executes all queued commands in a transaction and returns their results. If no MULTI command was previously issued, an error is returned. After EXEC, the transaction is automatically closed."
    },
    {
      name: 'DISCARD',
      description: 'Discards all commands issued after MULTI.',
      syntax: 'DISCARD',
      returns: 'Simple string reply: always OK.',
      example: {
        command: `MULTI
SET key1 "Hello"
DISCARD`,
        output: 'OK'
      },
      note: "DISCARD flushes the transaction queue and exits the transaction. If no MULTI command was previously issued, an error is returned."
    },
    {
      name: 'TYPE',
      description: 'Returns the data type of the value stored at the given key.',
      syntax: 'TYPE key',
      returns: 'Simple string reply: type of key, or none when key does not exist.',
      example: {
        command: 'TYPE mykey',
        output: 'string'
      },
      note: 'Possible return values are: string, list, set, zset, hash, stream, or none if the key does not exist.'
    },
    {
      name: 'XADD',
      description: 'Appends a new entry to a stream.',
      syntax: 'XADD key ID field value [field value ...]',
      returns: 'The ID of the added entry as a string.',
      examples: [
        {
          command: 'XADD mystream 1526919030474-0 sensor_id 1234 temperature 19.8',
          output: '1526919030474-0'
        },
        {
          command: 'XADD mystream * sensor_id 5678 humidity 65.2',
          output: '1526919030475-0'
        }
      ],
      note: `Streams are a data type representing a log data structure. Each entry in a stream is composed of one or more field-value pairs.
      
      The ID can be either specified explicitly (e.g., '1526919030474-0') or auto-generated using '*'.
      
      When using '*' as the ID, ElixirCache automatically generates a unique ID for the entry.
      
      The auto-generated ID is a combination of a millisecond timestamp and a sequence number, ensuring uniqueness and preserving chronological order.`
    },
    {
      name: 'XRANGE',
      description: 'Returns the stream entries matching a given range of IDs.',
      syntax: 'XRANGE key start end',
      returns: 'Array reply: list of stream entries.',
      examples: [
        {
          command: 'XRANGE mystream 1526919030474-0 1526919030475-0',
          output: `1) 1) 1526919030474-0
   2) 1) "sensor_id"
      2) "1234"
      3) "temperature"
      4) "19.8"
2) 1) 1526919030475-0
   2) 1) "sensor_id"
      2) "5678"
      3) "humidity"
      4) "65.2"`
        },
        {
          command: 'XRANGE mystream - +',
          output: `1) 1) 1526919030474-0
   2) 1) "sensor_id"
      2) "1234"
      3) "temperature"
      4) "19.8"
2) 1) 1526919030475-0
   2) 1) "sensor_id"
      2) "5678"
      3) "humidity"
      4) "65.2"`
        }
      ],
      note: `XRANGE returns the entries with IDs matching the specified range.
      
      Use '-' for the lowest ID and '+' for the highest ID.
      
      Each entry is returned as a two-element array containing the ID and a list of field-value pairs.`
    },
    {
      name: 'XREAD',
      description: 'Reads data from one or more streams, only returning entries with an ID greater than the last received ID.',
      syntax: 'XREAD STREAMS key [key ...] ID [ID ...]',
      returns: 'Array reply: list of stream entries.',
      example: {
        command: 'XREAD STREAMS mystream 1526919030474-0',
        output: `1) 1) "mystream"
   2) 1) 1) 1526919030475-0
         2) 1) "sensor_id"
            2) "5678"
            3) "humidity"
            4) "65.2"`
      },
      note: `XREAD allows reading from multiple streams.
      
      The ID specified for each stream is the last ID already known to the client.
      
      Use '$' as the ID to only get entries added after the command is called.`
    }
  ];

  return (
    <Container>
      <Title>ElixirCache Commands</Title>
      <RedisMessage>
        If you're familiar with Redis, there's no extra learning curve for ElixirCache! 
        ElixirCache supports the Redis protocol, so you can start using it right away. 
        Head to the demo to test it out!
      </RedisMessage>
      {commands.map((command) => (
        <CommandSection key={command.name}>
          <CommandTitle>{command.name}</CommandTitle>
          <CommandDescription>{command.description}</CommandDescription>
          
          <SubSection>
            <SubTitle>Syntax</SubTitle>
            <CodeBlock>{command.syntax}</CodeBlock>
          </SubSection>
          
          <SubSection>
            <SubTitle>Return Value</SubTitle>
            <p>{command.returns}</p>
          </SubSection>
          
          <SubSection>
            <SubTitle>Example{command.examples ? 's' : ''}</SubTitle>
            <Table>
              <thead>
                <tr>
                  <Th>Command</Th>
                  <Th>Output</Th>
                </tr>
              </thead>
              <tbody>
                {command.examples ? (
                  command.examples.map((ex, index) => (
                    <tr key={index}>
                      <Td>{ex.title ? `${ex.title}:\n` : ''}<pre style={{whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0}}>{ex.command}</pre></Td>
                      <Td><pre style={{whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0}}>{ex.output}</pre></Td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <Td><pre style={{whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0}}>{command.example.command}</pre></Td>
                    <Td><pre style={{whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0}}>{command.example.output}</pre></Td>
                  </tr>
                )}
              </tbody>
            </Table>
          </SubSection>
          
          <ExpandButton
            onClick={() => toggleNote(command.name)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {expandedNotes[command.name] ? 'Hide Note' : 'Show Note'}
          </ExpandButton>
          
          <AnimatePresence>
            {expandedNotes[command.name] && (
              <NoteContainer
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <NoteTitle>Note</NoteTitle>
                <NoteContent>{command.note}</NoteContent>
              </NoteContainer>
            )}
          </AnimatePresence>
        </CommandSection>
      ))}
    </Container>
  );
};

export default CommandExplanation;
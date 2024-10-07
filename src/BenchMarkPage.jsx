import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiCpu, FiUsers, FiLayers, FiBox, FiRepeat, FiCheckCircle } from 'react-icons/fi';

const BenchmarkPageWrapper = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  min-height: 100vh;
  width: 100%;
  color: #e2e8f0;
  font-family: 'Inter', sans-serif;
`;

const BenchmarkContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
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

const BenchmarkDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #94a3b8;
`;

const ConfigSection = styled.div`
  background: rgba(30, 41, 59, 0.8);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ConfigTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const ConfigGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const ConfigItem = styled.div`
  display: flex;
  align-items: center;
  color: #94a3b8;
  font-size: 1rem;

  svg {
    margin-right: 0.5rem;
    color: #60a5fa;
  }
`;

const CommandSection = styled.div`
  margin-bottom: 3rem;
`;

const CommandTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const CommandBlock = styled.div`
  background: #1e293b;
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  color: #60a5fa;
`;

const ResultsSection = styled.div`
  margin-bottom: 3rem;
`;

const ChartContainer = styled.div`
  background: rgba(30, 41, 59, 0.8);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 1rem;
  overflow: hidden;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background: rgba(15, 23, 42, 0.8);
  color: #ffffff;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  color: #94a3b8;
`;

const ResultOverview = styled.div`
  background: rgba(30, 41, 59, 0.8);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const OverviewTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const OverviewList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const OverviewItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #94a3b8;

  svg {
    margin-right: 0.5rem;
    color: #34d399;
  }
`;

const BenchmarkPage = () => {
  const latencyData = [
    { name: 'Average', Sets: 2.17728, Gets: 2.16379 },
    { name: 'p50', Sets: 1.82300, Gets: 1.81500 },
    { name: 'p99', Sets: 8.25500, Gets: 8.19100 },
    { name: 'p99.9', Sets: 14.01500, Gets: 13.88700 },
  ];

  const chartConfig = {
    style: {
      background: 'transparent',
    },
    cursor: {
      fill: 'none',
      stroke: '#60a5fa',
    },
  };

  return (
    <BenchmarkPageWrapper>
      <BenchmarkContainer>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ElixirCache Performance Benchmarks
        </SectionTitle>
        
        <BenchmarkDescription>
          We used Memtier, a powerful benchmarking tool designed for key-value databases, to evaluate ElixirCache's performance. This benchmark simulates a real-world scenario with a balanced read/write workload, stress-testing ElixirCache under high concurrency.
        </BenchmarkDescription>

        <ConfigSection>
          <ConfigTitle>Benchmark Configuration</ConfigTitle>
          <ConfigGrid>
            <ConfigItem><FiCpu /> CPU: Intel Core i5 11th Gen</ConfigItem>
            <ConfigItem><FiUsers /> Clients: 30</ConfigItem>
            <ConfigItem><FiLayers /> Threads: 10</ConfigItem>
            <ConfigItem><FiBox /> Data Size: 256 bytes</ConfigItem>
            <ConfigItem><FiRepeat /> Total Requests: 100,000</ConfigItem>
          </ConfigGrid>
        </ConfigSection>

        <CommandSection>
          <CommandTitle>Running the Benchmark</CommandTitle>
          <CommandBlock>
            $ memtier_benchmark -s localhost -p 6379 \<br />
            &nbsp;&nbsp;&nbsp;&nbsp;--clients 30 --threads 10 \<br />
            &nbsp;&nbsp;&nbsp;&nbsp;--ratio=1:1 --hide-histogram \<br />
            &nbsp;&nbsp;&nbsp;&nbsp;--data-size 256 --requests=100000
          </CommandBlock>
        </CommandSection>

        <ResultsSection>
          <ChartContainer>
            <ChartTitle>Latency Distribution (ms)</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={latencyData} {...chartConfig}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#1e293b', border: 'none' }} />
                <Legend />
                <Line type="monotone" dataKey="Sets" stroke="#60a5fa" />
                <Line type="monotone" dataKey="Gets" stroke="#34d399" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          <Table>
            <thead>
              <tr>
                <Th>Type</Th>
                <Th>Ops/sec</Th>
                <Th>Hits/sec</Th>
                <Th>Misses/sec</Th>
                <Th>Avg. Latency</Th>
                <Th>p50 Latency</Th>
                <Th>p99 Latency</Th>
                <Th>p99.9 Latency</Th>
                <Th>KB/sec</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>Sets</Td>
                <Td>68695.05</Td>
                <Td>-</Td>
                <Td>-</Td>
                <Td>2.17728</Td>
                <Td>1.82300</Td>
                <Td>8.25500</Td>
                <Td>14.01500</Td>
                <Td>20386.22</Td>
              </tr>
              <tr>
                <Td>Gets</Td>
                <Td>68695.05</Td>
                <Td>186.31</Td>
                <Td>68508.74</Td>
                <Td>2.16379</Td>
                <Td>1.81500</Td>
                <Td>8.19100</Td>
                <Td>13.88700</Td>
                <Td>2723.06</Td>
              </tr>
              <tr>
                <Td>Totals</Td>
                <Td>137390.11</Td>
                <Td>186.31</Td>
                <Td>68508.74</Td>
                <Td>2.17053</Td>
                <Td>1.82300</Td>
                <Td>8.25500</Td>
                <Td>13.95100</Td>
                <Td>23109.29</Td>
              </tr>
            </tbody>
          </Table>

          <ResultOverview>
            <OverviewTitle>Key Performance Insights</OverviewTitle>
            <OverviewList>
              <OverviewItem>
                <FiCheckCircle /> Total throughput: 137,390.11 ops/sec, evenly split between GETs and SETs
              </OverviewItem>
              <OverviewItem>
                <FiCheckCircle /> Average latency: 2.17053 ms, showcasing rapid response times
              </OverviewItem>
              <OverviewItem>
                <FiCheckCircle /> p99 latency: 8.25500 ms, indicating consistent performance even under high load
              </OverviewItem>
              <OverviewItem>
                <FiCheckCircle /> Data transfer rate: 23,109.29 KB/sec, demonstrating efficient data handling
              </OverviewItem>
            </OverviewList>
          </ResultOverview>
        </ResultsSection>

        <BenchmarkDescription>
          These results highlight ElixirCache's capability to handle high-concurrency environments with minimal resource consumption. The balanced performance between read and write operations makes ElixirCache an ideal choice for applications requiring real-time processing and rapid response times.
        </BenchmarkDescription>
      </BenchmarkContainer>
    </BenchmarkPageWrapper>
  );
};

export default BenchmarkPage;
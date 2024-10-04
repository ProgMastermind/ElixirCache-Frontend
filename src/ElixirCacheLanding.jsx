import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, OrbitControls } from '@react-three/drei';

const HeroSection = () => (
  <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
    <Canvas className="absolute inset-0">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={false} enablePan={false} />
      <AnimatedCube />
    </Canvas>
    <div className="relative z-10 text-center">
      <motion.h1 
        className="text-6xl font-bold text-white mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        ElixirCache
      </motion.h1>
      <motion.p 
        className="text-xl text-purple-200 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Unleash the power of lightning-fast data storage
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <button className="bg-purple-500 text-white px-8 py-3 rounded-full text-lg font-semibold mr-4 hover:bg-purple-600 transition duration-300">
          Documentation
        </button>
        <button className="bg-transparent border-2 border-purple-500 text-purple-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-500 hover:text-white transition duration-300">
          Try It Now
        </button>
      </motion.div>
    </div>
  </div>
);

const AnimatedCube = () => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <Box ref={meshRef} args={[3, 3, 3]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#8B5CF6" />
      <Text
        position={[0, 0, 1.51]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Elixir
      </Text>
      <Text
        position={[1.51, 0, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI / 2, 0]}
      >
        Cache
      </Text>
    </Box>
  );
};

const FeatureSection = ({ title, description, icon }) => (
  <motion.div 
    className="bg-white rounded-lg p-6 shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="text-purple-600 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const ElixirCacheLanding = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <HeroSection />
      
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">Why ElixirCache?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureSection 
              title="Blazing Fast"
              description="Experience unparalleled speed with our optimized in-memory storage system."
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>}
            />
            <FeatureSection 
              title="Highly Scalable"
              description="Grow your application with confidence, knowing ElixirCache can handle the load."
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>}
            />
            <FeatureSection 
              title="Easy Integration"
              description="Seamlessly integrate with your existing stack using our comprehensive API."
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>}
            />
          </div>
        </div>
      </section>

      <section className="bg-purple-900 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to supercharge your application?</h2>
          <button className="bg-white text-purple-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-200 transition duration-300">
            Get Started Now
          </button>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 ElixirCache. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ElixirCacheLanding;
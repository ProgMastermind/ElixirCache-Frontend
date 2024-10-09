import React, { useEffect, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { FiZap, FiBook, FiDatabase, FiServer, FiCloud, FiHardDrive, FiCpu, FiLayers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import DesktopModePopup from './DesktopModePopup';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(96, 165, 250, 0); }
  100% { box-shadow: 0 0 0 0 rgba(96, 165, 250, 0); }
`;

const rotateAnimation = keyframes`
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`;

const HeroContainer = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(15, 23, 42, 0.9); // Slightly darker, more opaque background
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #60a5fa;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SmallLogo = styled.div`
  width: 40px;
  height: 40px;
`;

const LogoText = styled.span`
  background: linear-gradient(to right, #60a5fa, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem;
  font-weight: 900;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled.a`
  color: #94a3b8; // Lighter base color
  text-decoration: none;
  font-weight: 500; // Increased font weight
  font-size: 1 rem; // Slightly larger font size
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;
  cursor: pointer;

  &:hover {
    color: #60a5fa; // Brighter color on hover
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #60a5fa, #34d399);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  flex-grow: 1;
  position: relative;
  z-index: 1;
`;

const TextContent = styled.div`
  max-width: 60%;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
  background: linear-gradient(to right, #94a3b8, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnimation} 5s ease infinite;
  background-size: 200% 200%;
`;

const HighlightedText = styled.span`
  background: linear-gradient(to right, #60a5fa, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 4.5rem;
  font-weight: 900;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: #94a3b8;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Button = styled(motion.a)`
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &.primary {
    background: linear-gradient(to right, #60a5fa, #34d399);
    color: #ffffff;
    &:hover {
      box-shadow: 0 0 20px rgba(96, 165, 250, 0.5);
      animation: ${pulseAnimation} 1.5s infinite;
    }
  }

  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: #60a5fa;
    }
  }
`;

const LogoContainer = styled(motion.div)`
  width: 40%;
  height: 400px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RotatingCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 360px;
  height: 360px;
  border: 2px dashed rgba(96, 165, 250, 0.3);
  border-radius: 50%;
  animation: ${rotateAnimation} 20s linear infinite;
`;

const LogoSVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const CentralLogo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AnimatedPath = styled(motion.path)`
  fill: none;
  stroke: url(#logoGradient);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const AnimatedCircle = styled(motion.circle)`
  fill: url(#logoGradient);
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  font-size: 1.5rem;
  color: ${props => props.color || '#60a5fa'};
  animation: ${floatAnimation} ${props => props.duration || '3s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const BackgroundAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
`;

const AnimatedBackgroundCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.color};
  opacity: 0.5;
`;

const ElixirCacheLogo = () => {
  return (
    <CentralLogo>
      <LogoSVG viewBox="0 0 200 200">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <AnimatedPath
            d="M100,10 L178,55 L178,145 L100,190 L22,145 L22,55 Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <AnimatedPath
            d="M100,40 L150,70 L150,130 L100,160 L50,130 L50,70 Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />
          <AnimatedCircle
            cx="100" cy="100" r="30"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          />
          <AnimatedPath
            d="M100,70 L100,40 M100,160 L100,130 M50,70 L22,55 M150,70 L178,55 M50,130 L22,145 M150,130 L178,145"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 2 }}
          />
          <AnimatedPath
            d="M90,85 L85,105 L115,105 L110,125"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 2.5 }}
          />
        </motion.g>
      </LogoSVG>
    </CentralLogo>
  );
};

const AnimatedBackground = () => {
  const particleCount = 50;
  const colors = ['#60a5fa', '#34d399', '#f472b6', '#fbbf24', '#a78bfa'];

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 20 + 10,
    }));
  }, []);

  return (
    <BackgroundAnimation>
      {particles.map((particle, index) => (
        <AnimatedBackgroundCircle
          key={index}
          style={{
            top: `${particle.y}%`,
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          color={particle.color}
          animate={{
            y: ['0%', '100%'],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </BackgroundAnimation>
  );
};

const ElixirCacheHero = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      y: ["0%", "100%"],
      transition: {
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
        delay: i * 0.2,
      },
    }));
  }, [controls]);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroContainer>
      <AnimatedBackground />
      <NavBar>
        <Logo>
          <SmallLogo>
            <LogoSVG viewBox="0 0 200 200">
              <defs>
                <linearGradient id="smallLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>
              <path
                d="M100,10 L178,55 L178,145 L100,190 L22,145 L22,55 Z"
                fill="none"
                stroke="url(#smallLogoGradient)"
                strokeWidth="10"
              />
              <path
                d="M100,40 L150,70 L150,130 L100,160 L50,130 L50,70 Z"
                fill="none"
                stroke="url(#smallLogoGradient)"
                strokeWidth="8"
              />
              <circle cx="100" cy="100" r="30" fill="url(#smallLogoGradient)" />
            </LogoSVG>
          </SmallLogo>
          <LogoText>ElixirCache</LogoText>
        </Logo>
        <NavLinks>
          <NavLink onClick={scrollToFeatures}>Features</NavLink>
          <NavLink href="/benchmarks">Benchmarks</NavLink>
          <NavLink href="/documentation">Docs</NavLink>
        </NavLinks>
      </NavBar>
      <ContentWrapper>
        <TextContent>
          <Title
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Supercharge Your Data with{' '}
            <HighlightedText>ElixirCache</HighlightedText>
          </Title>
          <Subtitle
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Experience lightning-fast, scalable, and reliable data storage for your
            modern applications. ElixirCache empowers developers to build
            high-performance systems with ease.
          </Subtitle>
          <ButtonGroup>
            <Button
              className="primary"
              href="/demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiZap /> Try Demo
            </Button>
            <Button
              className="secondary"
              href="/documentation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiBook /> Documentation
            </Button>
          </ButtonGroup>
        </TextContent>
        <LogoContainer
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring' }}
        >
          <RotatingCircle />
          <ElixirCacheLogo />
          <FloatingIcon
            as={FiServer}
            style={{ top: '10%', left: '10%' }}
            color="#34d399"
            duration="4s"
            delay="0s"
          />
          <FloatingIcon
            as={FiCloud}
            style={{ bottom: '20%', right: '15%' }}
            color="#60a5fa"
            duration="5s"
            delay="1s"
          />
          <FloatingIcon
            as={FiHardDrive}
            style={{ top: '30%', right: '10%' }}
            color="#f472b6"
            duration="4.5s"
            delay="0.5s"
          />
          <FloatingIcon
            as={FiCpu}
            style={{ bottom: '15%', left: '20%' }}
            color="#fbbf24"
            duration="3.5s"
            delay="1.5s"
          />
          <FloatingIcon
            as={FiLayers}
            style={{ top: '40%', left: '5%' }}
            color="#a78bfa"
            duration="5.5s"
            delay="2s"
          />
        </LogoContainer>
      </ContentWrapper>
      <DesktopModePopup />
    </HeroContainer>
  );
};

export default ElixirCacheHero;
import React from 'react';
import styled from 'styled-components';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const FooterWrapper = styled.footer`
  background: #0f172a;
  color: #94a3b8;
  padding: 2rem 0;
  border-top: 1px solid #1e293b;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoText = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: 0.5px;
`;

const Divider = styled.span`
  color: #1e293b;
  font-size: 1.2rem;
`;

const TechStack = styled.div`
  font-size: 0.9rem;
  color: #64748b;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  color: #64748b;
  font-size: 1.2rem;
  transition: color 0.2s ease;

  &:hover {
    color: #60a5fa;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <LogoSection>
          <LogoText>ElixirCache</LogoText>
          <Divider>|</Divider>
          <TechStack>React • Elixir </TechStack>
        </LogoSection>
        <SocialIcons>
          <SocialIcon href="https://github.com/ProgMastermind/Elixir_Backend" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub />
          </SocialIcon>
          <SocialIcon href="https://www.linkedin.com/in/soulglory/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </SocialIcon>
          <SocialIcon href="https://x.com/PrakashCollymo1" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FiTwitter />
          </SocialIcon>
        </SocialIcons>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;
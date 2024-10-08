import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiMonitor } from 'react-icons/fi';

const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const PopupContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #94a3b8;
  padding: 12px 16px;
  z-index: 1000;
  animation: ${slideUp} 0.3s ease-out;
  border-top: 1px solid #60a5fa;
  display: flex;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const PopupText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DesktopModePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isNarrowScreen = window.innerWidth < 768;
      setIsVisible(isMobileDevice && isNarrowScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isVisible) return null;

  return (
    <PopupContainer>
      <IconWrapper>
        <FiMonitor size={20} color="#60a5fa" />
      </IconWrapper>
      <PopupText>
        For best experience, switch to desktop version
      </PopupText>
    </PopupContainer>
  );
};

export default DesktopModePopup;
import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiMonitor, FiX } from 'react-icons/fi';

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
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const PopupText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  display: flex;
  align-items: center;
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: #60a5fa;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const DesktopModePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkMobileAndViewport = useCallback(() => {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isNarrowScreen = window.innerWidth < 768;
    const viewportWidth = document.documentElement.clientWidth;
    const isLikelyDesktopMode = viewportWidth > window.innerWidth * 1.2;

    setIsVisible(isMobileDevice && isNarrowScreen && !isLikelyDesktopMode);
  }, []);

  useEffect(() => {
    checkMobileAndViewport();

    const handleResize = debounce(checkMobileAndViewport, 250);
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', checkMobileAndViewport);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', checkMobileAndViewport);
    };
  }, [checkMobileAndViewport]);

  if (!isVisible) return null;

  return (
    <PopupContainer>
      <PopupText>
        <FiMonitor style={{ marginRight: '8px', color: '#60a5fa' }} />
        For best experience,<br />switch to desktop version.
      </PopupText>
      <CancelButton onClick={() => setIsVisible(false)} aria-label="Close">
        <FiX />
      </CancelButton>
    </PopupContainer>
  );
};

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default DesktopModePopup;
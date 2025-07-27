import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const updateResponsive = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
      setIsDesktop(width > 1024);
    };

    // Initialisation
    updateResponsive();

    // Écouter les changements de taille
    window.addEventListener('resize', updateResponsive);

    return () => {
      window.removeEventListener('resize', updateResponsive);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop,
    windowWidth,
    isSmallScreen: windowWidth <= 480,
    isMediumScreen: windowWidth > 480 && windowWidth <= 768,
    isLargeScreen: windowWidth > 768
  };
};

// Hook pour les styles responsives
export const useResponsiveStyles = () => {
  const { isMobile, isSmallScreen, windowWidth } = useResponsive();

  const getResponsiveValue = (mobileValue, desktopValue) => {
    return isMobile ? mobileValue : desktopValue;
  };

  const getResponsivePadding = () => {
    if (isSmallScreen) return '12px 16px';
    if (isMobile) return '16px 20px';
    return '20px 24px';
  };

  const getResponsiveFontSize = (mobile, tablet, desktop) => {
    if (isSmallScreen) return mobile;
    if (isMobile) return tablet || mobile;
    return desktop || tablet || mobile;
  };

  const getResponsiveButtonSize = () => {
    if (isSmallScreen) return { minHeight: '48px', padding: '14px 18px' };
    if (isMobile) return { minHeight: '44px', padding: '12px 16px' };
    return { minHeight: 'auto', padding: '12px 24px' };
  };

  const getResponsiveInputSize = () => {
    if (isSmallScreen) return { minHeight: '48px', padding: '16px 18px', fontSize: '16px' };
    if (isMobile) return { minHeight: '44px', padding: '12px 16px', fontSize: '16px' };
    return { minHeight: 'auto', padding: '12px 16px', fontSize: '16px' };
  };

  return {
    isMobile,
    isSmallScreen,
    windowWidth,
    getResponsiveValue,
    getResponsivePadding,
    getResponsiveFontSize,
    getResponsiveButtonSize,
    getResponsiveInputSize
  };
}; 
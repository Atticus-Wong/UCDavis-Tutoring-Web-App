import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, Theme, useTheme } from '@mui/material';
import Image from 'next/image';
const BongoCat = () => {
  const [scale, setScale] = useState(1);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const checkScreenSize = () => {
      const baseWidth = 1200;
      const currentWidth = window.innerWidth;
      const newScale = Math.max(0.5, Math.min(1, currentWidth / baseWidth));
      setScale(newScale);
    };


    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <Box
      sx={{
        marginTop: {md: '1.5rem'},
        marginLeft: {md: '1.5rem'},
        transform: {md: `scale(${scale})`},
        transformOrigin: {xs: 'center', sm: 'center', md: 'top-right'},
        transition: 'transform 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        {!isMd && <Image src="/Howdy Bubble.svg" width={200} height={1} alt="Howdy Bubble" style={{ maxWidth: '100%', height: 'auto' }} />}
        {isMd && <Image src="/Howdy Bubble.svg" width={200} height={1} alt="Howdy Bubble" style={{ maxWidth: '100%', height: 'auto' }} />}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Image src="/Bongo Tiger PC Simplified(1).svg" width={500} height={1} alt="logo" style={{ maxWidth: '100%', height: 'auto' }} />
      </Box>
    </Box>
  );
};

export default BongoCat;
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

const BongoCat = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const checkScreenSize = () => {
      const baseWidth = 1200;
      const currentWidth = window.innerWidth;
      const newScale = Math.max(0.5, Math.min(1, currentWidth / baseWidth));
      setScale(newScale);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <Box
      sx={{
        marginTop: '1.5rem',
        marginLeft: '1.5rem',
        transform: `scale(${scale})`,
        transformOrigin: 'top right',
        transition: 'transform 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <img src="Howdy Bubble.svg" alt="Howdy Bubble" style={{ maxWidth: '100%', height: 'auto' }} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <img src="/Bongo Tiger PC Simplified(1).svg" width="85%" alt="logo" style={{ maxWidth: '100%', height: 'auto' }} />
      </Box>
    </Box>
  );
};

export default BongoCat;
import React from 'react';
import { Button } from '@mui/material';

  const gradientButtonStyles = {
    Width: '100%',
    background: 'linear-gradient(120deg, rgba(255, 222, 40, 0.75), rgba(255, 222, 40, 0.1))',
    fontFamily: 'Sunflower',
    borderRadius: '12px',
    paddingX: '3rem',
    fontSize: '1.25rem',
    color: '#F7F7F7',
    textTransform: 'none',
    position: 'relative',
    isolation: 'isolate',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: '12px',
      padding: '2px',
      background: 'linear-gradient(90deg, #E5D477 0%, #5E5419 100%)',
      WebkitMask: 
        'linear-gradient(#fff 0 0) content-box, ' +
        'linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      pointerEvents: 'none',
    },
    '&:hover': {
      background: 'linear-gradient(to right, rgba(255, 222, 40, 0.8), rgba(255, 222, 40, 0.1))',
      '&::before': {
        opacity: 0.8, 
      },
    },
  };

export default gradientButtonStyles;
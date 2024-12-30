import React from 'react';
import { Button } from '@mui/material';

const gradientButtonStyles = {
  width: '100%', 
  background: 'linear-gradient(120deg, rgba(255, 222, 40, 0.75), rgba(255, 222, 40, 0.1))',
  fontFamily: 'Sunflower',
  borderRadius: '12px',
  paddingX: {xs: '1.25rem', sm: '1.5rem', md: '2rem'},
  fontSize: {xs: '0.9rem', sm: '1.25rem', md: '1rem'},
  color: '#F7F7F7',
  textTransform: 'none',
  position: 'relative',
  isolation: 'isolate',
  overflow: 'hidden',
  whiteSpace: 'nowrap', 
  textOverflow: 'ellipsis', 
  '& .MuiButton-label': { 
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
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
import React, { useEffect } from 'react';
import { Box } from '@mui/material';

type OverlayProps = {
  isVisible: boolean;
  onClose: () => void;  
  zIndex: number
};

const Overlay: React.FC<OverlayProps> = ({ isVisible, onClose, zIndex }) => {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Box
      onClick={onClose}  
      sx={{
        cursor: 'pointer',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: {zIndex},
      }}
    />
  );
};

export default Overlay;
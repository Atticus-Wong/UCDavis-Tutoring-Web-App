import React from 'react';
import { Box } from '@mui/material';

type OverlayProps = {
  isVisible: boolean;
};

const Overlay: React.FC<OverlayProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
      }}
    />
  );
};

export default Overlay;

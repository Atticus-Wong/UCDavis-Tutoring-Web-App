import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { KeyboardArrowRight } from "@mui/icons-material";
import Image from "next/image";
type SeeAllChannelProps = {
  onClose: () => void;  
}

const SeeAllChannels: React.FC<SeeAllChannelProps> = ({ onClose}) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <Box 
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1300,
          '@media (min-width: 900px)': {
            left: '57%', // custom breakpoint at 900px
          },
          '@media (min-width: 1200px)': {
            left: '53%', // custom breakpoint at 900px
          },
        }}
      >
        <Image src="/See All Channels.png" alt="See All channels" width={250} height={700}/>
        { isMd &&
          <Box display='flex' flexDirection='row' gap={1} justifyContent='center' alignItems='center' onClick={onClose}>
            <Typography>Back</Typography>
            <KeyboardArrowRight sx={{ fontSize: '1rem' }}/>
          </Box>
        }
      </Box>
    </>
  )
}

export default SeeAllChannels;

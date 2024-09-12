import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { OFF_WHITE } from '../utils/constants';
import gradientButtonStyles from './GradientButtonStyle';
import Link from 'next/link';
const TutoringCards = () => {
  const boxStyle = {
    width: '30%',
    minHeight: '350px',
    backgroundColor: '#242424',
    borderRadius: '8px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,
      margin: '-1px',
      borderRadius: 'inherit',
      background: 'linear-gradient(210deg, #978000 0%, #FFDE28 17%, #FFFFEC 43%, #FFDE28 81%, #978000 100%)'
    }
  };

  const titleStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem'
  };

  const numberStyle = {
    fontFamily: 'Hanuman',
    fontSize: '3rem',
    fontWeight: 'bold',
    marginRight: '1rem',
    background: 'linear-gradient(-15deg, rgba(255,222,40,0.7) 38%, rgba(255,222,40,0.1) 99%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent'
  };

  return (
    <Box sx={{ 
      marginTop: '5vh', 
      display: 'flex', 
      flexDirection: 'row', 
      justifyContent: 'space-between',  
    }}>
      <Box sx={boxStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src='discord(whiskers).svg' width='60%'alt='logo' />
        </Box>
        <Box sx={titleStyle}>
          <Typography sx={numberStyle}>1.</Typography>
          <Typography sx={{ fontFamily: 'Inter', color: {OFF_WHITE}, fontSize: '1.5rem' }}>Join our discord</Typography>
        </Box>
        <Typography sx={{ color: {OFF_WHITE}, fontFamily: 'Inter', fontSize: '1rem', marginBottom: '3rem' }}>After joining our Discord Server, remember to verify your account with your UC Davis student email.</Typography>
        <Link href="https://discord.com/invite/HXfwHbYF7f" target="_blank">
          <Button sx={{
            width: '100%',
            background: 'linear-gradient(120deg, rgba(255, 222, 40, 0.75), rgba(255, 222, 40, 0.1))',
            fontFamily: 'Sunflower',
            borderRadius: '12px',
            paddingX: '3rem',
            paddingY: '0.55rem',
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
          }}>
            <Typography sx={{ fontFamily: 'Sunflower', fontSize: '1.25rem', marginRight: '0.5rem' }}>DISCORD</Typography>
            <img src='discord(white).svg' alt='logo' />
          </Button>
        </Link>
      </Box>

      <Box sx={boxStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingY: '0.4rem' }}>
          <img src='hours.svg' width='27%'alt='logo' />
        </Box>
        <Box sx={titleStyle}>
          <Typography sx={numberStyle}>2.</Typography>
          <Typography sx={{ fontFamily: 'Inter', color: {OFF_WHITE}, fontSize: '1.5rem' }}>Check hours</Typography>
        </Box>
        <Typography sx={{ color: {OFF_WHITE}, fontFamily: 'Inter', fontSize: '1rem', marginBottom: '1rem' }}>Go to Tutoring Hours to see if any tutors are available for tutoring.</Typography>
        <Typography sx={{ color: {OFF_WHITE}, fontFamily: 'Inter', fontSize: '1rem', marginBottom: '2rem' }}>You can also schedule tutoring at</Typography>
          <Link href='/tutoringHours'>
          <Button sx={{
            width: '100%',
            background: 'linear-gradient(120deg, rgba(255, 222, 40, 0.75), rgba(255, 222, 40, 0.1))',
            fontFamily: 'Sunflower',
            borderRadius: '12px',
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
          }}>
            TUTORING HOURS
          </Button>
        </Link>
      </Box>

      <Box sx={boxStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingY: '0.8rem' }}>
          <img src='queue logo.svg' width='35%'alt='logo' />
        </Box>
        <Box sx={titleStyle}>
          <Typography sx={numberStyle}>3.</Typography>
          <Typography sx={{ fontFamily: 'Inter', color: {OFF_WHITE}, fontSize: '1.5rem' }}>Check queue</Typography>
        </Box>
        <Typography sx={{ color: {OFF_WHITE}, fontFamily: 'Inter', fontSize: '1rem', marginBottom: '1rem' }}>Make sure that there are no students waiting before you.</Typography>
        <Typography sx={{ color: {OFF_WHITE}, fontFamily: 'Inter', fontSize: '1rem' }}>Please open the server dropdown and check "Show all Channels" to see queue channels.<span style={{color: '#242424'}}>_</span> 
          <img src='(i) icon.svg' alt='logo' />
          
          </Typography>
      </Box>
    </Box>
  );
};

export default TutoringCards;
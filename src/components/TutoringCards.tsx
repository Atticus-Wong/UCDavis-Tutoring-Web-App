import React, { useRef, useState } from 'react';
import { Box, Button, Typography, useMediaQuery, Theme, useTheme } from '@mui/material';
import gradientButtonStyles from './GradientButtonStyle';
import Link from 'next/link';
import Overlay from './Overlay';
import SeeAllChannels from './SeeAllChannels';

const TutoringCards = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const openForm = () => {
    setIsFormOpen(true);
  }
  const closeForm = () => {
    setIsFormOpen(false);
  }

  const boxStyle = {
    width: {xs: '100%', sm: '100%', md: '30%'},
    minHeight: {xs: '350px', sm: '375px', md: '425px'},
    minWidth: {xs: '320px' },
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

  const gradientBorderStyle = {
    width: {xs: '100%', sm: '100%', md: '30%'},
    minHeight: {xs: '350px', sm: '375px', md: '425px'},
    minWidth: {xs: '320px' },
    borderRadius: '8px',
    padding: '1px', // This creates space for the gradient border
    background: 'linear-gradient(210deg, #978000 0%, #FFDE28 17%, #FFFFEC 43%, #FFDE28 81%, #978000 100%)',
  };

  const innerBoxStyle = {
    width: '100%',
    height: '100%',
    minHeight: {xs: '350px', sm: '375px', md: '425px'},
    backgroundColor: '#242424',
    borderRadius: '7px', // Slightly smaller to show the gradient border
    paddingTop: '2rem',
    paddingX: '2rem',
    display: 'flex',
    flexDirection: 'column',
  };

  const titleStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    justifyContent: {xs: 'center', sm: 'center', md: 'left'}
  };

  const numberStyle = {
    fontFamily: 'Hanuman',
    fontSize: {xs: '2rem', sm: '2.5rem', md: '3rem'},
    fontWeight: 'bold',
    textAlign: {xs: 'center', sm: 'left', md:'left'},
    marginRight: '1rem',
    background: 'linear-gradient(-15deg, rgba(255,222,40,0.7) 38%, rgba(255,222,40,0.1) 99%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent'
  };

  return (
    <Box marginTop='5vh' display='flex' flexDirection={{xs: 'column', sm: 'column', md: 'row'}} alignItems={{xs: 'center', sm: 'center'}} justifyContent='space-between' gap={{xs: 5, sm: 2, md: 2}}>
      <Box sx={boxStyle}>
        <Box display='flex' justifyContent='center' marginTop='1rem'>
          <img src='Discord(no_whiskers).svg' width='30%'alt='logo' />
        </Box>
        <Box sx={{...titleStyle, marginTop: '0.6rem' }}>
          <Typography sx={{...numberStyle}}>1.</Typography>
          <Typography fontSize={{xs: '1.25rem', sm: '1.5rem', md: '1.5rem'}}>Join our discord</Typography>
        </Box>
        <Typography marginBottom='3rem' fontSize={{xs: '0.85rem', sm: '0.85rem', md: '1rem'}} textAlign={{xs: 'center', sm: 'center', md: 'left'}}>After joining our Discord Server, remember to verify your account with your UC Davis student email.</Typography>
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
          <Typography variant='h2'>Check hours</Typography>
        </Box>
        <Typography marginBottom={{xs: '3rem', sm: '4.5rem', md: '4.5rem'}} fontSize={{xs: '0.85rem', sm: '0.85rem', md: '1rem'}} textAlign={{xs: 'center', sm: 'center', md: 'left'}}>Go to Tutoring Hours to see if any tutors are available for tutoring.</Typography>
          <Link href='/tutoringHours'>
          <Button variant='outlined' sx={{borderRadius: '8px', border: '2px solid', fontSize: '1.25rem', width: '100%'}}> 
            TUTORING HOURS
          </Button>
        </Link>
      </Box>

      <Box sx={{
        ...gradientBorderStyle,
        position: isFormOpen ? 'relative' : 'static',
        zIndex: isFormOpen && !isMd ? 1300 : 'auto',
      }}>
        <Box sx={innerBoxStyle}>
          <Box display='flex' justifyContent='center' paddingY='0.8rem'>
            <img src='queue logo.svg' width='35%'alt='logo' />
          </Box>
          <Box sx={titleStyle}>
            <Typography sx={numberStyle}>3.</Typography>
            <Typography variant='h2'>Check queue</Typography>
          </Box>
          <Typography marginBottom='1rem' fontSize={{xs: '0.85rem', sm: '0.85rem', md: '1rem'}} textAlign={{xs: 'center', sm: 'center', md: 'left'}}>Make sure that there are no students waiting before you.</Typography>
          <Typography fontSize={{xs: '0.85rem', sm: '0.85rem', md: '1rem'}} textAlign={{xs: 'center', sm: 'center', md: 'left'}}>Please open the server dropdown and check "Show all Channels" to see queue channels.<span style={{color: '#242424'}}>_</span> 
            <img src='(i) icon.svg' alt='logo' onClick={openForm}/>
          </Typography>
        </Box>
      </Box>
      { isFormOpen && 
        <>
        <Overlay onClose={closeForm} isVisible={true} zIndex={1200}/>
        <SeeAllChannels onClose={closeForm}/>
        </>
      }
    </Box>
  );
};

export default TutoringCards;
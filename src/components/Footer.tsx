import { Box, Typography, Button } from '@mui/material';
import { BRAND_COLOR } from '../utils/constants';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Footer() {
  const { data: session } = useSession();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{ 
        display: 'flex',
        backgroundColor: '#242424',
        justifyContent: 'center',
        paddingX: '10vh',
        paddingBottom: '10vh',
        alignItems: 'center',
        marginTop: '10vh'
       }}
    >
      <Box sx={{ maxWidth: '1550px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Box sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img src='/CS Tutoring Logo.png' width='14%' height='14%'/>
            <Box>
              <Typography sx={{ fontSize: '2rem', color: '#F7F7F7', fontFamily: 'Sumana', marginLeft: '1rem', width: '100%'}}>CS Tutoring at UC Davis</Typography>
              <Typography sx={{ fontSize: '1rem', color: '#FFDE28', marginLeft: '1rem', width: '100%'}}>A free, peer-run service for UC Davis Students.</Typography>
            </Box>
          </Box>

          <Typography sx={{ fontSize: '1rem', marginTop: '5rem', marginBottom: '0.5rem', color: '#F7F7F7', fontFamily: 'Sumana' }} > Reach out to us at <span style={{ color: '#FFDE28' }}>cstutoring@ucdavis.edu</span> or any of our socials!</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left', gap: '1rem', color: '#FFDE28' }}>
            <Button variant='outlined'sx={{ fontSize: '1rem', borderColor: '#FFDE28', borderRadius: '8px', backgroundColor: '#242424', borderWidth: '0.1rem', fontFamily: 'Inter', paddingX: '1.5rem' }}>Discord</Button>
            <Button variant='outlined'sx={{ fontSize: '1rem', borderColor: '#FFDE28', borderRadius: '8px', backgroundColor: '#242424', borderWidth: '0.1rem', fontFamily: 'Inter', paddingX: '1.5rem' }}>Instagram</Button>
            <Button variant='outlined'sx={{ fontSize: '1rem', borderColor: '#FFDE28', borderRadius: '8px', backgroundColor: '#242424', borderWidth: '0.1rem', fontFamily: 'Inter', paddingX: '1.5rem'  }}>LinkTree</Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', marginTop: '7rem', flexDirection: 'column', gap: 10, alignItems: 'end' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
            <Typography sx={{ fontFamily: 'Sumana', fontSize: '1.25rem' }}>Home</Typography>
            <Typography sx={{ fontFamily: 'Sumana', fontSize: '1.25rem' }}>About Us</Typography>
            <Typography sx={{ fontFamily: 'Sumana', fontSize: '1.25rem' }}>Tutoring Hours</Typography>
            <Typography sx={{ fontFamily: 'Sumana', fontSize: '1.25rem' }}>Log In</Typography>

          </Box>
          <img src="/Bongo Tiger PC Simplified.svg" alt="logo" width='60%' height='60%' />
        </Box>

      </Box>
    </Box>
  );
}

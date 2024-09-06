import { Box, Typography, Button } from '@mui/material';
import { BRAND_COLOR } from '../utils/constants';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

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

          <Typography sx={{ fontSize: '1rem', marginTop: '5rem', marginBottom: '0.5rem', color: '#F7F7F7', fontFamily: 'Sumana' }} > Reach out to us at 
            <Link href="mailto:cstutoring@ucdavis.edu" target="_blank" style={{ textDecoration: 'none', fontWeight: 'bold' }}
            >
            <span style={{ color: '#FFDE28' }}>{' '}cstutoring@ucdavis.edu{' '}</span> 
            </Link>
            or any of our socials!</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left', gap: '1rem', color: '#FFDE28' }}>
            <Link href="https://discord.com/invite/HXfwHbYF7f" target="_blank">
              <Button variant='outlined' sx={{ paddingY: '0.5rem', gap: 1, alignItems: 'center', fontSize: '1rem', borderColor: '#FFDE28', borderRadius: '8px', backgroundColor: '#242424', borderWidth: '0.1rem', fontFamily: 'Sunflower' }}>
                <Typography sx={{ fontSize: '1rem', fontFamily: 'Sunflower' }}>Discord</Typography>
                <img src="Yellow_discord.svg" alt="logo"/>
              </Button>
            </Link>

            <Link href="https://www.instagram.com/cstutoringatucd/" target="_blank">
              <Button variant='outlined'sx={{ paddingY: '0.5rem', gap: 1, fontSize: '1rem', borderColor: '#FFDE28', borderRadius: '8px', backgroundColor: '#242424', borderWidth: '0.1rem', fontFamily: 'Sunflower' }}>
                <Typography sx={{ fontSize: '1rem', fontFamily: 'Sunflower' }}>Instagram</Typography>
                <img src="Yellow_Instagram.png" alt="logo"/>
              </Button>
            </Link>

            <Link href="https://linktr.ee/cstutoringatucd" target="_blank">
              <Button variant='outlined'sx={{ paddingY: '0.5rem', gap: 1, fontSize: '1rem', borderColor: '#FFDE28', borderRadius: '8px', backgroundColor: '#242424', borderWidth: '0.1rem', fontFamily: 'Sunflower'  }}>
                <Typography sx={{ fontSize: '1rem', fontFamily: 'Sunflower' }}>Linktree</Typography>
                <img src="Yellow_Linktree.svg" alt="logo"/>
              </Button>
            </Link>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', marginTop: '7rem', flexDirection: 'column', gap: 10, alignItems: 'end' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
            <Link href='/' style={{ textDecoration: 'none', color: '#F7F7F7' }}>
              <Typography sx={{ fontFamily: 'Sumana', fontSize: '1.25rem' }}>Home</Typography>
            </Link>
            <Typography sx={{ fontFamily: 'Sumana', fontSize: '1.25rem' }}>About Us</Typography>
            <Typography sx={{ fontFamily: 'Sumana', fontSize: '1.25rem' }}>Tutoring Hours</Typography>
              {!session ? (
                  <Typography onClick={() => signIn('discord')} sx={{ color: '#FFDE28', fontFamily: 'Sumana', fontSize: '1.25rem', cursor: 'pointer' }}>Log in</Typography>
              ) : (
                <>
                </>
              )}

          </Box>
          <img src="/Bongo Tiger PC Simplified.svg" alt="logo" width='60%' height='60%' />
        </Box>

      </Box>
    </Box>
  );
}

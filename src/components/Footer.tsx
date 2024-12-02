import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { BRAND_COLOR } from '../utils/constants';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function Footer() {
  const { data: session } = useSession();
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const buttonStyle = {
    paddingY: '0.5rem', 
    gap: 1, 
    fontSize: '1rem', 
    borderColor: '#FFDE28', 
    borderRadius: '8px', 
    backgroundColor: '#242424', 
    borderWidth: '0.1rem', 
    fontFamily: 'Sunflower'
  }

  const gradientTextStyle = {
    background: 'linear-gradient(90deg, #978000 0%, #FFDE28 17%, #FFFFEC 43%, #FFDE28 81%, #978000 100%)',
    WebkitBackgroundClip: 'text',
    MozBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    MozTextFillColor: 'transparent',
    color: 'transparent', 
    fontFamily: 'Sumana', 
    fontSize: '1.25rem',
    cursor: 'pointer', 
  }

  return (
    <Box display='flex' paddingX={{sm: '5%', md: '20vh'}} justifyContent='center' alignItems='center' marginTop='10vh' paddingBottom='10vh' paddingTop={{xs: '3rem', sm: '3rem', md: '0rem'}} sx={{ backgroundColor: '#242424' }} >
      <Box maxWidth='1550px' display='flex' justifyContent={{xs: 'center', sm: 'center', md: 'space-between'}} alignItems='center' width='100%'>
        <Box height='100%' sx={{ display: {xs: 'flex', sm: 'flex'}, flexDirection: {xs: 'column', sm: 'column'}, alignItems: {xs: 'center', sm: 'center', md: 'start'}, }} justifyContent={{xs: 'center', sm: 'center', md: 'left' }}>
          <Box display='flex' flexDirection={{xs: 'column', sm: 'column', md: 'row'}} alignItems='center' textAlign={{xs: 'center', sm: 'center'}} justifyContent={{xs: 'center', sm: 'center', md: 'left'}}>
            <Image src='/CS Tutoring Logo.png' width={50} height={50} alt='CS Tutoring Logo'/>
            <Box>
              <Typography width='100%' fontFamily='Sumana' variant='h2' marginLeft={{md: '0.3rem'}}>CS Tutoring at UC Davis</Typography>
              <Typography marginLeft={{md: '0.5rem'}} width='100%' textAlign={{xs: 'center', sm: 'center', md: 'left'}}fontSize={{xs: '0.85rem'}} sx={{color: 'text.secondary' }}>A free, peer-run service for UC Davis Students.</Typography>
            </Box>
          </Box>

          <Typography fontSize={{xs: '0.7rem', sm: '0.8rem', md: '1rem'}} marginTop={{xs: '2rem', sm: '3rem', md: '5rem'}} marginBottom={{xs: '1rem', sm: '0.75rem', md: '0.5rem'}} fontFamily='Sumana' textAlign={{ xs: 'center', sm: 'center', md: 'left' }}> Reach out to us at 
            <Link href="mailto:cstutoring@ucdavis.edu" target="_blank" style={{ textDecoration: 'none', fontWeight: 'bold' }} > 
              <span style={{ color: '#FFDE28' }}>{' '}cstutoring@ucdavis.edu{' '}</span> 
            </Link>
            {isMd && <br />}or any of our socials!</Typography>
          <Box display='flex' flexDirection={{ xs: 'column', sm: 'column', md: 'row' }} alignItems='center' justifyContent='left' gap='1rem'  sx={{ color: 'text.secondary' }}>
            <Link href="https://discord.com/invite/HXfwHbYF7f" target="_blank">
              <Button variant='outlined' sx={buttonStyle}>
                <Typography fontFamily='Sunflower'>Discord</Typography>
                <Image src="Yellow_discord.svg" alt="logo" width={30} height={20}/>
              </Button>
            </Link>

            <Link href="https://www.instagram.com/cstutoringatucd/" target="_blank">
              <Button variant='outlined'sx={buttonStyle}>
                <Typography fontFamily='Sunflower'>Instagram</Typography>
                <Image src="Yellow_Instagram.svg" alt="logo" width={20} height={20}/>
              </Button>
            </Link>

            <Link href="https://linktr.ee/cstutoringatucd" target="_blank">
              <Button variant='outlined'sx={buttonStyle}>
                <Typography fontFamily='Sunflower'>Linktree</Typography>
                <Image src="Yellow_Linktree.svg" alt="logo" width={20} height={20}/>
              </Button>
            </Link>
            {isMd && 
            <>
                <Image
                  src='/Bongo Tiger PC Simplified.svg'
                  alt='logo'
                  
                  width={300}
                  height={200}
                />
            </>
            }
          </Box>
        </Box>

        <Box display='flex' marginTop='7rem' flexDirection='column' gap={10} alignItems='center'>
          { !isMd &&
          <Box display='flex' flexDirection='row' gap={5}>
            <Link href='/' style={{ textDecoration: 'none', color: '#F7F7F7' }}>
              <Typography sx={{ fontFamily: 'Sumana', fontSize: '1.25rem' }}>Home</Typography>
            </Link>
            {/* <Typography sx={{ fontFamily: 'Sumana', fontSize: '1.25rem' }}>About Us</Typography> */}
            <Link href='/TutoringHours' style={{ textDecoration: 'none', color: '#F7F7F7'}}>
              <Typography sx={{ fontFamily: 'Sumana', fontSize: '1.25rem' }}>Tutoring Hours</Typography>
            </Link>
              {!session ? (
                  <Typography 
                    onClick={() => signIn('discord')} 
                    sx={gradientTextStyle}>Log in</Typography>
              ) : (
                <>
                </>
              )}

          </Box> 
          }
          {!isMd &&<Image src="/Bongo Tiger PC Simplified.svg" alt="logo" width={300} height={200} />}
        </Box>

      </Box>
    </Box>
  );
}

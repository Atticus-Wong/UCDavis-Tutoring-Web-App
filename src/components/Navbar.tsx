import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import HamburgerMenu from './HamburgerMenu';
import Image from 'next/image';

export default function Navbar() {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const open = Boolean(anchorEl);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));


  const gradientstyle = {
    background: 'linear-gradient(90deg, #978000 0%, #FFDE28 17%, #FFFFEC 43%, #FFDE28 81%, #978000 100%)',
    WebkitBackgroundClip: 'text',
    MozBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    MozTextFillColor: 'transparent',
    fontFamily: 'Sumana',  
  }
  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMyAccount = () => {
    handleClose();
    router.push('/account');
  };

  const handleLogout = () => {
    handleClose();
    signOut();
  };

  const discordSignIn = () => {
    signIn('discord');
  }

  // transforming anchor origin to correct location
  useEffect(() => {
    if (buttonRef.current) {
      setAnchorEl(buttonRef.current);

      setTimeout(() => {
        handleClose();
      }, 0); 
    }
  }, []);

  return (
    <AppBar position="sticky" style={{ padding: '1rem', backgroundColor: '#121212', zIndex: '1100' }}>
      <Toolbar>
        <Box
          sx={{ 
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginLeft: {md: '16vh', sm: '1vh', xs: '6%'},
            marginRight: {md: '15vh', sm: '1vh', xs: '0%'}
           }}
        >
          {isSm && <Box></Box>}
          <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center'  }}>
            <Image src='/Subtract-11.svg' alt='logo' width={35} height={50}/>
            {!isSm && <Typography sx={{ fontFamily: 'Sumana', fontSize: {sm: '1rem', md: '1.5rem'} }}>CS Tutoring Club at UC Davis</Typography>}
          </Box>
          { !isSm ? (
          <Box display="flex" gap="2rem" alignItems="center">
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                <Link href='/' style={{ textDecoration: 'none', color: '#F7F7F7' }}>
                  <Typography sx={{ fontFamily: 'Sumana', fontSize: {sm: '1rem', md: '1.25rem'} }}>Home</Typography>
                </Link>
                {/* <Typography sx={{ fontFamily: 'Sumana', fontSize: '1.25rem' }}>About Us</Typography> */}
                <Link href='/TutoringHours' style={{textDecoration: 'none', color: '#F7F7F7'}}>
                
                  <Typography sx={{ fontFamily: 'Sumana', fontSize: {sm: '1rem', md: '1.25rem'} }}>Tutoring Hours</Typography>
                </Link>
              </Box>
              
              {!session ? (
                <>
                  <Button
                    id='menu-button-id'
                    ref={buttonRef}
                    variant="text"
                    sx={{ textTransform: 'none',
                          '&:hover': {
                          backgroundColor: '#272727',  
                          },
                          display: 'flex',
                          alignItems: 'center',
                    }}
                    
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleAvatarClick}
                  >
                      <Typography sx={{ ...gradientstyle, fontSize: {sm: '1rem', md: '1.25rem'} }} > Log in </Typography>
                      <ExpandMoreIcon sx={{ ...gradientstyle, fontSize: {sm: '1rem', md: '1.5rem'} }} />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button'
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right', 
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right', 
                    }}
                    PaperProps={{
                      sx: { 
                        backgroundColor: 'black',
                      },
                    }}
                  >
                    <MenuItem onClick={discordSignIn} sx={{ '&:hover': { backgroundColor: 'transparent', }, }} >
                      <Image src='discord login.svg' alt='logo' width={300} height={75}/>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <IconButton
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleAvatarClick}
                  >
                    <Avatar />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button'
                    }}
                  >
                    <MenuItem onClick={handleMyAccount}>My account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              )}
          </Box>
          ) : (
            <>
              <HamburgerMenu />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
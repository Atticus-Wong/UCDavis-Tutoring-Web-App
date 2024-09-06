import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material';
import Image from 'next/image';
import logo from '@/public/tutoring-logo.svg';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { OFF_WHITE } from '../utils/constants';

export default function Navbar() {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

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

  return (
    <AppBar position="sticky" style={{ padding: '1rem', backgroundColor: '#121211' }}>
      <Toolbar>
        <Box
          sx={{ 
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginX: '2.5rem'
           }}
        >
          <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <img src='/Subtract-11.svg' alt='logo'/>
            <Typography sx={{ fontFamily: 'Sumana', fontSize: '1.5rem' }}>CS Tutoring Club at UC Davis</Typography>
          </Box>
          <Box display="flex" gap="2rem" alignItems="center">
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
              <Link href='/' style={{ textDecoration: 'none', color: '#F7F7F7' }}>
                <Typography sx={{ fontFamily: 'Sumana', fontSize: '1.25rem' }}>Home</Typography>
              </Link>
              <Typography sx={{ fontFamily: 'Sumana', fontSize: '1.25rem' }}>About Us</Typography>
              <Typography sx={{ fontFamily: 'Sumana', fontSize: '1.25rem' }}>Tutoring Hours</Typography>
            </Box>
              {!session ? (
                <Button
                  variant="text"
                  onClick={() => signIn('discord')}
                  sx={{ textTransform: 'none',
                        '&:hover': {
                        backgroundColor: '#272727',  // Keep the same background color on hover
                        },
                  }}
                >
                  <Typography sx={{ color: '#FFDE28', fontFamily: 'Sumana', fontSize: '1.25rem' }}>Log in</Typography>
                </Button>

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
        </Box>
      </Toolbar>
    </AppBar>
  );
}
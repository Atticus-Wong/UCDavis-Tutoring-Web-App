import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Button, Box, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InstagramIcon from '@mui/icons-material/Instagram';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Router, useRouter } from 'next/router';

type HamburgerMenuProps = {
  anchorEl: null | HTMLElement
  open: boolean
  buttonRef: HTMLButtonElement | null
}

const HamburgerMenu: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (open: boolean) => () => {
    setIsOpen(open);
  }
  const signInDiscord = () => {
    signIn('discord');
  }
  const signOutDiscord = () => {
    setIsOpen(false);
    signOut();
    router.push('/');
  }

  const buttonstyles = {
    textAlign: 'center',
    backgroundColor: '#242424',
    fontFamily: 'Sumana'
  }

  

  const list = () => (
    <Box role="presentation" onClick={toggleMenu(false)} onKeyDown={toggleMenu(false)} sx={buttonstyles}>
      <List sx={buttonstyles}>
        <ListItem>
          <ListItemButton href='/' sx={buttonstyles}>Home</ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton href='/TutoringHours' sx={{...buttonstyles}}>Tutoring Hours</ListItemButton>
        </ListItem>
        {!session ? (
        <ListItem>
          <ListItemButton onClick={signInDiscord}>Login</ListItemButton>
        </ListItem>
        ) : (
          <>
          <ListItem>
            <ListItemButton href='/account'> Account </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={signOutDiscord}> Log out </ListItemButton>
          </ListItem>
          </>
        )}
      </List>
    </Box>
  );
  return (
    <>
      <Box>
        <MenuIcon cursor='pointer' fontSize='small' onClick={toggleMenu(true)}/>
        <Drawer 
          anchor='top' 
          open={isOpen} 
          onClose={toggleMenu(false)}
        >
          {list()}
        </Drawer>
      </Box>
    </>
  )
}
 export default HamburgerMenu;
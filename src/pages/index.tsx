import { Box, Button, Typography } from "@mui/material";
import { OFF_WHITE } from "../utils/constants";
import FAQ from "../components/faq";
import Link from "next/link";
import BongoCat from "../components/BongoCat";
import TutoringCards from "../components/TutoringCards";
import gradientButtonStyles from "../components/GradientButtonStyle";
/*
 * note to future self/developers:
 * TODO: fix css inline styles (not following 80 character policy)
 */
export default function HomePage() {
  return (
    <Box sx={{ maxWidth: '1328px', minWidth: '1025px', margin: '0 auto', }}>
    <Box sx={{ 
      marginTop: '15vh',
      display: 'flex', 
      justifyContent: 'center', 
      marginLeft: '10vh', 
      marginRight: '10vh', 
      }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <Box sx={{ height: '100%' }}>
          <Typography sx={{ fontSize: '2.5rem', color: '#F7F7F7', fontFamily: 'Sumana'}}>CS Tutoring at UC Davis</Typography>
          <Typography sx={{ fontSize: '1rem', color: '#FFDE28'}}>A free, peer-run service for UC Davis Students.</Typography>
          <Typography sx={{ fontSize: '1rem', marginTop: '6rem', color: '#F7F7F7' }}>Anyone can get tutoring anytime!</Typography>
          <Typography sx={{ fontSize: '1rem', color: '#F7F7F7' }}>Look forward to our Fall 2025 tutor recruitment!</Typography>
          <Typography sx={{ fontSize: '1rem', marginTop: '2.5rem', marginBottom: '0.5rem', color: '#F7F7F7', fontFamily: 'Inter'  }}>Find Us Here</Typography>
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
        <BongoCat />
      </Box>
    </Box> 

    <Box sx={{ 
      marginTop: '15vh',
      display: 'flex', 
      justifyContent: 'left', 
      marginLeft: '10vh', 
      marginRight: '10vh', 
      borderColor: '#FFDE28',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: '8px',
      backgroundColor: "#242424",
      }}>
        <Box sx={{ paddingTop: '2rem', paddingLeft: '4rem', height: '100%'}}>
            <Typography sx={{color: '#FFDE28', fontFamily: 'Inter', fontSize: '1.4rem'}}>Become a tutor of Fall 2025!</Typography>
            <Typography sx={{ marginTop: '1rem', marginBottom: '2rem', fontSize: '1.1rem', fontFamily: 'Inter' }}>If you are interested in helping your fellow students in Computer Science courses, 
                                                  building your interpersonal skills, and gaining valuable experience, we urge you to become a CS tutor. 
                                                  You can also receive units for your tutoring services!
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'left', paddingBottom: '3rem', position: 'relative', gap: 3}}>
              <Button variant="outlined" sx={{ borderWidth: '0.1rem', borderColor: '#FFDE28', fontFamily: 'Sunflower', borderRadius: '12px', paddingX: '2.5rem', fontSize: '1.25rem' }}>See Requirements</Button>

            <Link href="https://forms.gle/xxwsm6TJSZ7zgntx9" target="_blank" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }} >
            <Button sx={gradientButtonStyles}>APPLY AS TUTOR</Button>
            </Link>

            {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, zIndex: 2, position: 'absolute', right: 723, top: -10 }}>
              <img src="star-big.svg" />
              <img src="star-small.svg" height={15}/>
            </Box> */}

            </Box>
        </Box>


    </Box>
    <Box
      sx={{
        marginTop: '15vh',
        marginLeft: '10vh',
        marginRight: '10vh'
      }}>
        <Typography sx={{ color: {OFF_WHITE}, fontSize: '2.5rem', fontFamily: 'Hanuman' }}>Welcome to CS Tutoring!</Typography>
        <Typography sx={{ color: {OFF_WHITE}, marginTop: '0.8rem', fontSize: '1rem' }}>CS Tutoring organizes undergraduate volunteer tutors to help students with undergraduate CS courses every quarter. 
                    We select our tutors carefully so we can give you the best tutoring experience!</Typography>
        <Typography sx={{ color: {OFF_WHITE}, marginTop: '1rem', fontSize: '1rem'}}>We offer our upper and lower division tutoring services throughout the school year. And you can choose to meet up with your tutor in person or online.</Typography>
    </Box>
    <Box
      sx={{ 
        marginTop: '15vh',
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
        flexWrap: 'wrap'
       }}>
        <img src="/Stats(1.7k).svg" alt="1.7k"/>
        <img src="/Stats(handshake).svg" alt="!"/>
        <img src="/Stats(30).svg" alt="#"/>
        <img src="/Stats(stairs).svg" alt="#"/>


    <Box sx={{ 
      width: '100%', 
      marginX: '10vh',
      marginTop: '15vh' 
    }}>
      <Box>
        <Typography sx={{ fontFamily: 'Hanuman', color: {OFF_WHITE}, fontSize: '2rem' }}>How to get Tutoring?</Typography>
      </Box>
      <TutoringCards />
    </Box>


    </Box>
    <FAQ />
    </Box>
  )
}


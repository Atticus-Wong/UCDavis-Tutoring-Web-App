import { Box, Button, Typography } from "@mui/material";
import { OFF_WHITE } from "../utils/constants";
import FAQ from "../components/faq";
import Link from "next/link";
/*
 * note to future self/developers:
 * TODO: fix css inline styles (not following 80 character policy)
 */
export default function HomePage() {
  return (
    <Box sx={{ maxWidth: '1550px', minWidth: '1025px', margin: '0 auto'}}>
    <Box sx={{ 
      marginTop: '15vh',
      display: 'flex', 
      justifyContent: 'center', 
      marginLeft: '10vh', 
      marginRight: '10vh', 
      }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <Box sx={{ height: '100%' }}>
          <Typography sx={{ fontSize: '3.25rem', color: '#F7F7F7', fontFamily: 'Sumana'}}>CS Tutoring at UC Davis</Typography>
          <Typography sx={{ fontSize: '1.4rem', color: '#FFDE28'}}>A free, peer-run service for UC Davis Students.</Typography>
          <Typography sx={{ fontSize: '1.4rem', marginTop: '6rem', color: '#F7F7F7' }}>Anyone can get tutoring anytime!</Typography>
          <Typography sx={{ fontSize: '1.4rem', color: '#F7F7F7' }}>Look forward to our Fall 2025 tutor recruitment!</Typography>
          <Typography sx={{ fontSize: '1rem', marginTop: '2.5rem', marginBottom: '0.5rem', color: '#F7F7F7', fontFamily: 'Inter'  }}>Find Us Here</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left', gap: '1rem', color: '#FFDE28' }}>

            <Link href="https://discord.com/invite/HXfwHbYF7f" target="_blank">
              <Button variant='outlined' sx={{ paddingY: '0.5rem', gap: 1, alignItems: 'center', fontSize: '1rem', borderColor: '#FFDE28', borderRadius: '8px', backgroundColor: '#242424', borderWidth: '0.1rem', fontFamily: 'Sunflower' }}>
                <Typography sx={{ fontSize: '1.2rem', fontFamily: 'Sunflower' }}>Discord</Typography>
                <img src="Yellow_discord.svg" alt="logo"/>
              </Button>
            </Link>
            <Link href="https://www.instagram.com/cstutoringatucd/" target="_blank">
              <Button variant='outlined'sx={{ paddingY: '0.5rem', gap: 1, fontSize: '1rem', borderColor: '#FFDE28', borderRadius: '8px', backgroundColor: '#242424', borderWidth: '0.1rem', fontFamily: 'Sunflower' }}>
                <Typography sx={{ fontSize: '1.2rem', fontFamily: 'Sunflower' }}>Instagram</Typography>
                <img src="Yellow_Instagram.png" alt="logo"/>
              </Button>
            </Link>
            <Link href="https://linktr.ee/cstutoringatucd" target="_blank">
              <Button variant='outlined'sx={{ paddingY: '0.5rem', gap: 1, fontSize: '1rem', borderColor: '#FFDE28', borderRadius: '8px', backgroundColor: '#242424', borderWidth: '0.1rem', fontFamily: 'Sunflower'  }}>
                <Typography sx={{ fontSize: '1.2rem', fontFamily: 'Sunflower' }}>Linktree</Typography>
                <img src="Yellow_Linktree.svg" alt="logo"/>
              </Button>
            </Link>

          </Box>
        </Box>
        <Box sx={{marginTop: '1.5rem' }}>
          <Box sx={{  }}>
            <img src="Howdy Bubble.svg"/>
          </Box>
          <img src="/Bongo Tiger PC Simplified.svg" alt="logo" />
        </Box>
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
            <Typography sx={{color: '#FFDE28', fontFamily: 'Inter'}}>Become a tutor of Fall 2025!</Typography>
            <Typography sx={{ marginTop: '1rem', marginBottom: '2rem', fontSize: '1.2rem', fontFamily: 'Inter' }}>If you are interested in helping your fellow students in Computer Science courses, 
                                                  building your interpersonal skills, and gaining valuable experience, we urge you to become a CS tutor. 
                                                  You can also receive units for your tutoring services!
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'left', gap: '1.5rem', paddingBottom: '3rem'}}>
              <Button variant="outlined" sx={{ borderWidth: '0.1rem', borderColor: '#FFDE28', fontFamily: 'Inter', borderRadius: '16px', paddingX: '2rem' }}>See Requirements</Button>

            <Link href="https://forms.gle/xxwsm6TJSZ7zgntx9" target="_blank" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }} >
              <Button sx={{ background: 'linear-gradient(to right, rgba(255, 222, 40, 0.75), rgba(255, 222, 40, 0.1))', border: '2px solid #FFDE28', fontFamily: 'Inter', borderRadius: '16px', paddingX: '2rem', color: '#F7F7F7', textTransform: 'none',
                            '&:hover': { background: 'linear-gradient(to right, rgba(255, 222, 40, 0.8), rgba(255, 222, 40, 0.1))',opacity: 0.9, border: '2px solid #FFDE28', }}}>APPLY AS TUTOR </Button>
              
            </Link>
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
        justifyContent: 'center'
       }}>
        <img src="/Stats(1.7k).svg" alt="1.7k"/>
        <img src="/Stats(!).svg" alt="!"/>
        <img src="/Stats(hash).svg" alt="#"/>
        <img src="/Stats(^v).svg" alt="#"/>

    </Box>
    <FAQ />
    </Box>
  )
}


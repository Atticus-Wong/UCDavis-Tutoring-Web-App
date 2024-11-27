import { Box, Button, Typography, useMediaQuery, Theme, useTheme } from "@mui/material";
import { OFF_WHITE } from "../utils/constants";
import FAQ from "../components/faq";
import Link from "next/link";
import BongoCat from "../components/BongoCat";
import TutoringCards from "../components/TutoringCards";
import gradientButtonStyles from "../components/GradientButtonStyle";
import Image from "next/image";
import StatsImages from "../components/Statistics";
/*
 * note to future self/developers:
 * TODO: fix css inline styles 
 */
export default function HomePage() {

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const imageSize = isXs ? '100px' : isMd ? '150px' : '250px';
  const onlyXs = useMediaQuery(theme.breakpoints.only('xs'))


  return (
    <Box sx={{ maxWidth: '1328px', margin: '0 auto', }}>
    <Box sx={{ 
      marginTop: {xs: '15%', sm: '10vh', md: '15vh'},
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: {xs: 'center', sm: 'center', md: 'left'},
      marginX: {xs: '7%', sm: '5vh', md: '10vh'}, 
      }}>
      <Box sx={{ display: 'flex', justifyContent: {xs: 'center', sm: 'center', md: 'space-between'}, width: '100%', alignItems: 'center'}}>
        <Box textAlign={{xs: 'left', sm: 'center', md: 'left'}} sx={{ height: '100%' }}>
          <Typography fontFamily='Sumana' variant="h1" marginY={1}>CS Tutoring at{onlyXs && <br />} UC Davis</Typography>
          <Typography sx={{ color: 'text.secondary', }} fontSize={{xs: '1rem'}}> A free, peer-run service for {onlyXs && <br />} UC Davis Students.</Typography>
          <Typography variant='body1' marginTop={{xs: '3rem', sm: '4rem', md: '6rem'}} textAlign={{xs: 'left', sm: 'center', md: 'left'}}>Anyone can get tutoring anytime!</Typography>
          <Typography variant="body1" marginBottom={{xs: '1rem', sm: '0.5rem'}} textAlign={{xs: 'left', sm: 'center', md: 'left'}} >Look forward to our Fall 25&apos; tutor recruitment!</Typography>
          {(isSm || isMd) && <BongoCat />}
          <Typography marginTop={{xs: '1rem', sm: '1.5rem', md: '2.5rem'}} textAlign={{xs: 'center', sm: 'center', md: 'left'}} fontSize={{xs: '0.7rem', sm: '0.85rem'}} marginBottom='0.5rem'>Find Us Here</Typography>
          <Box  sx={{ display: 'flex', flexDirection: {xs: 'column', sm: 'column', md: 'row'}, alignItems: 'center', justifyContent: 'left', gap: '1rem', color: '#FFDE28' }}>
            <Link href="https://discord.com/invite/HXfwHbYF7f" target="_blank">
              <Button variant='outlined' sx={{ paddingY: '0.5rem', gap: 1, alignItems: 'center', borderColor: '#FFDE28', borderRadius: '8px', backgroundColor: '#242424', borderWidth: '0.1rem', fontFamily: 'Sunflower' }}>
                <Typography sx={{ fontSize: '1rem', fontFamily: 'Sunflower' }}>Discord</Typography>
                <Image src="Yellow_discord.svg" alt="logo" width={30} height={20}/>
              </Button>
            </Link>
            <Link href="https://www.instagram.com/cstutoringatucd/" target="_blank">
              <Button variant='outlined'sx={{ paddingY: '0.5rem', gap: 1, borderColor: '#FFDE28', borderRadius: '8px', backgroundColor: '#242424', borderWidth: '0.1rem', fontFamily: 'Sunflower' }}>
                <Typography fontFamily='Sunflower'>Instagram</Typography>
                <Image src="Yellow_Instagram.svg" alt="logo" width={20} height={20}/>
              </Button>
            </Link>
            <Link href="https://linktr.ee/cstutoringatucd" target="_blank">
              <Button variant='outlined'sx={{ paddingY: '0.5rem', gap: 1, fontSize: '1rem', borderColor: '#FFDE28', borderRadius: '8px', backgroundColor: '#242424', borderWidth: '0.1rem', fontFamily: 'Sunflower'  }}>
                <Typography fontFamily='Sunflower'>Linktree</Typography>
                <Image src="Yellow_Linktree.svg" alt="logo" width={20} height={20}/>
              </Button>
            </Link>

          </Box>
        </Box>
        {!isMd && <Box alignItems='center'><BongoCat /></Box>}
      </Box>
    </Box> 

    <Box sx={{ 
      marginTop: {xs: '5vh', sm: '10vh', md: '15vh'},
      display: 'flex', 
      justifyContent: 'left', 
      marginX: {xs: '5%', sm: '5vh', md: '10vh'}, 
      borderColor: '#FFDE28',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: {xs: '16px', sm: '16px', md: '8px'},
      backgroundColor: "#242424",
      }}>
        <Box paddingTop='2rem' paddingX={{xs: '1.5rem', sm: '2rem', md: '3.5rem'}} height='100%'>
            <Typography variant='h4' sx={{color: 'text.secondary', fontFamily: 'Inter',}}>Become a tutor for Fall 25&apos;!</Typography>
            <Typography marginTop='1rem' marginBottom='2rem' variant='body1'>Looking to support your peers in Computer Science while enhancing your interpersonal
                                                             and mentorship skills? {isXs ? <><br /><br /></> : ' '}Join our team as a CS Tutor! Moreover, you can earn academic credit
                                                             for your tutoring hours.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: {xs: 'space-between', sm: 'left', md: 'left'}, paddingBottom: '3rem', position: 'relative', gap: {xs: 1, sm: 3, md: 3}}}>
            <Button 
              href="/SeeDetails"
              variant="outlined" 
              sx={{ 
                borderWidth: '0.1rem', 
                borderColor: '#FFDE28', 
                fontFamily: 'Sunflower', 
                borderRadius: '12px', 
                paddingX: {xs: '1.5rem', sm: '2rem', md: '4rem'}, 
                fontSize: {xs: '0.9rem', sm: '1.2rem', md: '1.2rem'} 
              }}
            >
              See Details
            </Button>

              <Link href="https://forms.gle/xxwsm6TJSZ7zgntx9" target="_blank" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }} >
              <Button sx={gradientButtonStyles}>APPLY AS TUTOR</Button>
              </Link>
            </Box>
        </Box>
    </Box>
    <Box
      sx={{
        marginTop: {xs: '10vh', sm: '10vh', md: '15vh'},
        marginX: {xs: '7%', sm: '5vh', md: '10vh'},
      }}>
        <Typography sx={{ fontSize: {xs: '1.5rem', sm: '2rem', md: '2.5rem'}, fontFamily: 'Hanuman' }}>Welcome to CS Tutoring!</Typography>
        <Typography variant='body1' marginTop="0.8rem">CS Tutoring organizes undergraduate volunteer tutors to help students with undergraduate CS courses every quarter. 
                    We select our tutors carefully so we can give you the best tutoring experience!</Typography>
        <Typography variant="body1" marginTop="1rem">We offer our upper and lower division tutoring services throughout the school year. And you can choose to meet up with your tutor in person or online.</Typography>
    </Box>
    <Box marginTop='15vh' display='flex' flexDirection='row' gap={5} alignItems='center' justifyContent='center' flexWrap='wrap'>
      <StatsImages />


    <Box width='100%' marginX='10vh' marginTop='15vh' >
      <Box>
        <Typography sx={{ fontFamily: 'Hanuman', color: {OFF_WHITE}, fontSize: {xs: '1.5rem', sm: '2rem', md: '2rem'}, }}>How to get Tutoring?</Typography>
      </Box>
      <TutoringCards />
    </Box>


    </Box>
    <FAQ />
    </Box>
  )
}


import { Typography, Box, Accordion, AccordionSummary, AccordionDetails, Button, List, ListItem, useMediaQuery, useTheme } from "@mui/material";
import { OFF_WHITE } from "@/src/utils/constants";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import gradientButtonStyles from "@/src/components/GradientButtonStyle";
import Link from "next/link";
import { useState } from "react";

export default function SeeRequirements() {
  const [expanded, setExpanded] = useState<string | false>('');
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'))
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const isXs = useMediaQuery(theme.breakpoints.down('xs'))
  const handleChange =
  (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const listItemStyles = {
    display: 'list-item', fontSize: '1rem', padding: 0, paddingLeft: '0.5rem', whiteSpace: {sm: 'wrap', md: 'nowrap'} 
  }

  return (
    <Box sx={{ maxWidth: '1328px', margin: '0 auto' }}>
    <Box sx={{ marginX: {xs: '7%', sm: '5vh', md: '10vh'}, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ 
        width: '100%', 
        marginTop: '3vh',
        paddingY: '3vh',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
       
      }}>
        <Box width='100%' display='flex' flexDirection='row' justifyContent={{xs: 'center', sm: 'center', md: 'space-between'}} alignItems='center'>
          <Typography sx={{ fontSize: {xs: '1.75rem', sm: '2rem', md: '2.25rem'}, color: '#F7F7F7', fontFamily: 'Sumana'}}>Become a CS Tutor</Typography>
          { !isMd &&
              <Button sx={{ ...gradientButtonStyles, width: 'auto', }} onClick={() => window.open('https://forms.gle/xxwsm6TJSZ7zgntx9', '_blank')} >
              APPLY AS TUTOR
            </Button>
          }
        </Box>
        
  <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', position: 'relative' }}>
    <Box sx={{ height: '100%' }}> {/* Adjust 200px based on your button's width */}
      <Typography marginTop='1.5rem'sx={{fontSize: '1.5rem', color: 'text.secondary', fontFamily: 'Sumana'}}>Tutoring Requirements & Reponsibilities</Typography>
      <Typography marginTop='1.5rem'>The CS tutoring club has been assisting computer science students in achieving their academic goals since 2014!</Typography>
      <Typography marginTop='1.5rem'>To be a tutor for CS Tutoring, you must fulfill these requirements:</Typography>
      <List sx={{ listStyleType: 'disc', pl: 4, marginTop: '1rem' }}>
        <ListItem sx={listItemStyles}>Must be in good academic standing with a 3.0 GPA or above</ListItem>
        <ListItem sx={listItemStyles}>Lower division tutors must have a letter grade of B+ or above in a course to tutor for that relative course</ListItem>
        <ListItem sx={listItemStyles}>Upper division tutors must have a letter grade of A- or above in a course to tutor for that relative course</ListItem>
        <ListItem sx={listItemStyles}>Able to use Discord for contact and online tutoring</ListItem>
      </List>
      <Typography sx={{ fontSize: '1rem', color: '#F7F7F7', marginTop: '3rem' }}>As a tutor for CS tutoring, we expect you to uphold these qualities:</Typography>
      <List sx={{ listStyleType: 'disc', pl: 4, marginTop: '1rem' }}>
        <ListItem sx={{ display: 'list-item', fontSize: '1rem', padding: 0, paddingLeft: '0.5rem' }}>Demonstrating equal respect and fairness to all peers, regardless of age, gender, ethnicity, or identity</ListItem>
        <ListItem sx={{ display: 'list-item', fontSize: '1rem', padding: 0, paddingLeft: '0.5rem' }}>Upholding a strong positive and supportive work environment by actively encouraging diverse perspectives</ListItem>
        <ListItem sx={{ display: 'list-item', fontSize: '1rem', padding: 0, paddingLeft: '0.5rem' }}>Ensuring honesty and integrity in all actions and communications</ListItem>
      </List>
    </Box>
  </Box>
      <Box sx={{ 
        marginTop: '5vh',
        display: 'flex',
        flexDirection: 'column',
       }}>
      <Accordion sx={{ width: '100%', boxShadow: 'none' }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary 
          sx={{ backgroundColor: '#191918', width: '100%' }}           
          aria-controls="panel1a-content"
          id="panel1a-header"
          expandIcon={<ExpandMoreIcon sx={{ fontSize: '2rem', color: '#FFDE28' }}/>}
          >
          <Typography sx={{ fontSize: '1.5rem', color: '#FFDE28', fontFamily: 'Hanuman' }}>ECS 197T Units (Junior Standing or Above)</Typography>
        </AccordionSummary>
        <AccordionDetails 
        sx={{ backgroundColor: '#191918' }}>
          <Typography> Tutors with junior standing or above can choose to receive 1 or 2 (returning Tutors only) units of ECS 197T credits per quarter for their efforts at CS Tutoring.</Typography>
          <Typography marginTop='2rem'>For every unit you recieve, you are expected to tutor a total of 3 hours per week 
                                                                                       (e.g. 1 unit requires 3 hours of weekly tutoring and 2 units require 6 hours of weekly tutoring).
          </Typography>
        </AccordionDetails>
      </Accordion>
       </Box>

       
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
       }}>
      <Accordion sx={{ width: '100%', boxShadow: 'none', marginTop: '1rem' }} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary 
          sx={{ backgroundColor: '#191918', width: '100%' }}           
          aria-controls="panel1a-content"
          id="panel1a-header"
          expandIcon={<ExpandMoreIcon sx={{ fontSize: '2rem', color: '#FFDE28' }}/>}
          >
          <Typography sx={{ fontSize: '1.5rem', color: '#FFDE28', fontFamily: 'Hanuman' }}>Volunteer Tutoring (Prior to Junior Standing or No Units)</Typography>
        </AccordionSummary>
        <AccordionDetails 
        sx={{ backgroundColor: '#191918' }}>
          <Typography>We encourage you to volunteer as a CS tutor if you are not in junior standing yet or do not need upper division units. It&apos;s a great way for you
            to better understand a topic by teaching it to others!</Typography>
          <Typography marginTop='2rem'>As a volunteer tutor, you do not have a minimum hour requirement. We only ask you to maintain a consistent tutoring schedule 
            so students who prefer your tutoring is aware of your availability. You are also welcome to host review sessions for mid-term/final exams.
          </Typography>
          <Typography marginTop='2rem'>
            If you are a volunteer tutor and are planning to return and apply for ECS 197T credits, you are able to apply for 2 units which is reserved for returning tutors.
          </Typography>
        </AccordionDetails>
      </Accordion>
       </Box>
      { isMd &&
        <Box display='flex' alignItems='center' justifyContent='center'>

          <Button 
          sx={{
            ...gradientButtonStyles,
            marginTop: '1rem',
            fontSize: '1rem'
          }}
          onClick={() => window.open('https://forms.gle/xxwsm6TJSZ7zgntx9', '_blank')}
        >
          APPLY AS TUTOR
        </Button>
      </Box>}
    </Box>
    </Box>
    </Box>
  )
}
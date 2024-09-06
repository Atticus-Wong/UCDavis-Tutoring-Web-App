import { Box, Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material"
import { OFF_WHITE } from "../utils/constants"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useState } from "react"


// https://mui.com/material-ui/react-accordion/
const FAQ = () => {
  const [expanded, setExpanded] = useState<string | false>('');

  const handleChange =
  (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box sx={{ 
      marginTop: '15vh',
      display: 'flex', 
      justifyContent: 'left', 
      marginLeft: '10vh', 
      marginRight: '10vh',
      backgroundColor: '#191918',
      flexDirection: 'column'
      }}>
        <Box sx={{ width: '100%' }}>
        <Typography sx={{ width: '100%', fontFamily: 'Hanuman' }}>FAQ</Typography></Box>
      <Accordion sx={{ backgroundColor: '#191918', width: '100%', boxShadow: 'none', marginTop: '1rem' }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary 
          sx={{ backgroundColor: '#191918', width: '100%' }}           
          aria-controls="panel1a-content"
          id="panel1a-header"
          expandIcon={<ExpandMoreIcon fontSize="small"/>}
          >
          <Typography sx={{ backgroundColor: '#191918', fontSize: '1rem', color: {OFF_WHITE} }}>Do I need to sign up for CS Tutoring Club to get tutoring?</Typography>
        </AccordionSummary>
        <AccordionDetails 
        sx={{ backgroundColor: '#191918' }}>
          <Typography sx={{ fontSize: '1rem', color: {OFF_WHITE} }}>
            No, you don't! There is no sign up process to receive our tutoring services. 
            You just need to join our Discord server and get verified with your UC Davis email. 
            And, voilà! You can access all of our tutoring services!
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor: '#191918', width: '100%', boxShadow: 'none', marginTop: '1rem' }} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary 
          sx={{ backgroundColor: '#191918', width: '100%' }}           
          aria-controls="panel1a-content"
          id="panel1a-header"
          expandIcon={<ExpandMoreIcon fontSize="small"/>}
          >
          <Typography sx={{ backgroundColor: '#191918', fontSize: '1rem', color: {OFF_WHITE} }}>Do you have tutors for my class?</Typography>
        </AccordionSummary>
        <AccordionDetails 
        sx={{ backgroundColor: '#191918' }}>
          <Typography sx={{ fontSize: '1rem', color: {OFF_WHITE} }}>
          Every quarter, we tutor every lower division course: the ECS 32 and 36 series, and ECS 50; and mandatory upper-division classes for the CS and CSE majors: 
          ECS 120, 140, 150, 154A, etc. We also offer tutoring based on tutor availability for other courses for that quarter.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor: '#191918', width: '100%', boxShadow: 'none', marginTop: '1rem' }} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary 
          sx={{ backgroundColor: '#191918', width: '100%' }}           
          aria-controls="panel1a-content"
          id="panel1a-header"
          expandIcon={<ExpandMoreIcon fontSize="small"/>}
          >
          <Typography sx={{ backgroundColor: '#191918', fontSize: '1rem', color: {OFF_WHITE} }}>How are tutors selected?</Typography>
        </AccordionSummary>
        <AccordionDetails 
        sx={{ backgroundColor: '#191918' }}>
          <Typography sx={{ fontSize: '1rem', color: {OFF_WHITE} }}>
          We release our tutor application during the first two weeks of the quarter. To be a tutor for lower-division classes, 
          they must have received a B+ or higher grade in that class. For upper-division classes, they must have received an A- or higher grade.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor: '#191918', width: '100%', boxShadow: 'none', marginTop: '1rem' }} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary 
          sx={{ backgroundColor: '#191918', width: '100%' }}           
          aria-controls="panel1a-content"
          id="panel1a-header"
          expandIcon={<ExpandMoreIcon fontSize="small"/>}
          >
          <Typography sx={{ backgroundColor: '#191918', fontSize: '1rem', color: {OFF_WHITE} }}>Is tutoring offered during the Summer?</Typography>
        </AccordionSummary>
        <AccordionDetails 
        sx={{ backgroundColor: '#191918' }}>
          <Typography sx={{ fontSize: '1rem', color: {OFF_WHITE} }}>
          Tutoring is not offered during the summer, but feel free to join our Discord server and reach out to anyone with the "Tutor" and "DMs Opened" role for help.
          </Typography>
        </AccordionDetails>
      </Accordion>

    </Box>
  )
}

export default FAQ;
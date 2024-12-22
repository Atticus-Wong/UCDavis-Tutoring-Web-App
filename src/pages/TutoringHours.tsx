import React from 'react';
import { Box } from "@mui/material";

const tutoringHours = () => {
  return (
    <Box sx={{ 
      maxWidth: '1328px', 
      margin: '0 auto',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <Box sx={{ 
        height: '75vh',
        width: '100%',
      }}>
        <iframe 
          src="https://calendar.google.com/calendar/embed?src=c_4nekt8ut9t99cj07oj3i4q0ndg%40group.calendar.google.com&ctz=America%2FLos_Angeles" 
          style={{ 
            border: 0, 
            width: '100%', 
            height: '100%' 
          }}
          allowFullScreen
        />
      </Box>
    </Box>
  );
};

export default tutoringHours;

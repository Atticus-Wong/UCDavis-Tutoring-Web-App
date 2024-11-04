import { Box, Grid } from "@mui/material";
import Image from "next/image";

const StatsImages = () => {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6} md={3}>
        <Box sx={{ position: 'relative', width: '100%', height: { xs: '200px', sm: '220px', md: '250px' } }}>
          <Image
            src="/Stats(handshake).svg"
            alt="affiliation logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box sx={{ position: 'relative', width: '100%', height: { xs: '200px', sm: '220px', md: '250px' } }}>
          <Image
            src="/Stats(1.7k).svg"
            alt="community logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box sx={{ position: 'relative', width: '100%', height: { xs: '200px', sm: '220px', md: '250px' } }}>
          <Image
            src="/Stats(stairs).svg"
            alt="upper/lower division logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box sx={{ position: 'relative', width: '100%', height: { xs: '200px', sm: '220px', md: '250px' } }}>
          <Image
            src="/Stats(120hours).svg"
            alt="120 hours"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default StatsImages;
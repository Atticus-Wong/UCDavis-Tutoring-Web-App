import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Image from 'next/image';

const StatsImages = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: '200px', sm: '220px', md: '225px' }
          }}
        >
          <Image
            src="/Stats(handshake).svg"
            alt="Handshake"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </Box>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: '200px', sm: '220px', md: '225px' }
          }}
        >
          <Image
            src="/Stats(stairs).svg"
            alt="upper/lower division logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </Box>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: '200px', sm: '220px', md: '225px' }
          }}
        >
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
// import Grid from '@mui/lab/Unstable_Grid2';
// import { Box } from '@mui/material';
// import Image from 'next/image';

// const StatsImages = () => {
//   return (
//     <Grid
//       container
//       spacing={2}
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//       }}
//     >
//       <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//         <Box
//           sx={{
//             position: 'relative',
//             width: '100%',
//             height: { xs: 200, sm: 220, md: 225 }
//           }}
//         >
//           <Image
//             src="/Stats(handshake).svg"
//             alt="Handshake"
//             fill
//             style={{ objectFit: 'contain' }}
//             priority
//           />
//         </Box>
//       </Grid>

//       <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//         <Box
//           sx={{
//             position: 'relative',
//             width: '100%',
//             height: { xs: 200, sm: 220, md: 225 }
//           }}
//         >
//           <Image
//             src="/Stats(stairs).svg"
//             alt="Stairs"
//             fill
//             style={{ objectFit: 'contain' }}
//             priority
//           />
//         </Box>
//       </Grid>

//       <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//         <Box
//           sx={{
//             position: 'relative',
//             width: '100%',
//             height: { xs: 200, sm: 220, md: 225 }
//           }}
//         >
//           <Image
//             src="/Stats(120hours).svg"
//             alt="120 hours"
//             fill
//             style={{ objectFit: 'contain' }}
//             priority
//           />
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default StatsImages;


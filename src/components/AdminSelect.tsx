import { Box, Button } from '@mui/material';
import React from 'react';

type AdminSelectProps = {
  selectedView: string,
  setSelectedView: (view: string) => void
}
const AdminSelect: React.FC<AdminSelectProps> = ({selectedView, setSelectedView}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',  
        gap: 2, 
        marginBottom: 2,
        width: '100%', 
      }}
    >
      <Button 
        variant={selectedView === 'tables' ? 'contained' : 'outlined'} 
        sx={{ flexGrow: 1 }}
        onClick={() => setSelectedView('tables')}
      >
        Tables
      </Button>
      <Button 
        variant={selectedView === 'dashboard' ? 'contained' : 'outlined'} 
        sx={{ flexGrow: 1 }}
        onClick={() => setSelectedView('dashboard')}
      >
        Dashboard
      </Button>
    </Box>
  );
};

export default AdminSelect;

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <>
      <div className='App'>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box> 
      </div> 
    </>
  )
}

export default Loading


import React, { useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useSelector } from 'react-redux';

import { userSelector } from '../../features/authUser';
import { useGetUsersListQuery } from '../../services/TMDB';

function Profile() {
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant='h4' gutterBottom>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
        </Typography>
      </Box>
    </Box>
  )
}

export default Profile;
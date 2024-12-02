import React, { useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { RatedCards } from '..';
import { userSelector } from '../../features/authUser';
import { useGetUsersListQuery } from '../../services/TMDB';

function Profile() {
  const { user } = useSelector(userSelector);
  const { data: favoriteMovies, refetch: refetchFavorited } = useGetUsersListQuery({
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
    list: 'favorite/movies',
  });
  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetUsersListQuery({
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
    list: 'watchlist/movies',
  });

  useEffect(() => {
    refetchFavorited();
    refetchWatchlisted();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const removeFromFavorites = async (movieId) => {
    const baseUrl = 'https://api.themoviedb.org/3';
    await axios.post(`${baseUrl}/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: movieId,
      favorite: false,
    });
    refetchFavorited();
  };

  const removeFromWatchlist = async (movieId) => {
    const baseUrl = 'https://api.themoviedb.org/3';
    await axios.post(`${baseUrl}/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: movieId,
      watchlist: false,
    });
    refetchWatchlisted();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant="h5">Add favorites or watchlist some movies to see them here!</Typography>
      ) : (
        <Box>
          <RatedCards
            title="Favorite Movies"
            data={favoriteMovies}
            onRemove={removeFromFavorites}
          />
          <RatedCards
            title="Watchlist"
            data={watchlistMovies}
            onRemove={removeFromWatchlist}
          />
        </Box>
      )}
    </Box>
  );
}

export default Profile;

import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useGetMoviesQuery } from "../../services/TMDB";
import MovieList from "../MovieList/MovieList"; // Update the import path

const Movies = () => {
  const { data, error, isFetching } = useGetMoviesQuery();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data || !data.results || data.results.length === 0) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that matched the name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }

  if (error) {
    return 'An error has occurred.';
  }

  return (
    <div>
      <MovieList movies={data} /> {/* Access 'results' property */}
    </div>
  );
};

export default Movies;

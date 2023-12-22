import React,{useState,useEffect} from "react";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory"
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useGetMoviesQuery } from "../../services/TMDB";
import MovieList from "../MovieList/MovieList"; // Update the import path

const Movies = () => {
  const [page, setpage] = useState(1);
  const { genreIdOrCategoryName,searchQuery } =useSelector((state) => state.currentGenreOrCategory)
  const { data, error, isFetching } = useGetMoviesQuery({genreIdOrCategoryName,page,searchQuery});

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

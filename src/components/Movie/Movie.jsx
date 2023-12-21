import React from "react";
import { Typography, Grid, Grow, Tooltip, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import useStyle from "./styles";
const Movie = ({ movie, i }) => {
  const classes = useStyle();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Typography className={classes.title} varient='h5'>
        {movie.title}
      </Typography>
    </Grid>
  );
};

export default Movie;

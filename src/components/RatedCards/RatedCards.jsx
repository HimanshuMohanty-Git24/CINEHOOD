import React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Movie } from '..';
import useStyles from './styles';

function RatedCards({ title, data, onRemove }) {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Box display="flex" flexWrap="wrap">
        {data?.results?.map((movie, i) => (
          <Box key={movie.id} className={classes.movieContainer}>
            <IconButton
              className={classes.removeButton}
              onClick={() => onRemove(movie.id)}
              color="error"
            >
              <Delete />
            </IconButton>
            <Movie movie={movie} i={i} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default RatedCards;

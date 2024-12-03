import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Movie } from '@mui/icons-material';
import useStyles from './styles';

function AIResponseCard({ response }) {
  const classes = useStyles();

  return (
    <Card className={classes.aiResponseCard}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Movie className={classes.movieIcon} />
          <Typography variant="h6" component="div">
            AI Recommendation
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          {response}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default AIResponseCard;

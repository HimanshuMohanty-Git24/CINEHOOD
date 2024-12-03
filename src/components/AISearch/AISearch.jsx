import React, { useState, useRef } from 'react';
import { Box, CircularProgress, Typography, IconButton } from '@mui/material';
import { VolumeUp, VolumeOff } from '@mui/icons-material';
import AISearchBar from './AISearchBar';
import AIResponseCard from './AIResponseCard';
import { MovieList } from '..';
import useStyles from './styles';
import { processAIQuery, textToSpeech } from '../../services/AIService';
import { useMovieSearch } from '../../hooks/useMovieSearch';

function AISearch() {
  const classes = useStyles();
  const [aiResponse, setAiResponse] = useState('');
  const [movieResults, setMovieResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { searchMovie } = useMovieSearch();

  const handleSearch = async (query, isVoiceInput = false) => {
    setIsLoading(true);
    setAiResponse('');
    setMovieResults([]);

    try {
      const response = await processAIQuery(query);
      setAiResponse(response.recommendation);

      if (isVoiceInput) {
        const audioResponse = await textToSpeech(response.recommendation, true);
        if (audioResponse && !audioResponse.skip) {
          const audioUrl = URL.createObjectURL(audioResponse);
          if (audioRef.current) {
            audioRef.current.src = audioUrl;
            audioRef.current.play();
            setIsPlaying(true);
          }
        }
      }

      const results = await Promise.all(
        response.movieTitles.map(searchMovie),
      );

      const validResults = results.filter(Boolean);
      if (validResults.length > 0) {
        setMovieResults(validResults);
      }
    } catch (error) {
      console.error('Search error:', error);
      setAiResponse(error.message || 'Sorry, there was an error processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Box className={classes.container}>
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        style={{ display: 'none' }}
      >
        <track kind="captions" />
      </audio>
      <AISearchBar onSearch={handleSearch} />
      {isLoading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
      {aiResponse && (
        <Box display="flex" alignItems="center">
          <AIResponseCard response={aiResponse} />
          {audioRef.current?.src && (
            <IconButton onClick={toggleAudio} color="primary">
              {isPlaying ? <VolumeUp /> : <VolumeOff />}
            </IconButton>
          )}
        </Box>
      )}
      {movieResults.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom>
            Recommended Movies
          </Typography>
          <MovieList
            movies={{ results: movieResults }}
            numberOfMovies={movieResults.length}
          />
        </>
      )}
    </Box>
  );
}

export default AISearch;

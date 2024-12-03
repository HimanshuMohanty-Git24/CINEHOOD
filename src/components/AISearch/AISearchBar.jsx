import React, { useState } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import { Search as SearchIcon, Mic } from '@mui/icons-material';
import { processVoiceInput } from '../../services/AIService';
import useStyles from './styles';

function AISearchBar({ onSearch }) {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = React.useRef(null);

  const handleVoiceSearch = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        sampleRate: 16000,
      });
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });
      const chunks = [];

      mediaRecorder.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.current.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());

        try {
          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          const transcript = await processVoiceInput(audioBlob);
          setQuery(transcript);
          onSearch(transcript, true);
        } catch (error) {
          console.error('Voice processing error:', error);
        }
      };

      setIsRecording(true);
      mediaRecorder.current.start();

      setTimeout(() => {
        if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
          mediaRecorder.current.stop();
          setIsRecording(false);
        }
      }, 5000);
    } catch (error) {
      console.error('Voice input error:', error);
      setIsRecording(false);
    }
  };

  return (
    <Paper className={classes.searchContainer}>
      <InputBase
        placeholder="Ask for movie recommendations..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={classes.input}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSearch(query, false);
          }
        }}
      />
      <IconButton onClick={() => onSearch(query, false)}>
        <SearchIcon />
      </IconButton>
      <IconButton
        onClick={handleVoiceSearch}
        color={isRecording ? 'secondary' : 'default'}
      >
        <Mic />
      </IconButton>
    </Paper>
  );
}

export default AISearchBar;

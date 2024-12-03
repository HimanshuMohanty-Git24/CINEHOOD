import Groq from 'groq-sdk';
import { createClient } from '@deepgram/sdk';

const validateEnvVariables = () => {
  const missing = [];
  if (!process.env.REACT_APP_GROQ_API_KEY) missing.push('REACT_APP_GROQ_API_KEY');
  if (!process.env.REACT_APP_DEEPGRAM_API_KEY) missing.push('REACT_APP_DEEPGRAM_API_KEY');
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
};

const initializeClients = () => {
  try {
    validateEnvVariables();
    return {
      groq: new Groq({
        apiKey: process.env.REACT_APP_GROQ_API_KEY,
        dangerouslyAllowBrowser: true,
      }),
      deepgram: createClient(process.env.REACT_APP_DEEPGRAM_API_KEY),
    };
  } catch (error) {
    console.error('API Client Initialization Error:', error);
    return { groq: null, deepgram: null };
  }
};

const { groq } = initializeClients();

export const processAIQuery = async (query) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a movie recommendation expert. Provide concise recommendations.',
        },
        {
          role: 'user',
          content: `Suggest 5 movies for: ${query}. Respond in this exact JSON format:
          {
            "recommendation": "Brief explanation under 100 words",
            "movieTitles": ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5"]
          }`,
        },
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error('AI Query Error:', error);
    return {
      recommendation: "Sorry, couldn't process your request.",
      movieTitles: [],
    };
  }
};

export const processVoiceInput = async (audioBlob) => {
  try {
    if (!groq) {
      throw new Error('Groq client not initialized');
    }

    const file = new File([audioBlob], 'audio.webm', { type: 'audio/webm' });

    const transcription = await groq.audio.transcriptions.create({
      file,
      model: 'whisper-large-v3-turbo',
      language: 'en',
      response_format: 'json',
    });

    if (!transcription?.text) {
      throw new Error('No transcript generated');
    }

    return transcription.text;
  } catch (error) {
    console.error('Voice Processing Error:', error);
    throw new Error(`Voice processing failed: ${error.message}`);
  }
};

export const textToSpeech = async (text, isVoiceInput) => {
  try {
    const response = await fetch('http://localhost:3001/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, isVoiceInput }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.blob();
    return data;
  } catch (error) {
    console.error('TTS Error:', error);
    throw new Error(`Text-to-speech failed: ${error.message}`);
  }
};

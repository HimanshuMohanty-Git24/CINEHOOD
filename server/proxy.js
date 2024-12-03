const express = require('express');
const cors = require('cors');
const { createClient } = require('@deepgram/sdk');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

async function streamToBuffer(stream) {
  const chunks = [];
  const reader = stream.getReader();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  return Buffer.concat(chunks);
}

app.post('/api/tts', async (req, res) => {
  try {
    const { text, isVoiceInput } = req.body;

    if (!isVoiceInput) {
      return res.status(200).json({ skip: true });
    }

    const response = await deepgram.speak.request(
      { text },
      {
        model: 'aura-asteria-en',
        encoding: 'linear16',
        container: 'wav',
      },
    );

    const stream = await response.getStream();
    const audioData = await streamToBuffer(stream);
    res.setHeader('Content-Type', 'audio/wav');
    res.send(audioData);
  } catch (error) {
    console.error('TTS Error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

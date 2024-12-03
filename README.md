# CINEHOOD - Your Ultimate Movie Information Hub 🎬

![MainPage](https://github.com/HimanshuMohanty-Git24/CINEHOOD/assets/94133298/0a677023-b5cf-4766-82aa-23bd5812e77c)

Welcome to CINEHOOD, your one-stop solution for all things related to movies. This repository contains the source code for the CINEHOOD website, a feature-rich application built using React.js, Redux, Alan AI, TMDB API, Material-UI, and advanced AI capabilities. Whether you're a movie enthusiast or just looking for information about your favorite films, CINEHOOD has got you covered.

## Features 🚀

- **User Authentication:** Securely create accounts and log in to access personalized features.
- **Light and Dark Mode:** Customize your viewing experience with light and dark themes.
- **API Calls with Axios and Redux:** Utilize the power of Redux for state management and Axios for efficient API calls.
- **Actors and Movie Details Page:** Dive deep into the world of movies with detailed information about actors and movies.
- **Watchlist and Favorites:** Keep track of movies you want to watch and save your favorites for future reference.
- **Movie Search Functionality:** Easily search for movies based on various criteria.
- **Alan AI Voice Functionality:** Experience hands-free interaction with the application using Alan AI.
- **AI-Powered Movie Recommendations:** Get personalized movie suggestions using advanced AI models.
- **Voice Search:** Search for movies using voice commands with Groq's Whisper model.
- **Voice Response:** Hear AI recommendations through Deepgram's text-to-speech technology.

## Technologies Used 🛠️

- **Frontend:**
  - React.js: A powerful JavaScript library for building user interfaces
  - Redux: A predictable state container for state management
  - Material-UI: A React UI framework for responsive design
  
- **AI & Voice:**
  - Alan AI: Voice command integration
  - Groq AI: Advanced language model for recommendations
  - Deepgram: Text-to-speech capabilities
  
- **Backend:**
  - Express.js: Node.js web application framework
  - TMDB API: Movie database integration
  
- **APIs:**
  - TMDB API: Movie information
  - Groq API: AI recommendations
  - Deepgram API: Voice features

## Getting Started 🏁

To run CINEHOOD locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/HimanshuMohanty-Git24/CINEHOOD.git
   ```

2. Install frontend dependencies:

   ```bash
   cd CINEHOOD
   npm install
   ```

3. Install server dependencies:

   ```bash
   cd server
   npm install
   ```
4. Create .env files:

Frontend (.env):
   ```
   REACT_APP_TMDB_KEY=your_tmdb_key
   REACT_APP_ALAN_KEY=your_alan_key
   REACT_APP_GROQ_API_KEY=your_groq_key
   REACT_APP_DEEPGRAM_API_KEY=your_deepgram_key
   ```
Server (server/.env):
   ```
   DEEPGRAM_API_KEY=your_deepgram_key
   PORT=3001
   ```
5. Start both servers:
In the root directory:
   ```
   npm run dev
   ```
6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Features Usage 🎯

- AI Search: Use natural language to get movie recommendations
- Voice Search: Click the microphone icon to search using voice
- Text Search: Type queries for traditional search
- Movie Details: Click on any movie to see detailed information
- Favorites: Save movies to your favorites list
- Voice Commands: Use Alan AI for hands-free navigation

## Live Site 🌐

Explore the live CINEHOOD site [here](https://cinehood.netlify.app/).

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for checking out CINEHOOD! I hope you enjoy exploring the world of movies with our feature-packed application. If you have any questions or feedback, feel free to reach out. Happy movie watching and Coding!

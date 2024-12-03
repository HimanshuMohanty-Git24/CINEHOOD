import axios from 'axios';

export const useMovieSearch = () => {
  const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
  const baseUrl = 'https://api.themoviedb.org/3';

  const searchMovie = async (title) => {
    try {
      const cleanTitle = encodeURIComponent(title.trim());
      const response = await axios.get(
        `${baseUrl}/search/movie?api_key=${tmdbApiKey}&query=${cleanTitle}&page=1`,
      );
      return response.data?.results?.[0] || null;
    } catch (error) {
      console.error(`Error searching for movie: ${title}`, error);
      return null;
    }
  };

  return { searchMovie };
};

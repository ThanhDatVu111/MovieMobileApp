//This exports a config object that stores all your reusable settings for talking to the TMDB API.
export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({
  query,
}: {
  query: string;
}): Promise<Movie[]> => {
  // Determine the API endpoint based on whether a search query is provided.
  // If there is a query, use the /search/movie endpoint to find matching movies.
  // If not, use the /discover/movie endpoint to fetch popular movies by default.
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results; // ← this is the array of Movie[]
};

// fetchMovieDetails is an async function.
// It takes one input: movieId, which must be a string.
// It returns a Promise<MovieDetails> → meaning:
// "Eventually, this function will return an object that matches the MovieDetails type."
export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }
    const data = await response.json();
    return data; //an object containing all details about one movie, and it's what gets returned by fetchMovieDetails().
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
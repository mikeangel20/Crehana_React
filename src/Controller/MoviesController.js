export const getMoviesList = async (movie) => {
  try {
    if (movie !== "") {
      const response = await fetch(
        `https://imdb-api.com/API/Search/${process.env.REACT_APP_APP_KEY}/${movie}`
      );
      const movies = await response.json();
      const result = movies.results;
      return result;
    }
  } catch (ex) {
    throw ex;
  }
};

export const getMovieID = async (ID) => {
  try {
    if (ID !== "") {
      const response = await fetch(
        `https://imdb-api.com/en/API/Ratings/${process.env.REACT_APP_APP_KEY}/${ID}`
      );
      const movie = await response.json();
      return movie;
    }
  } catch (ex) {
    throw ex;
  }
};

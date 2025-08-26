//import React from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import AddToWatchListIcon from "../components/cardIcons/addToWatchList";
import Stack from "@mui/material/Stack";

const HomePage = (props) => {

  const { data, error, isLoading, isError } = useQuery('discover', getMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  const movies = data.results;

  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true

  const watchlist = movies.filter(m => m.watchlist)
  localStorage.setItem('watchlist', JSON.stringify(watchlist))
  const addToWatchList = (movieId) => true

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <Stack direction="column" spacing={1}>
              <AddToFavoritesIcon movie={movie} />
              <AddToWatchListIcon movie={movie} />
            </Stack>
          </>
        )
      }}
    />
  );
};
export default HomePage;
import { useEffect, useReducer } from "react";
import { CircularProgress } from "@mui/material";
import { appReducer } from "./reducers";
import { useFetchData, useSubmitReview } from "./hooks";
import { ErrorAlert, Header, MoviesTable, ReviewForm } from "./components";
import { AppState } from "./types";

const api_url = import.meta.env.VITE_API_URL;
const initialState: AppState = {
  isLoading: false,
  error: null,
  movies: [],
  movieCompanies: [],
  responseMessage: null,
  selectedMovieId: null,
};

export const App = () => {
  const [appState, appDispatch] = useReducer(appReducer, initialState);

  const { fetchData, refreshMovies } = useFetchData(appDispatch, api_url);
  const handleSubmit = useSubmitReview(appState, appDispatch, api_url);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (appState.error) {
    return <ErrorAlert error={appState.error} refreshMovies={refreshMovies} />;
  }

  return (
    <>
      <Header totalMovies={appState.movies.length} refreshMovies={refreshMovies} />
      {appState.isLoading && <CircularProgress />}
      <MoviesTable
        movies={appState.movies}
        movieCompanies={appState.movieCompanies}
        selectedMovieId={appState.selectedMovieId}
        appDispatch={appDispatch}
      />
      <ReviewForm
        selectedMovieId={appState.selectedMovieId}
        movies={appState.movies}
        handleSubmit={handleSubmit}
        responseMessage={appState.responseMessage}
      />
    </>
  );
};

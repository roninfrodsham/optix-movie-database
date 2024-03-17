import { useEffect, useReducer, useState } from "react";
import { CircularProgress } from "@mui/material";
import { apiReducer } from "./reducers/apiReducer";
import { ErrorAlert, Header, MoviesTable, ReviewForm } from "./components";

const api_url = import.meta.env.VITE_API_URL;

export const App = () => {
  const [state, dispatch] = useReducer(apiReducer, {
    isLoading: false,
    error: null,
    movies: [],
    movieCompanies: [],
  });
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []); // fetchData is not a dependency as it doesn't use any values from the component scope

  const fetchData = async () => {
    dispatch({ type: "FETCH_INIT" });

    try {
      const [movies, movieCompanies] = await Promise.all([
        fetch(`${api_url}/movies`).then((res) => res.json()),
        fetch(`${api_url}/movieCompanies`).then((res) => res.json()),
      ]);

      dispatch({ type: "FETCH_SUCCESS", payload: { movies, movieCompanies } });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: "FETCH_FAILURE", payload: error });
      } else {
        dispatch({ type: "FETCH_FAILURE", payload: new Error(String(error)) });
      }
    }
  };

  if (state.error) {
    return <ErrorAlert error={state.error} onRefresh={fetchData} />;
  }

  return (
    <div>
      <Header totalMovies={state.movies.length} onRefresh={fetchData} />
      {state.isLoading && <CircularProgress />}
      <MoviesTable
        movies={state.movies}
        movieCompanies={state.movieCompanies}
        selectedMovieId={selectedMovieId}
        setSelectedMovieId={setSelectedMovieId}
      />
      <ReviewForm selectedMovieId={selectedMovieId} movies={state.movies} />
    </div>
  );
};

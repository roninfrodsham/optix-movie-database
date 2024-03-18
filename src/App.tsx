import { useEffect, useReducer } from "react";
import { CircularProgress } from "@mui/material";
import { apiReducer, reviewReducer } from "./reducers";
import { ErrorAlert, Header, MoviesTable, ReviewForm } from "./components";
import { SubmitResponse, ActionTypes } from "./types";

const api_url = import.meta.env.VITE_API_URL;

export const App = () => {
  const [apiState, apiDispatch] = useReducer(apiReducer, {
    isLoading: false,
    error: null,
    movies: [],
    movieCompanies: [],
    responseMessage: null,
  });
  const [reviewState, reviewDispatch] = useReducer(reviewReducer, {
    review: "",
    selectedMovieId: null,
  });

  const fetchData = async () => {
    apiDispatch({ type: ActionTypes.FETCH_INIT });

    try {
      const [movies, movieCompanies] = await Promise.all([
        fetch(`${api_url}/movies`).then((res) => res.json()),
        fetch(`${api_url}/movieCompanies`).then((res) => res.json()),
      ]);

      apiDispatch({ type: ActionTypes.FETCH_SUCCESS, payload: { movies, movieCompanies } });
    } catch (error) {
      if (error instanceof Error) {
        apiDispatch({ type: ActionTypes.FETCH_FAILURE, payload: error });
      } else {
        apiDispatch({ type: ActionTypes.FETCH_FAILURE, payload: new Error(String(error)) });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // fetchData is not a dependency as it doesn't use any values from the component scope

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (reviewState.selectedMovieId !== null) {
      try {
        const response = await fetch(`${api_url}/submitReview`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId: reviewState.selectedMovieId,
            review: reviewState.review,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: SubmitResponse = await response.json();
        apiDispatch({ type: ActionTypes.SUBMIT_SUCCESS, payload: data.message });
        reviewDispatch({ type: ActionTypes.CLEAR_REVIEW });
        reviewDispatch({ type: ActionTypes.CLEAR_SELECTED_MOVIE });
      } catch (error) {
        if (error instanceof Error) {
          apiDispatch({ type: ActionTypes.FETCH_FAILURE, payload: error });
        } else {
          apiDispatch({ type: ActionTypes.FETCH_FAILURE, payload: new Error(String(error)) });
        }
      }
    }
  };

  const refreshMovies = () => {
    reviewDispatch({ type: ActionTypes.CLEAR_REVIEW });
    reviewDispatch({ type: ActionTypes.CLEAR_SELECTED_MOVIE });
    fetchData();
  };

  if (apiState.error) {
    return <ErrorAlert error={apiState.error} refreshMovies={refreshMovies} />;
  }

  return (
    <div>
      <Header totalMovies={apiState.movies.length} refreshMovies={refreshMovies} />
      {apiState.isLoading && <CircularProgress />}
      <MoviesTable
        movies={apiState.movies}
        movieCompanies={apiState.movieCompanies}
        selectedMovieId={reviewState.selectedMovieId}
        apiDispatch={apiDispatch}
        reviewDispatch={reviewDispatch}
      />
      <ReviewForm
        selectedMovieId={reviewState.selectedMovieId}
        movies={apiState.movies}
        review={reviewState.review}
        reviewDispatch={reviewDispatch}
        handleSubmit={handleSubmit}
        responseMessage={apiState.responseMessage}
      />
    </div>
  );
};

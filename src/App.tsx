import { useEffect, useReducer, useState } from "react";
import { CircularProgress } from "@mui/material";
import { apiReducer } from "./reducers/apiReducer";
import { ErrorAlert, Header, MoviesTable, ReviewForm } from "./components";
import { SubmitResponse } from "./types";

const api_url = import.meta.env.VITE_API_URL;

export const App = () => {
  const [state, dispatch] = useReducer(apiReducer, {
    isLoading: false,
    error: null,
    movies: [],
    movieCompanies: [],
  });
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [review, setReview] = useState("");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedMovieId !== null) {
      try {
        const response = await fetch(`${api_url}/submitReview`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId: selectedMovieId,
            review: review,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: SubmitResponse = await response.json();
        console.log(data.message);
        setResponseMessage(data.message);
        setReview("");
        setSelectedMovieId(null);
      } catch (error) {
        console.error("Error:", error);
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
        setReview={setReview}
        setResponseMessage={setResponseMessage}
      />
      <ReviewForm
        selectedMovieId={selectedMovieId}
        movies={state.movies}
        review={review}
        setReview={setReview}
        handleSubmit={handleSubmit}
        responseMessage={responseMessage}
      />
    </div>
  );
};

import { useEffect, useReducer } from "react";
import { CircularProgress } from "@mui/material";
import { apiReducer } from "./reducers/apiReducer";
import { ErrorAlert } from "./components/ErrorAlert";
import { Header } from "./components/Header";

const api_url = import.meta.env.VITE_API_URL;

export const App = () => {
  const [state, dispatch] = useReducer(apiReducer, {
    isLoading: false,
    error: null,
    movies: [],
    movieCompanies: [],
  });

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

      console.log(movies, movieCompanies);
      dispatch({ type: "FETCH_SUCCESS", payload: { movies, movieCompanies } });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        dispatch({ type: "FETCH_FAILURE", payload: error });
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
    </div>
  );
};

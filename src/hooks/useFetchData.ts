import { useCallback } from "react";
import { ActionTypes, AppAction } from "../types";

type FetchMethods = {
  fetchData: () => void;
  refreshMovies: () => void;
};

const fetchMovies = async (api_url: string) => {
  const response = await fetch(`${api_url}/movies`);
  return response.json();
};

const fetchMovieCompanies = async (api_url: string) => {
  const response = await fetch(`${api_url}/movieCompanies`);
  return response.json();
};

const useFetchData = (apiDispatch: React.Dispatch<AppAction>, api_url: string): FetchMethods => {
  const fetchData = useCallback(async () => {
    apiDispatch({ type: ActionTypes.FETCH_INIT });

    try {
      const [movies, movieCompanies] = await Promise.all([fetchMovies(api_url), fetchMovieCompanies(api_url)]);
      apiDispatch({ type: ActionTypes.FETCH_SUCCESS, payload: { movies, movieCompanies } });
    } catch (error) {
      if (error instanceof Error) {
        apiDispatch({ type: ActionTypes.FETCH_FAILURE, payload: error });
      } else {
        apiDispatch({ type: ActionTypes.FETCH_FAILURE, payload: new Error(String(error)) });
      }
    }
  }, [apiDispatch, api_url]);

  const refreshMovies = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { fetchData, refreshMovies };
};

export { useFetchData };

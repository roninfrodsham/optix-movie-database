import { State, Action } from "../types";

export const apiReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: null,
        movies: action.payload.movies,
        movieCompanies: action.payload.movieCompanies,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error();
  }
};

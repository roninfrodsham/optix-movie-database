import { AppState, AppAction, ActionTypes } from "../types";

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case ActionTypes.FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        movies: action.payload.movies,
        movieCompanies: action.payload.movieCompanies,
      };
    case ActionTypes.FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ActionTypes.SUBMIT_SUCCESS:
      return { ...state, selectedMovieId: null, responseMessage: action.payload };
    case ActionTypes.SET_SELECTED_MOVIE:
      return { ...state, selectedMovieId: action.payload };
    case ActionTypes.RESET_REVIEW_STATE:
      return { ...state, selectedMovieId: null, responseMessage: null };
    default:
      return state;
  }
};

export { appReducer };

export type AppState = {
  isLoading: boolean;
  error: Error | null;
  movies: Movie[] | [];
  movieCompanies: MovieCompanies[] | [];
  responseMessage: string | null;
  selectedMovieId: number | null;
};

export enum ActionTypes {
  FETCH_INIT = "FETCH_INIT",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_FAILURE = "FETCH_FAILURE",
  SET_REVIEW = "SET_REVIEW",
  CLEAR_REVIEW = "CLEAR_REVIEW",
  SET_SELECTED_MOVIE = "SET_SELECTED_MOVIE",
  CLEAR_SELECTED_MOVIE = "CLEAR_SELECTED_MOVIE",
  SUBMIT_SUCCESS = "SUBMIT_SUCCESS",
  RESET_REVIEW_STATE = "RESET_REVIEW_STATE",
}

export type AppAction =
  | { type: ActionTypes.FETCH_INIT }
  | { type: ActionTypes.FETCH_SUCCESS; payload: { movies: Movie[]; movieCompanies: MovieCompanies[] } }
  | { type: ActionTypes.FETCH_FAILURE; payload: Error }
  | { type: ActionTypes.SUBMIT_SUCCESS; payload: string }
  | { type: ActionTypes.SET_REVIEW; payload: string }
  | { type: ActionTypes.SET_SELECTED_MOVIE; payload: number }
  | { type: ActionTypes.RESET_REVIEW_STATE };

export type Movie = {
  id: number;
  title: string;
  reviews: number[];
  filmCompanyId: number;
};

export type MovieCompanies = {
  id: number;
  name: string;
};

export type SubmitResponse = {
  message: string;
};

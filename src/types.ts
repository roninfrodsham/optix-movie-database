export type ApiState = {
  isLoading: boolean;
  error: Error | null;
  movies: Movie[] | [];
  movieCompanies: MovieCompanies[] | [];
  responseMessage: string | null;
};

export type ReviewState = {
  selectedMovieId: number | null;
  review: string;
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
  CLEAR_RESPONSE_MESSAGE = "CLEAR_RESPONSE_MESSAGE",
}

export type ApiAction =
  | { type: ActionTypes.FETCH_INIT }
  | { type: ActionTypes.FETCH_SUCCESS; payload: { movies: Movie[]; movieCompanies: MovieCompanies[] } }
  | { type: ActionTypes.FETCH_FAILURE; payload: Error }
  | { type: ActionTypes.SUBMIT_SUCCESS; payload: string }
  | { type: ActionTypes.CLEAR_RESPONSE_MESSAGE };

export type ReviewAction =
  | { type: ActionTypes.SET_REVIEW; payload: string }
  | { type: ActionTypes.CLEAR_REVIEW }
  | { type: ActionTypes.SET_SELECTED_MOVIE; payload: number }
  | { type: ActionTypes.CLEAR_SELECTED_MOVIE };

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

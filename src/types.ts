export type State = {
  isLoading: boolean;
  error: Error | null;
  movies: Movie[] | [];
  movieCompanies: MovieCompanies[] | [];
};

export type Action =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: { movies: Movie[]; movieCompanies: MovieCompanies[] } }
  | { type: "FETCH_FAILURE"; payload: Error };

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

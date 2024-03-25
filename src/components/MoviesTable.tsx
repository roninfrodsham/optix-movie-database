import { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Movie, MovieCompanies, AppAction, ActionTypes } from "../types";

type MoviesTableProps = {
  movies: Movie[];
  movieCompanies: MovieCompanies[];
  selectedMovieId: number | null;
  appDispatch: React.Dispatch<AppAction>;
};

const MoviesTable = ({ movies, movieCompanies, selectedMovieId, appDispatch }: MoviesTableProps) => {
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const sortedMovies = useMemo(() => {
    return [...movies].sort((a, b) => {
      const aAverageReview = a.reviews.reduce((acc, val) => acc + val, 0) / a.reviews.length;
      const bAverageReview = b.reviews.reduce((acc, val) => acc + val, 0) / b.reviews.length;
      return sortOrder === "desc" ? bAverageReview - aAverageReview : aAverageReview - bAverageReview;
    });
  }, [movies, sortOrder]);

  const sortMovies = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: "2em" }}>
      <Table sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#d9f0fa" }}>
            <TableCell sx={{ color: "#005999" }}>Title</TableCell>
            <TableCell
              sx={{ color: "#005999", display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              Reviews
              <IconButton color='inherit' size='small' onClick={sortMovies}>
                <ArrowUpwardIcon
                  fontSize='small'
                  sx={{
                    transform: `rotate(${sortOrder === "desc" ? "0deg" : "180deg"})`,
                    transition: "transform 0.3s ease-in-out",
                  }}
                />
              </IconButton>
            </TableCell>
            <TableCell sx={{ color: "#005999" }}>Film Company</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedMovies.map((movie: Movie) => (
            <TableRow
              hover
              key={`movie-${movie.id}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
              onClick={() => {
                appDispatch({ type: ActionTypes.RESET_REVIEW_STATE });
                selectedMovieId !== movie.id &&
                  appDispatch({ type: ActionTypes.SET_SELECTED_MOVIE, payload: movie.id });
              }}
              selected={selectedMovieId === movie.id}
            >
              <TableCell component='th' scope='row'>
                {movie.title}
              </TableCell>
              <TableCell>{(movie.reviews.reduce((a, b) => a + b, 0) / movie.reviews.length).toFixed(1)}</TableCell>
              <TableCell>
                {movieCompanies.find((company) => company.id === movie.filmCompanyId)?.name || "Unknown"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { MoviesTable };

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Movie, MovieCompanies } from "../types";

type MoviesTableProps = {
  movies: Movie[];
  movieCompanies: MovieCompanies[];
};

const MoviesTable = ({ movies, movieCompanies }: MoviesTableProps) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: "2em" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#d9f0fa" }}>
            <TableCell sx={{ color: "#005999" }}>Title</TableCell>
            <TableCell
              sx={{ color: "#005999", display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              Reviews
            </TableCell>
            <TableCell sx={{ color: "#005999" }}>Film Company</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie: Movie) => (
            <TableRow
              hover
              key={`movie-${movie.id}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 }, cursor: "pointer" }}
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

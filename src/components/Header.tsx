import { Alert, Button } from "@mui/material";
import { H1 } from "./StyledComponents";

type HeaderProps = {
  totalMovies: number;
  onRefresh: () => void;
};

const Header = ({ totalMovies, onRefresh }: HeaderProps) => {
  return (
    <>
      <H1>Welcome to Movie database!</H1>
      {totalMovies > 0 ? (
        <Alert
          severity='info'
          action={
            <Button color='inherit' size='small' onClick={onRefresh}>
              Refresh Movies
            </Button>
          }
        >
          Total movies displayed {totalMovies}
        </Alert>
      ) : null}
    </>
  );
};

export { Header };

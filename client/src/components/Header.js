import { Link } from "react-router-dom";
import { useStyles } from "../styles";

export const Header = ({ user, setUser }) => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <h1>
        <Link to="/">File archive</Link>
      </h1>
      {user && (
        <nav>
          <Link to="/upload">Upload a file</Link>
          <Link
            to="/"
            onClick={() => {
              localStorage.removeItem("user");
              setUser();
            }}
          >
            Change user
          </Link>
        </nav>
      )}
    </header>
  );
};

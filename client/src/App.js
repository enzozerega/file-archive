import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme, useStyles } from "./styles";
import { Home, Upload } from "./views";
import { Header } from "./components";

const App = () => {
  const location = useLocation();
  const classes = useStyles();
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.container}>
        <Header user={user} setUser={setUser} />
        <main className={classes.main}>
          <Routes location={location} key={location.key}>
            <Route
              path="/"
              exact
              element={<Home user={user} setUser={setUser} />}
            />
            <Route
              path="/upload"
              exact
              element={
                user ? (
                  <Upload uploadedBy={user} />
                ) : (
                  <Home user={user} setUser={setUser} />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;

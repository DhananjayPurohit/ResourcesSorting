import React, { useState } from "react";
import ReactDOM from "react-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import SearchResult from "./SearchResults";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Search() {
  const classes = useStyles();

  const [search, setSearch] = useState("");

  const [txt, setTxt] = useState("");

  const [count, setCount] = useState(0);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(search);
    // `https://api.github.com/search/repositories?q=${search}&sort=stars&order=desc`
    fetch(`https://api.github.com/search/repositories?q=${search}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const Sresults = data.items.map((data) => <SearchResult data={data} key={data.id}/>);
        ReactDOM.render(Sresults, document.getElementById("search-results"));
      });
      setTxt("Sorted Resources");
    setCount(count+1);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
            <Typography component="h1" variant="h5">
              Search Resources
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Search"
                label="Search"
                name="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                autoComplete="search"
                helperText={count > 0 ? "Can search more keywords." : " "}
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSearch}
              >
                Search
              </Button>
            </form>
            <div id="search-results"></div>
          </div>
        </Container>
      </Grid>
      <Grid item xs={6}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                {txt}
              </Typography>
            <div id="selected-results"></div>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

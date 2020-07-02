import React, { useState } from "react";
import CardContent from "@material-ui/core/CardContent";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import { makeStyles } from "@material-ui/core/styles";

const useStylesSR = makeStyles({
    root: {
      minWidth: 500,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 12,
    },
    pos: {
      marginBottom: 12,
    },
  });


export default function SearchElement(props){
    const data = props.data;
  
    const classes = useStylesSR();

    return (
      <CardContent>
          <LibraryBooksOutlinedIcon fontSize="small" />
          <Button size="large" color="primary" target="_blank" href={data.html_url} style={{ textTransform: "none" }}>
            {data.full_name}
          </Button>
          <Typography className={classes.pos} color="textSecondary">
            {data.description}
          </Typography>
          <Typography color="textSecondary" variant="caption">
            <StarIcon fontSize="small" style={{ verticalAlign: "bottom" }} />
            {data.stargazers_count} {data.language} {"Updated on "}
            {data.updated_at}
          </Typography>
        </CardContent>
    );
  }
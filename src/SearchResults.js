import React, { useState } from "react";
import CardContent from "@material-ui/core/CardContent";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";
import { makeStyles } from "@material-ui/core/styles";
import SearchElement from "./SearchElements";
import ReactDOM from "react-dom";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";

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
  
  var datalist = [];
  
export default function SearchResult(props) {
    const classes = useStylesSR();
    const data = props.data;
  
    const [checked, setChecked] = useState(false);
  
    const handleChange = (event, data) => {
      setChecked(event.target.checked);
      if (!checked) {
        datalist.push({info: data,score: Score(data)});
      } else {
        var index = datalist.findIndex((i) => i.info.id == data.id);
        if (index!=-1)
        datalist.splice(index, 1);
      }
      Sort(datalist);
      selEl();
    };
  
    const date_diff = (Sdate,Ldate) => {
      var diff_in_time=(new Date(Ldate)).getTime()-(new Date(Sdate)).getTime();
      var diff_in_days=diff_in_time/(1000*3600*24);
      return diff_in_days;
    }

    const Score = (data) => {
      var diff_in_pushed_updated=date_diff(data.created_at, data.updated_at);
      var diff_in_last_update=date_diff(data.updated_at, new Date());
      var score=(data.stargazers_count*0.01+data.forks_count*0.01+diff_in_pushed_updated*0.01)/diff_in_last_update;
      return score;
    }

    const Sort = (datalist) => {
      datalist.sort(function(a,b){
        return b['score']-a['score'];
      })
    }

    const selEl = () => {
      console.log(datalist);
      const SElements = datalist.map((data) => <SearchElement data={data.info} key={data.info.id}/>);
      ReactDOM.render(SElements, document.getElementById("selected-results"));
    };
    
    return (
      <div className={classes.root}>
        <CardContent>
          <Checkbox
            checked={checked}
            onChange={(event) => handleChange(event, data)}
            inputProps={{ "aria-label": "primary checkbox" }}
            key={data.id}
          />
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
        <Divider />
      </div>
    );
  }
import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useTheme } from "@mui/material/styles";
import { useGetGenresQuery } from "../../services/TMDB";
import genreIcons from '../../assets/genres and categories'
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory"
const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];



const blueLogo =
  "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
const redLogo =
  "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";

const Sidebar = ({ setMobileOpen }) => {
  const classes = useStyles();
  const theme = useTheme();
  const {data,isFetching} = useGetGenresQuery();
  const dispatch =useDispatch();
  console.log(data);
  return (
    <div>
      <>
        <Link to='/' className={classes.imageLink}>
          <img
            className={classes.image}
            src={theme.palette.mode === "Light" ? redLogo : blueLogo}
            alt='Filmpire logo'
          />
        </Link>
        <Divider />
        <List>
          <ListSubheader>Categories</ListSubheader>
          {categories.map(({ label, value }) => (
            <Link key={value} className={classes.links} to='/'>
            <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
              <ListItemIcon>
              <img
                  src={genreIcons[label.toLowerCase()]}
                  className={classes.genereImages}
                  height={30}
                  alt='Category type'
                />
              </ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          <ListSubheader>Genres</ListSubheader>
          {isFetching ? (
            <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
          ) : data.genres.map(({ name, id }) => (
            <Link key={name} className={classes.links} to='/'>
              <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
                <ListItemIcon>
                <img
                  src={genreIcons[name.toLowerCase()]}
                  className={classes.genereImages}
                  height={30}
                  alt='Category type'
                />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </>
    </div>
  );
};

export default Sidebar;
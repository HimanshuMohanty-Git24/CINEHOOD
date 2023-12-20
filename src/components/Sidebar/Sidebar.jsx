import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  Box,
  CicularProgress,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useTheme } from "@mui/material/styles";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];
const demoCategories = [
  { label: "Comedy", value: "comedy" },
  { label: "Action", value: "action" },
  { label: "Horror", value: "horror" },
  { label: "Animation", value: "animation" },
];

const blueLogo =
  "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
const redLogo =
  "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";

const Sidebar = ({ setMobileOpen }) => {
  const classes = useStyles();
  const theme = useTheme();
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
              {/* <ListItem onClick={() => {}} button>
                <img
                  src={redLogo}
                  className={classes.genereImages}
                  height={30}
                  alt='Category type'
                />
              </ListItem> */}
              <ListItemText primary={label} />
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          <ListSubheader>Genres</ListSubheader>
          {demoCategories.map(({ label, value }) => (
            <Link key={value} className={classes.links} to='/'>
              {/* <ListItem onClick={() => {}} button>
                <img
                  src={redLogo}
                  className={classes.genereImages}
                  height={30}
                  alt='Category type'
                />
              </ListItem> */}
              <ListItemText primary={label} />
            </Link>
          ))}
        </List>
      </>
    </div>
  );
};

export default Sidebar;

import React, { useState, useEffect } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
  ViewSidebar,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useTheme } from "@mui/material/styles";
import { Search, Sidebar } from "..";
import { useDispatch, useSelector } from 'react-redux';
import { fetchToken, createSessionId, moviesApi } from '../../utils';
import { setUser, userSelector } from '../../features/authUser';

const NavBar = () => {
  const [mobileOpen, setmobileOpen] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const token = localStorage.getItem("request_token");
  const dispatch = useDispatch();

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        try {
          const sessionId = localStorage.getItem("session_id")
            ? localStorage.getItem("session_id")
            : await createSessionId();

          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        } catch (error) {
          console.log("Your user data could not be fetched.");
        }
      }
    };
    logInUser();
  }, [token]);

  const { isAuthenticated, user } = useSelector(userSelector);

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color='inherit'
              edge='start'
              style={{ outline: "none" }}
              onClick={() => setmobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color='inherit' sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette && theme.palette.mode === "dark" ? (
              <Brightness7 />
            ) : (
              <Brightness4 />
            )}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color='inherit' onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color='inherit'
                component={Link}
                to={`/profile/:id`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp; </>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt='Profile'
                  src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant='temporary'
              anchor='right'
              open={mobileOpen}
              onClose={() => setmobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setmobileOpen={setmobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant='permanent'
              open
            >
              <Sidebar setMobileOpen={setmobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;

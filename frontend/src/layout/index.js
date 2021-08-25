import React, { useState, useContext }  from 'react';
import clsx from "clsx";

import PropTypes from 'prop-types';

import {
  AppBar,
  CssBaseline,
  Drawer,
  Divider,
  Hidden,
  IconButton,
  InboxIcon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MailIcon,
	MenuItem,
	Menu,
} from "@material-ui/core";

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';


import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AccountCircle from "@material-ui/icons/AccountCircle";

import MainListItems from "./MainListItems";
import NotificationsPopOver from "../components/NotificationsPopOver";
import UserModal from "../components/UserModal";
import { AuthContext } from "../context/Auth/AuthContext";
import BackdropLoading from "../components/BackdropLoading";
import { i18n } from "../translate/i18n";
import { useLocalStorage } from "../hooks/useLocalStorage";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: "100vh",
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  title: {
		flexGrow: 1,
	},
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  appBarSpacer: {
		minHeight: "48px",
	},
  content: {
		flex: 1,
		overflow: "auto",
	},
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  
  menuButtonHidden: {
		display: "none",
	},
  container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  
  	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		minHeight: "48px",
	},
  content: {
    flexGrow: 1,
    padding: theme.spacing(),
  },
  paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
}));

function ResponsiveDrawer({ children }) {
  const { window } = { children };
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
	const [menuOpen, setMenuOpen] = useState(false);
	const { handleLogout, loading } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useLocalStorage("drawerOpen", false);
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleMenu = event => {
		setAnchorEl(event.currentTarget);
		setMenuOpen(true);
	};
  const handleCloseMenu = () => {
		setAnchorEl(null);
		setMenuOpen(false);
	};

	const handleOpenUserModal = () => {
		setUserModalOpen(true);
		handleCloseMenu();
	};

	const handleClickLogout = () => {
		handleCloseMenu();
		handleLogout();
	};

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (loading) {
		return <BackdropLoading />;
	}

  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <List>
	  <MainListItems />
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <UserModal
				open={userModalOpen}
				onClose={() => setUserModalOpen(false)}
				userId={user?.id}
			/>
      
      <AppBar position="fixed" className={classes.appBar} 
      color={process.env.NODE_ENV === "development" ? "inherit" : "primary"}>
        <Toolbar variant="dense" className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
          
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
		  <Typography
						component="h1"
						variant="h6"
						color="inherit"
						noWrap
						className={classes.title}
						
					>
						WhatsMulti - FaleTotal
					</Typography>
					
						{user.id && <NotificationsPopOver />}
            <div>
            <IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>

            <Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							getContentAnchorEl={null}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={menuOpen}
							onClose={handleCloseMenu}
						>
							<MenuItem onClick={handleOpenUserModal}>
								{i18n.t("mainDrawer.appBar.user.profile")}
							</MenuItem>
							<MenuItem onClick={handleClickLogout}>
								{i18n.t("mainDrawer.appBar.user.logout")}
							</MenuItem>
						</Menu>
            </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
	  <main className={classes.content}>
				<div className={classes.appBarSpacer} />

				{children ? children : null}
			</main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
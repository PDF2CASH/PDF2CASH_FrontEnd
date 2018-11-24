import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
  MenuList,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SendIcon from '@material-ui/icons/Send';
import DescriptionIcon from '@material-ui/icons/Description';
import GroupIcon from '@material-ui/icons/Group';
import CreateIcon from '@material-ui/icons/Create';
import TimelineIcon from '@material-ui/icons/Timeline';
import Authenticate from '../pages/auth';

const drawerWidth = 280;

const style = {
  color: 'white',
}

const styles = theme => ({
  root: {
    fontFamily: 'Roboto',
    flexGrow: 1,
    height: 1000,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#3f51b5',
    fontFamily: 'Roboto',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  loginButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  grow: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    backgroundColor: '#3D3D3D',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#fffff',
    padding: theme.spacing.unit * 3,
  },
});

class MiniDrawer extends React.Component {
  state = {
    isLoggedIn: false,
    open: false,
    auth: true,
    anchorEl: null,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout() {
    Authenticate.logout();
  }

  componentDidMount() {
    this.setState({isLoggedIn: Authenticate.checkLogin()})
  }

  render() {
    const {
      classes,
      theme,
      children,
    } = this.props;
    const {
      auth,
      anchorEl,
      open,
    } = this.state;
    const openAnchorEl = Boolean(anchorEl);
    const { isLoggedIn } = this.state ;

    if (isLoggedIn) {
      return (
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!open}>
              <IconButton className={classes.menuButton} onClick={this.handleDrawerOpen} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h4" color="inherit" className={classes.grow}>
                PDF2CA$H
                    </Typography>
              {auth && (
                <div>
                  <IconButton
                    aria-owns={openAnchorEl ? 'menu-appbar' : null}
                    position="absolute"
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={openAnchorEl}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Minha conta</MenuItem>
                    <MenuItem onClick={this.logout}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper,
                !open && classes.drawerPaperClose),
            }}
            open={open}
          >
            <div className={classes.toolbar}>
              <IconButton style={style} onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <List>
              <div>
                <MenuList>
                  <MenuItem
                    button
                    component="a"
                    href="/worker"
                    className={classes.menuItem}
                  >
                    <ListItemIcon className={classes.icon}>
                      <GroupIcon style={style} />
                    </ListItemIcon>
                    <ListItemText style={style} disableTypography inset primary="Listar Funcionarios" />
                  </MenuItem>
                  <MenuItem
                    button
                    component="a"
                    href="/worker/create"
                    className={classes.menuItem}
                  >
                    <ListItemIcon className={classes.icon}>
                      <CreateIcon style={style} />
                    </ListItemIcon>
                    <ListItemText style={style} disableTypography inset primary="Criar Funcionarios" />
                  </MenuItem>
                </MenuList>
              </div>
            </List>
            <Divider />
            <List>
              <div>
                <MenuList>
                  <MenuItem
                    button
                    component="a"
                    href="/invoice"
                    className={classes.menuItem}
                  >
                    <ListItemIcon className={classes.icon}>
                      <DescriptionIcon style={style} />
                    </ListItemIcon>
                    <ListItemText style={style} disableTypography inset primary="Listar Notas Fiscais" />
                  </MenuItem>
                  <MenuItem
                    button
                    component="a"
                    href="/invoice/create"
                    className={classes.menuItem}
                  >
                    <ListItemIcon className={classes.icon}>
                      <SendIcon style={style} />
                    </ListItemIcon>
                    <ListItemText style={style} disableTypography inset primary="Criar Nota Fiscal" />
                  </MenuItem>
                </MenuList>
              </div>
            </List>
            <Divider />
            <List>
              <div>
                <MenuList>
                  <MenuItem button component="a" href="/graph/graphs" className={classes.menuItem}>
                    <ListItemIcon className={classes.icon}>
                      <TimelineIcon style={style} />
                    </ListItemIcon>
                    <ListItemText style={style} disableTypography inset primary="Visualizar Analise" />
                  </MenuItem>
                </MenuList>
              </div>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          {children}
        </div>
      )
    }


  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);

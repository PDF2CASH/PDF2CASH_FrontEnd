import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import DescriptionIcon from '@material-ui/icons/Description';
import GroupIcon from '@material-ui/icons/Group';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TimelineIcon from '@material-ui/icons/Timeline';
import Link from 'next/link';
import Authenticate from '../pages/auth';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#3f51b5',
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
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    backgroundColor: '#3D3D3D',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: '#3D3D3D',
    whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
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
    padding: theme.spacing.unit * 3,
  },
  menuItem: {
    '&:focus': {
      backgroundColor: '#F50057',
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
    auth: true,
    anchorEl: null,
  };

  componentDidMount(){
    if(document.URL.split('/')[document.URL.split('/').length - 1] !== "login"){
      if(document.URL.split('/')[document.URL.split('/').length - 1] !== "admin"){
        Authenticate.loginValidationdation()
      }
    }
  }

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

  logout = () => {
    Authenticate.logout();
  }

  render() {
    const { classes, theme } = this.props;
    const { auth, anchorEl } = this.state;
    const openAnchorEl = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Grid>
            <Link href='/'>
              <Typography variant="h4" color="inherit" noWrap>
                PDFCA$H
              </Typography>
            </Link>
            </Grid>
            {auth && (
              <Grid style={ this.state.open ? { marginLeft: '80%' } : { marginLeft: '75%' } }>
                  <IconButton
                    aria-owns={ openAnchorEl ? 'menu-appbar' : null }
                    position="absolute"
                    aria-haspopup="true"
                    onClick={ this.handleMenu }
                    color="inherit"
                  >
                      <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={ anchorEl }
                    anchorOrigin={ {
                      vertical: 'top',
                      horizontal: 'right',
                    } }
                    transformOrigin={ {
                      vertical: 'top',
                      horizontal: 'right',
                    } }
                    open={ openAnchorEl }
                    onClose={ this.handleClose }
                  >
                      <MenuItem onClick={ this.handleClose }>Minha conta</MenuItem>
                      <MenuItem onClick={ this.logout }>Logout</MenuItem>
                  </Menu>
              </Grid>
              )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: 'white' }} /> : <ChevronLeftIcon style={{ color: 'white' }} />}
            </IconButton>
          </div>
          <Divider />
          <List>
              <Link href="/worker" passHref>
              <ListItem button component="a" key='funcionarios' className={classes.menuItem}>
                  <ListItemIcon>
                    <GroupIcon style={{ color: 'white' }}/>
                  </ListItemIcon>
                  <ListItemText style={{ color: 'white' }} variant="h4" disableTypography inset primary='Funcionários' />
                </ListItem>
              </Link>
          </List>
          <Divider />
          <List>
            <Link>
              <ListItem button component="a" href="/invoice" key='notas fiscais' className={classes.menuItem}>
                <ListItemIcon>
                  <DescriptionIcon style={{ color: 'white' }}/>
                </ListItemIcon>
                <ListItemText style={{ color: 'white' }} variant="h4" disableTypography inset primary='Notas Fiscais' />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <Link href="/graph/graphs" passHref>
              <ListItem button component="a" key={'graficos'} className={classes.menuItem}>
                  <ListItemIcon>
                    <TimelineIcon style={{ color: 'white' }}/>
                  </ListItemIcon>
                  <ListItemText style={{ color: 'white' }} variant="h4" disableTypography inset primary='Gráficos' />
                </ListItem>
              </Link>
          <Divider />
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
            { this.props.children }
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);

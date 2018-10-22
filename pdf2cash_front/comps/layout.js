import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import DescriptionIcon from '@material-ui/icons/Description';
import GroupIcon from '@material-ui/icons/Group';
import CreateIcon from '@material-ui/icons/Create';
import TimelineIcon from '@material-ui/icons/Timeline';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';



const drawerWidth = 280;

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
  menuItem: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& $primary, & $icon': {
          color: theme.palette.common.white,
        },
      },
    },
    primary: {},
    icon: {},
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
  hide: {
    display: 'none',
  },
  drawerPaper: {
    backgroundColor: '#ffff',
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
    open: true,
    auth: true,
   anchorEl: null,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, theme } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" color="inherit" noWrap>
                PDF2CA$H
            </Typography>
            {auth && (
           <div>
               <IconButton
                 aria-owns={open ? 'menu-appbar' : null}
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
                 open={open}
                 onClose={this.handleClose}
               >
                 <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                 <MenuItem onClick={this.handleClose}>My account</MenuItem>
               </Menu>
             </div>
           )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <List><div>
          <MenuList>
            <MenuItem button component="a" href="/worker" className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Listar Funcionarios" />
            </MenuItem>
            <MenuItem button component="a" href="/invoice" className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Listar Notas Fiscais" />
            </MenuItem>
            <MenuItem button component="a" href="/invoice/create" className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <SendIcon />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Criar Nota Fiscal" />
            </MenuItem>
            <MenuItem button component="a" href="/" className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Criar Funcionarios" />
            </MenuItem>
          </MenuList>
          </div></List>
          <Divider />
          <List><div>
    <MenuList>
      <MenuItem button component="a" href="/" className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <TimelineIcon />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Visualizar Analises" />
      </MenuItem>
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Lixo" />
      </MenuItem>
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <ReportIcon />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Spam" />
      </MenuItem>
    </MenuList>
          </div></List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
           {this.props.children}
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

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
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import DescriptionIcon from '@material-ui/icons/Description';
import GroupIcon from '@material-ui/icons/Group';
import CreateIcon from '@material-ui/icons/Create';
import TimelineIcon from '@material-ui/icons/Timeline';

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
    transition: theme.transitions.create([ 'width', 'margin' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${ drawerWidth }px)`,
    transition: theme.transitions.create([ 'width', 'margin' ], {
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
    [ theme.breakpoints.up('sm') ]: {
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
    open: false,
    auth: true,
    anchorEl: null,
    selectedIndex: 0,
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

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

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
      selectedIndex,
    } = this.state;
    const openAnchorEl = Boolean(anchorEl);

    return (
        <div className={ classes.root }>
            <AppBar
              position="absolute"
              className={ classNames(classes.appBar, open && classes.appBarShift) }
            >
                <Toolbar disableGutters={ !open }>
                    <IconButton className={ classes.menuButton } onClick={ this.handleDrawerOpen } color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" color="inherit" className={ classes.grow }>
                PDF2CA$H
                    </Typography>
                    {auth && (
                    <div>
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
                            <MenuItem onClick={ this.handleClose }>Logout</MenuItem>
                        </Menu>
                    </div>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              classes={ {
                paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
              } }
              open={ open }
            >
                <div className={ classes.toolbar }>
                    <IconButton style={ style } onClick={ this.handleDrawerClose }>
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
                              className={ classes.menuItem }
                              selected={ selectedIndex === 1 }
                              onClick={ event => this.handleListItemClick(event, 1) }
                            >
                                <ListItemIcon className={ classes.icon }>
                                    <GroupIcon style={ style } />
                                </ListItemIcon>
                                <ListItemText style={ style } disableTypography inset primary="Listar Funcionarios" />
                            </MenuItem>
                            <MenuItem
                              button
                              component="a"
                              href="/invoice"
                              className={ classes.menuItem }
                              selected={ selectedIndex === 2 }
                              onClick={ event => this.handleListItemClick(event, 2) }
                            >
                                <ListItemIcon className={ classes.icon }>
                                    <DescriptionIcon style={ style } />
                                </ListItemIcon>
                                <ListItemText style={ style } disableTypography inset primary="Listar Notas Fiscais" />
                            </MenuItem>
                            <MenuItem
                              button
                              component="a"
                              href="/invoice/create"
                              className={ classes.menuItem }
                              selected={ selectedIndex === 3 }
                              onClick={ event => this.handleListItemClick(event, 3) }
                            >
                                <ListItemIcon className={ classes.icon }>
                                    <SendIcon style={ style } />
                                </ListItemIcon>
                                <ListItemText style={ style } disableTypography inset primary="Criar Nota Fiscal" />
                            </MenuItem>
                            <MenuItem
                              button
                              component="a"
                              href="/worker/create"
                              className={ classes.menuItem }
                              selected={ selectedIndex === 4 }
                              onClick={ event => this.handleListItemClick(event, 4) }
                            >
                                <ListItemIcon className={ classes.icon }>
                                    <CreateIcon style={ style } />
                                </ListItemIcon>
                                <ListItemText style={ style } disableTypography inset primary="Criar Funcionarios" />
                            </MenuItem>
                        </MenuList>
                    </div>
                </List>
                <Divider />
                <List>
                    <div>
                        <MenuList>
                            <MenuItem button component="a" href="/" className={ classes.menuItem }>
                                <ListItemIcon className={ classes.icon }>
                                    <TimelineIcon style={ style } />
                                </ListItemIcon>
                                <ListItemText style={ style } disableTypography inset primary="Visualizar Analise" />
                            </MenuItem>
                            <MenuItem className={ classes.menuItem }>
                                <ListItemIcon className={ classes.icon }>
                                    <DeleteIcon style={ style } />
                                </ListItemIcon>
                                <ListItemText style={ style } disableTypography inset primary="Lixo" />
                            </MenuItem>
                            <MenuItem
                              className={ classes.menuItem }
                              selected={ selectedIndex === 5 }
                              onClick={ event => this.handleListItemClick(event, 5) }
                            >
                                <ListItemIcon className={ classes.icon }>
                                    <ReportIcon style={ style } />
                                </ListItemIcon>
                                <ListItemText style={ style } disableTypography inset primary="Spam" />
                            </MenuItem>
                        </MenuList>
                    </div>
                </List>
            </Drawer>
            <main className={ classes.content }>
                <div className={ classes.toolbar } />
                { children }
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

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/SnackbarContent';
import Authenticate from './auth';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    maxWidth: '30%',
    maxWeight: '100%',
    marginLeft: '32%',
    marginTop: '10%',
  },
  button: {
    align: 'center',
    marginTop: '10%',
  },
  margin: {
    padding: theme.spacing.unit / 2,
    backgroundColor: theme.palette.error.dark,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      msg: '',
    };
    this.validateLogin = this.validateLogin.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    if (Authenticate.checkLogin()) {
      window.location.href = 'http://localhost:3000/index';
    }
  }

  handleChangeUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  validateLogin(event) {
    const { username, password } = this.state;
    event.preventDefault();
    const urlWorker = 'http://localhost:8008/api/authenticate/';
    fetch(urlWorker, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'omit',
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Não foi possivel fazer o login!')
      })

      .then((data) => {
        Authenticate.makeLogin(data.token);
        window.location.href = 'http://localhost:3000/index';
      })

      .catch((error) => {
        this.setState({ msg: error.message })
      });
  }

  render() {
    const {
      classes,
      validateLogin,
      handleChangeUsername,
      handleChangePassword,

    } = this.props;
    const {
      msg,
      username,
      password,
    } = this.state

    return (
        <div>
            <Paper className={ classes.root } elevation={ 1 }>
                <Typography variant="h5" component="h3">
                        Login
                </Typography>

                {
                msg ? (
                    <Snackbar
                      variant="error"
                      message={ msg }
                      className={ classes.margin }
                    />
                ) : (
                    <div />
                )
            }

                <form onSubmit={ validateLogin } method="post">
                    <TextField
                      type="text"
                      id="username"
                      label="Username"
                      value={ username }
                      onChange={ handleChangeUsername }
                    />
                    <TextField
                      type="passsword-input"
                      id="password"
                      label="Password"
                      value={ password }
                      onChange={ handleChangePassword }
                    />
                    <Button
                      className={ classes.button }
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                            Entrar
                    </Button>
                </form>
            </Paper>
        </div>
    );
  }
}

export default withStyles(styles)(Login);

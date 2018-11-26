import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Authenticate from './auth';
import Snackbar from '@material-ui/core/SnackbarContent';
import Grid from '@material-ui/core/Grid';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        textAlign: 'center',
        maxWidth: '30%',
        maxWeight: '100%',
        marginLeft: '35%',
        marginTop: '10%',
        minWidth: '30%'
    },
    button: {
        align: 'center',
        marginTop: '10%'
    },
    margin: {
        padding: theme.spacing.unit / 2,
        backgroundColor: theme.palette.error.dark,
    }
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workers: [],
            alert: false,
            username: "",
            password: "",
            msg: "",
        };
        this.validateLogin = this.validateLogin.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        if (Authenticate.checkLogin()) {
            window.location.href = "http://localhost:3000/index";
        }
    }

    validateLogin(event) {
        console.log(JSON.stringify({
            username: this.state.username,
            password: this.state.password
        }))
        event.preventDefault();
        const url_worker = publicRuntimeConfig.workerHostDomain+'/api/authenticate/';
        fetch(url_worker, {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'omit'
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Não foi possivel fazer o login!')
                }
            })

            .then(function (data) {
                Authenticate.makeLogin(data.token);
                window.location.href = "http://localhost:3000/index";
            }.bind(this))

            .catch(error => {
                this.setState({ msg: error.message })
            });
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

    handleClose = () => {
        this.setState({ alert: false });
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container spacing={24} justify="center" alignItems="lex-start">
                <Grid item xs={10}>
                    <div>
                        <Paper className={classes.root} elevation={1} classes= {{
                            root: classes.root.minWidth
                        }} >
                            <Typography variant='h5' component='h3'>
                                Login
                    </Typography>

                            {
                                this.state.msg ? (
                                    <Snackbar
                                        variant='error'
                                        message={this.state.msg}
                                        className={classes.margin}
                                    />
                                ) : (
                                        <div />
                                    )
                            }

                            <form onSubmit={this.validateLogin} method='post'>
                                <TextField
                                    type='text'
                                    id='username'
                                    label='Username'
                                    value={this.state.username}
                                    onChange={this.handleChangeUsername}
                                />
                                <TextField
                                    type='password'
                                    id='password'
                                    label='Password'
                                    value={this.state.password}
                                    onChange={this.handleChangePassword}
                                />
                                <Button
                                    className={classes.button}
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                >
                                    Entrar
                        </Button>
                            </form>
                        </Paper>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Login);

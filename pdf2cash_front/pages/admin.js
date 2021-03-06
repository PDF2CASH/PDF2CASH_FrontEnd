import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Authenticate from './auth.js';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        textAlign: 'center',
        'max-width': '40%',
        'max-weight': '100%',
        'min-width:' : '40%',
        marginLeft: '32%',
        marginTop: '10%',
    },
    grid: {
        margin: '5%',
    },
    button: {
        marginTop: '10%'
    }
});

class AdminCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cpf: "",
            email: "",
            password: "",
            adminExists: false,
        };

        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangeCPF = this.handleChangeCPF.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        document.title = "Cadastrar funcionário";
    }

    handleChangeUserName(event) {

        this.setState({
            username: event.target.value,
        });
    }

    handleChangeCPF(event) {
        this.setState({
            cpf: event.target.value,
        });
    }

    handleChangeEmail(event) {
        this.setState({
            email: event.target.value,
        });
    }

    handleChangePassword(event) {
        this.setState({
            password: event.target.value,
        });
    }
    validateAdmin() {
        const length = this.state.workers.length;
        const workers = this.state.workers;
        for (var i = 0; i < length; i++) {
            if (workers[i].permission === '2') {
                this.setState({ adminExists: true });
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const url_worker = publicRuntimeConfig.workerHostDomain + '/api/worker/worker/';
        fetch(url_worker, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                cpf: this.state.cpf,
                email: this.state.email,
                password: this.state.password,
                permission: '2',
            })
        })
            .then((response) => {
                if (response.ok) {
                    window.location.href = publicRuntimeConfig.frontHostDomain+"/login";
                }
                else
                    return response.json()
            })
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container spacing={24} justify="center" alignItems="lex-start">
                <Grid item xs={12}>
                    <Paper className={classes.root} elevation={5} classes={{
                        root: classes.root['min-height']
                    }}>
                        <ValidatorForm
                            ref="form"
                            onSubmit={this.handleSubmit}
                            onError={errors => console.log(errors)}
                        >
                            <Typography variant="h4" color="inherit" className={classes.grow}>
                                Cadastrar
            </Typography>
                            {
                                this.state.adminExists ? (
                                    <SnackbarContent key={'error'} className={classes.snackbar} message={'Administrador ja existe!'} />
                                ) : (
                                        <div />
                                    )
                            }
                            <div className="form_worker">
                                <TextValidator
                                    label="username"
                                    onChange={this.handleChangeUserName}
                                    name="name"
                                    maxWeight="40%"
                                    value={this.state.username}
                                    validators={['required', 'minStringLength:9']}
                                    errorMessages={['Este campo é obrigatório', 'Digite um nome válido']}
                                /><br />
                                <TextValidator
                                    label="CPF"
                                    onChange={this.handleChangeCPF}
                                    name="cpf"
                                    maxWeight="40%"
                                    inputProps={{ maxLength: 11 }}
                                    value={this.state.cpf}
                                    validators={['required', 'matchRegexp:^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$']}
                                    errorMessages={['Este campo é obrigatório', 'Digite um CPF válido']}
                                /><br />
                                <TextValidator
                                    label="E-mail"
                                    onChange={this.handleChangeEmail}
                                    name="email"
                                    maxWidth="40%"
                                    value={this.state.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['Este campo é obrigatório', 'Este e-mail não é válido']}
                                /><br />
                                <TextValidator
                                    label="Senha"
                                    onChange={this.handleChangePassword}
                                    name="password"
                                    type='password'
                                    maxWidth="40%"
                                    value={this.state.password}
                                    validators={['required', 'minStringLength:6', 'maxStringLength:30']}
                                    errorMessages={['Este campo é obrigatório', 'Minimo de 6 dígitos', 'Digite uma senha menor que 30 dígitos']}
                                /><br />
                            </div>
                            <Button className={classes.button} type="submit" variant="contained" color="primary" >
                                CADASTRAR
                </Button>
                        </ValidatorForm>
                    </Paper>
                </Grid>
            </Grid>

        );
    }
}

export default withStyles(styles)(AdminCreate);



import React, { Component } from 'react';
import { Button,  Paper, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit,
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    'max-width': '30%',
    'max-weight': '100%',
    marginLeft: '32%',
    marginTop: '10%',
  },
  grid: {
    margin: '5%',
  },
  button: {
    marginTop: '10%',
  },
});

class WorkerEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            cpf: "",
            email: "",
            password: "",
        };

        this.handleChangeCPF = this.handleChangeCPF.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const id = this.props.router.query.id;
        const url = 'http://localhost:8008/api/worker/worker/' + id + '/';
        const res = await fetch(url);
        const data = await res.json();
        this.setState({
            id: data['id'],
            cpf: data['cpf'],
            email: data['email'],
            password: data['password'],
            data_has_loaded: true,
        });

    }

    handleChangeCPF(event) {
        this.setState({
            cpf: event.target.value,
        });
    }

    handleChangeUserName(event) {
        this.setState({
            username: event.target.value,
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

    snackbarShow() {


    }

    async handleSubmit(event) {
        event.preventDefault();
        const id = this.state.id;
        const url_worker = 'http://0.0.0.0:8008/api/worker/worker/' + id + '/';
        fetch(url_worker, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cpf: this.state.cpf,
                username:this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then((response) => {
                if (response.ok) {
                    window.location.href = "http://localhost:3000/worker";
                }
                else
                    return response.json()

                        .then(json => {
                            var errors = []
                            if (json.name) {
                                for (var i = 0; i < json.name.length; i++) {
                                    errors.push(json.name[i])
                                }
                            }
                            if (json.cpf) {
                                for (var i = 0; i < json.cpf.length; i++) {
                                    errors.push("Este CPF já está cadastrado no sistema.")
                                }
                            }
                            if (json.username) {
                                for (var i = 0; i < json.cpf.length; i++) {
                                    errors.push("Este username já está cadastrado no sistema.")
                                }
                            }
                            if (json.email) {
                                for (var i = 0; i < json.email.length; i++) {
                                    errors.push("Este E-mail já está cadastrado no sistema.")
                                }
                            }
                            if (json.password) {
                                for (var i = 0; i < json.password.length; i++) {
                                    errors.push(json.password[i])
                                }
                            }
                            this.setState({ errors: errors, error_show: true });
                        })
            })
    }

    render() {
        const { classes } = this.props;
        const {
      username, email, cpf, password, errorShow, errors,
      } = this.state;
        return (
          <Paper className={ classes.root } elevation={ 5 }>
            <Grid className={ classes.grid }>
                <ValidatorForm
                  onSubmit={ this.handleSubmit }
                >
                    <Typography variant="h4" color="inherit" className={ classes.grow }>
                      Editar Funcionario
                    </Typography>
                    {
                    errorShow && errors.map(
                      error => (
                          <SnackbarContent
                            key={ error }
                            className={ classes.snackbar }
                            message={ error }
                          />
                      ),
                    )
                }
                    <div className="form_worker">
                        <TextValidator
                          label="Username"
                          onChange={ this.handleChangeUserName }
                          name="username"
                          value={ username }
                          validators={ [ 'required', 'minStringLength:9' ] }
                          errorMessages={ [ 'Este campo é obrigatório', 'Digite um nome válido' ] }
                        />
                        <br />
                        <TextValidator
                          label="CPF"
                          onChange={ this.handleChangeCPF }
                          name="cpf"
                          inputProps={ { maxLength: 11 } }
                          value={ cpf }
                          validators={ [ 'required', 'matchRegexp:^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$' ] }
                          errorMessages={ [ 'Este campo é obrigatório', 'Digite um CPF válido' ] }
                        />
                        <br />
                        <TextValidator
                          label="E-mail"
                          onChange={ this.handleChangeEmail }
                          name="email"
                          value={ email }
                          validators={ [ 'required', 'isEmail' ] }
                          errorMessages={ [ 'Este campo é obrigatório', 'Este e-mail não é válido' ] }
                        />
                        <br />
                        <TextValidator
                          label="Senha"
                          onChange={ this.handleChangePassword }
                          name="password"
                          type="password"
                          value={ password }
                          validators={ [ 'required', 'minStringLength:6', 'maxStringLength:30' ] }
                          errorMessages={ [ 'Este campo é obrigatório', 'Minimo de 6 dígitos', 'Digite uma senha menor que 30 dígitos' ] }
                        />
                        <br />
                    </div>
                    <Button className={ classes.button } type="submit" variant="contained" color="primary">
                    EDITAR
                    </Button>
                </ValidatorForm>
            </Grid>
        </Paper>
        );
    }
}

export default withRouter(withStyles(styles)(WorkerEdit));

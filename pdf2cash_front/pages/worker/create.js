import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



const styles = theme => ({
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
     marginTop: '10%'
   }
});

class WorkerCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            cpf: "",
            email: "",
            password: "",
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeCPF = this.handleChangeCPF.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        document.title = "Cadastrar funcionário";
    }

    handleChangeName(event) {

        this.setState({
            name: event.target.value,
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

    snackbarShow() {


    }

    async handleSubmit(event) {
        event.preventDefault();
        const url_worker = 'http://0.0.0.0:8000/api/worker/worker/';
        fetch(url_worker, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                cpf: this.state.cpf,
                email: this.state.email,
                password: this.state.password,
                permission: '1',
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

        return (
      <div>
        <Paper className={classes.root} elevation={5}>
          <Grid className={classes.grid}>
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
            <Typography variant="h4" color="inherit" className={classes.grow}>
                Cadastrar Funcionario
            </Typography>
                {
                    this.state.error_show && this.state.errors.map(error => {
                        return < SnackbarContent key={error} className={classes.snackbar} message={error} />
                    })
                }
                <div className="form_worker">
                    <TextValidator
                        label="Nome"
                        onChange={this.handleChangeName}
                        name="name"
                        value={this.state.name}
                        validators={['required', 'minStringLength:9']}
                        errorMessages={['Este campo é obrigatório', 'Digite um nome válido']}
                    /><br />
                    <TextValidator
                        label="CPF"
                        onChange={this.handleChangeCPF}
                        name="cpf"
                        inputProps={{ maxLength: 11 }}
                        value={this.state.cpf}
                        validators={['required', 'matchRegexp:^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$']}
                        errorMessages={['Este campo é obrigatório', 'Digite um CPF válido']}
                    /><br />
                    <TextValidator
                        label="E-mail"
                        onChange={this.handleChangeEmail}
                        name="email"
                        value={this.state.email}
                        validators={['required', 'isEmail']}
                        errorMessages={['Este campo é obrigatório', 'Este e-mail não é válido']}
                    /><br />
                    <TextValidator
                        label="Senha"
                        onChange={this.handleChangePassword}
                        name="password"
                        type='password'
                        value={this.state.password}
                        validators={['required', 'minStringLength:6', 'maxStringLength:30']}
                        errorMessages={['Este campo é obrigatório', 'Minimo de 6 dígitos', 'Digite uma senha menor que 30 dígitos']}
                    /><br />
                </div>
                <Button className={classes.button} type="submit" variant="contained" color="primary" >
                    CADASTRAR
                </Button>
            </ValidatorForm>
          </Grid>
        </Paper>
      </div>
        );
    }
}

export default withStyles(styles)(WorkerCreate);

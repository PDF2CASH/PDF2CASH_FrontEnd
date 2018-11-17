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
    marginTop: '10%',
  },
});

class AdminCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      cpf: '',
      email: '',
      password: '',
      adminExists: false,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeCPF = this.handleChangeCPF.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    document.title = 'Cadastrar funcionário';
    const url = 'http://localhost:8008/api/worker/worker/';
    const res = await fetch(url);
    const data = await res.json();
    this.setState({
      workers: data,
    });
    this.validateAdmin;
  }

  handleChangeName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleChangeUsername(event) {
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
    const {
      workers,
    } = this.state;
    for (let i = 0; i < workers.length; i += 1) {
      if (workers[ i ].permission === '2') {
        this.setState({ adminExists: true });
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      name,
      username,
      cpf,
      email,
      password,
    } = this.state;

    const urlWorker = 'http://localhost:8008/api/worker/worker/';
    fetch(urlWorker, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        username,
        cpf,
        email,
        password,
        permission: '2',
      }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = 'http://localhost:3000/worker';
        }
      })
  }

  render() {
    const {
      classes,
      handleChangeName,
      handleChangeUsername,
      handleChangeCPF,
      handleChangeEmail,
      handleChangePassword,
    } = this.props;
    const {
      adminExists,
      name,
      username,
      cpf,
      email,
      password,
    } = this.state;

    return (
        <div>
            <Paper className={ classes.root } elevation={ 5 }>
                <Grid className={ classes.grid }>
                    <ValidatorForm
                      onSubmit={ this.handleSubmit }
                    >
                        <Typography variant="h4" color="inherit" className={ classes.grow }>
                Cadastrar
                        </Typography>
                        {
                  adminExists ? (
                      <SnackbarContent key="error" className={ classes.snackbar } message="Administrador ja existe!" />
                  ) : (
                      <div />
                  )
                }
                        <div className="form_worker">
                            <TextValidator
                              label="Nome"
                              onChange={ handleChangeName }
                              name="name"
                              maxWeight="40%"
                              value={ name }
                              validators={ [ 'required', 'minStringLength:9' ] }
                              errorMessages={ [ 'Este campo é obrigatório', 'Digite um nome válido' ] }
                            />
                            <br />
                            <TextValidator
                              label="Username"
                              onChange={ handleChangeUsername }
                              name="username"
                              value={ username }
                              validators={ [ 'required', 'minStringLength:9' ] }
                              errorMessages={ [ 'Este campo é obrigatório', 'Digite um username válido' ] }
                            />
                            <br />
                            <TextValidator
                              label="CPF"
                              onChange={ handleChangeCPF }
                              name="cpf"
                              maxWeight="40%"
                              inputProps={ { maxLength: 11 } }
                              value={ cpf }
                              validators={ [ 'required', 'matchRegexp:^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$' ] }
                              errorMessages={ [ 'Este campo é obrigatório', 'Digite um CPF válido' ] }
                            />
                            <br />
                            <TextValidator
                              label="E-mail"
                              onChange={ handleChangeEmail }
                              name="email"
                              maxWidth="40%"
                              value={ email }
                              validators={ [ 'required', 'isEmail' ] }
                              errorMessages={ [ 'Este campo é obrigatório', 'Este e-mail não é válido' ] }
                            />
                            <br />
                            <TextValidator
                              label="Senha"
                              onChange={ handleChangePassword }
                              name="password"
                              type="password"
                              maxWeight="40%"
                              value={ password }
                              validators={ [ 'required', 'minStringLength:6', 'maxStringLength:30' ] }
                              errorMessages={ [ 'Este campo é obrigatório', 'Minimo de 6 dígitos', 'Digite uma senha menor que 30 dígitos' ] }
                            />
                            <br />
                        </div>
                        <Button className={ classes.button } type="submit" variant="contained" color="primary">
                    CADASTRAR
                        </Button>
                    </ValidatorForm>
                </Grid>
            </Paper>
        </div>
    );
  }
}

export default withStyles(styles)(AdminCreate);

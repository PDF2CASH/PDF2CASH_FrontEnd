import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit,
  },
});

class WorkerCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      cpf: '',
      email: '',
      password: '',
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeCPF = this.handleChangeCPF.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    document.title = 'Cadastrar funcionário';
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
    const url_worker = 'http://0.0.0.0:8008/api/worker/worker/';
    fetch(url_worker, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        cpf: this.state.cpf,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = 'http://localhost:3000/worker';
        } else {
          return response.json()

            .then((json) => {
              const errors = []
              if (json.name) {
                for (var i = 0; i < json.name.length; i++) {
                  errors.push(json.name[ i ])
                }
              }
              if (json.cpf) {
                for (var i = 0; i < json.cpf.length; i++) {
                  errors.push('Este CPF já está cadastrado no sistema.')
                }
              }
              if (json.email) {
                for (var i = 0; i < json.email.length; i++) {
                  errors.push('Este E-mail já está cadastrado no sistema.')
                }
              }
              if (json.password) {
                for (var i = 0; i < json.password.length; i++) {
                  errors.push(json.password[ i ])
                }
              }
              this.setState({ errors, error_show: true });
            })
        }
      })
  }

  render() {
    const { classes } = this.props;

    return (
        <ValidatorForm
          ref="form"
          onSubmit={ this.handleSubmit }
          onError={ errors => console.log(errors) }
        >
            <h2>CADASTRAR FUNCIONÁRIO</h2>
            {
                    this.state.error_show && this.state.errors.map(error => <SnackbarContent key={ error } className={ classes.snackbar } message={ error } />)
                }
            <div className="form_worker">
                <TextValidator
                  label="Nome"
                  onChange={ this.handleChangeName }
                  name="name"
                  value={ this.state.name }
                  validators={ [ 'required', 'minStringLength:9' ] }
                  errorMessages={ [ 'Este campo é obrigatório', 'Digite um nome válido' ] }
                />
                <br />
                <TextValidator
                  label="CPF"
                  onChange={ this.handleChangeCPF }
                  name="cpf"
                  inputProps={ { maxLength: 11 } }
                  value={ this.state.cpf }
                  validators={ [ 'required', 'matchRegexp:^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$' ] }
                  errorMessages={ [ 'Este campo é obrigatório', 'Digite um CPF válido' ] }
                />
                <br />
                <TextValidator
                  label="E-mail"
                  onChange={ this.handleChangeEmail }
                  name="email"
                  value={ this.state.email }
                  validators={ [ 'required', 'isEmail' ] }
                  errorMessages={ [ 'Este campo é obrigatório', 'Este e-mail não é válido' ] }
                />
                <br />
                <TextValidator
                  label="Senha"
                  onChange={ this.handleChangePassword }
                  name="password"
                  type="password"
                  value={ this.state.password }
                  validators={ [ 'required', 'minStringLength:6', 'maxStringLength:30' ] }
                  errorMessages={ [ 'Este campo é obrigatório', 'Digite uma senha maior que 6 dígitos', 'Digite uma senha menor que 30 dígitos' ] }
                />
                <br />
            </div>
            <Button type="submit" variant="contained" color="primary">
                    CADASTRAR
            </Button>
        </ValidatorForm>
    );
  }
}

export default withStyles(styles)(WorkerCreate);

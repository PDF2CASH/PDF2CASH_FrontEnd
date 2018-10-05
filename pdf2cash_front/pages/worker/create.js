import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ValidatorComponent } from 'react-form-validator-core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


const styles = theme => ({
    cell: {
        textAlign: 'center'
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

    async handleSubmit(event) {
      event.preventDefault();

    }

    render() {
        return (
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
              <h2>CADASTRAR FUNCIONÁRIO</h2>
              <div className="form_worker">
                  <TextValidator
                      label="Nome"
                      onChange={this.handleChangeName}
                      name="name"
                      value={this.state.name}
                      validators={['required', 'minStringLength:2']}
                      errorMessages={['Este campo é obrigatório', 'Digite um nome válido']}
                  /><br/>
                  <TextValidator
                      label="CPF"
                      onChange={this.handleChangeCPF}
                      name="cpf"
                      inputProps={{ maxLength: 11 }}
                      value={this.state.cpf}
                      validators={['required', 'matchRegexp:^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$']}
                      errorMessages={['Este campo é obrigatório', 'Digite um CPF válido']}
                  /><br/>
                  <TextValidator
                      label="E-mail"
                      onChange={this.handleChangeEmail}
                      name="email"
                      value={this.state.email}
                      validators={['required', 'isEmail']}
                      errorMessages={['Este campo é obrigatório', 'Este e-mail não é válido']}
                  /><br/>
                  <TextValidator
                      label="Senha"
                      onChange={this.handleChangePassword}
                      name="password"
                      type='password'
                      value={this.state.password}
                      validators={['required','minStringLength:6', 'maxStringLength:30']}
                      errorMessages={['Este campo é obrigatório', 'Digite uma senha maior que 6 dígitos', 'Digite uma senha menor que 30 dígitos']}
                  /><br/>
              </div>
              <Button type="submit" variant="contained" color="primary" >
                  CADASTRAR
              </Button>
          </ValidatorForm>
        );
    }
}

export default withStyles(styles)(WorkerCreate);

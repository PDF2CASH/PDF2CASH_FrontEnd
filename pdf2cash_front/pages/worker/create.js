import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

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
        const { classes } = this.props;
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

    handleSubmit(event) {
        const url_worker = 'http://localhost:8000/api/worker/worker/';

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <h2>CADASTRAR FUNCIONÁRIO</h2>
                    <div className="form_worker">
                        Nome: <input type="text" value={this.state.name} onChange={this.handleChangeName} /><br />
                        CPF: <input type="text" value={this.state.cpf} onChange={this.handleChangeCPF} /><br />
                        E-mail: <input type="email" value={this.state.email} onChange={this.handleChangeEmail} /><br />
                        Senha: <input type="password" value={this.state.password} onChange={this.handleChangePassword} /><br />
                    </div>
                </label>
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                    CADASTRAR
                </Button>
            </form>
        );
    }
}

export default withStyles(styles)(WorkerCreate);

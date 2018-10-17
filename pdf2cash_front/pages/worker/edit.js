import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    snackbar: {
        margin: theme.spacing.unit,
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
        const id = this.props.router.query.id;
        const url = 'http://localhost:8000/api/worker/worker/' + id + '/';
        const res = await fetch(url);
        const data = await res.json();
        this.setState({
            id: data['id'],
            cpf: data['cpf'],
            name: data['name'],
            email: data['email'],
            password: data['password'],
            data_has_loaded: true,
        });
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
        const id = this.state.id;
        const url_worker = 'http://0.0.0.0:8000/api/worker/worker/' + id + '/';
        fetch(url_worker, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                cpf: this.state.cpf,
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

}

export default withRouter(withStyles(styles)(WorkerCreate));

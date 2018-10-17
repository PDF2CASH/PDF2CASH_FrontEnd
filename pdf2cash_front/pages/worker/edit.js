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



}

export default withRouter(withStyles(styles)(WorkerCreate));

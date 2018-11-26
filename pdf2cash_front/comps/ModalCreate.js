import React, { Component } from 'react';
import {
  Button, Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  input: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
    display: 'none',
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
  button: {
    marginTop: '10%',
  },
  buttonSend: {
    marginLeft: '85%',
    marginTop: '10%',
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class InvoiceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      open: true,
    }
    this.setFile = this.setFile.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  setFile(event) {
    this.setState({ file: event.target.files[ 0 ] });
  }

  sendForm() {
    const { file } = this.state;
    const url = 'http://localhost:8008/api/invoice/invoice/';
    const data = new FormData();
    data.append('file', file);
    fetch(url, { method: 'POST', body: data });
  }

  openModal() {
    this.setState({
      open: true,
    });
  }

  closeModal() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { open } = this.state;
    const { classes } = this.props;

    return (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={ open }
          onClose={ this.closeModal }
        >
            <Paper className={ classes.root } elevation={ 5 }>
                <Typography variant="h4" color="inherit" className={ classes.grow }>
          Criar Nota Fiscal
                </Typography>
                <br />
                <br />
                <form onSubmit={ this.sendForm }>
                    <input
                      accept=".pdf"
                      className={ classes.input }
                      id="contained-button-file"
                      onChange={ this.setFile }
                      multiple
                      type="file"
                    />
                    <label htmlFor="contained-button-files">
                        <Button variant="contained" component="span" color="primary" className={ classes.button }>
                          Upload
                        </Button>
                    </label>
                    <br />
                    <br />
                    <Button variant="fab" color="secondary" aria-label="Add" className={ classes.buttonSend }>
                        <AddIcon />
                    </Button>
                </form>
            </Paper>
        </Modal>
    )
  }
}

export default withStyles(styles)(InvoiceCreate);

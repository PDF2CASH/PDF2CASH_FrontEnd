import React, { Component } from 'react';
import {
  Button,
  Typography,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Authenticate from './../auth.js';

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
  grid: {
    margin: '5%',
  },
  button: {
    marginTop: '1%',
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
    }
    this.setFile = this.setFile.bind(this);
    this.sendForm = this.sendForm.bind(this);
  }

  setFile(event) {
    this.setState({ file: event.target.files[ 0 ] });
  }

  sendForm() {
    Authenticate.loginValidationdation();
    const { file } = this.state;
    const url = 'http://localhost:8008/api/invoice/invoice/';
    const data = new FormData();
    data.append('file', file);
    fetch(url, { method: 'POST', body: data });
  }

  render() {
    const { classes } = this.props;
    const { file } = this.state;
    
    return (
      <Grid>
          <Typography variant="h4" color="inherit" className={ classes.grow }>
            Criar Nota Fiscal
          </Typography>
          <br />
          <Typography variant="h6" color="inherit" className={ classes.grow }>
          {
            file != null ? 
              file['name']
               : ''
          }
          </Typography>
          <form onSubmit={ this.sendForm }>
              <input
                accept=".pdf"
                className={ classes.input }
                id="contained-button-file"
                onChange={ this.setFile }
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                  <Button variant="contained" component="span" color="primary" className={ classes.button }>
                    Upload
                  </Button>
              </label>
              <Button type='submit' variant="fab" color="secondary" aria-label="Add" className={ classes.buttonSend }>
                  <AddIcon />
              </Button>
          </form>
        </Grid>
    )
  }
}

export default withStyles(styles)(InvoiceCreate);

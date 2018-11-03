import React, { Component } from 'react';
import { Grid, Button, Input, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import AddIcon from '@material-ui/icons/Add';

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
   marginTop: '10%'
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
      open: false
    }
    this.setFile = this.setFile.bind(this);
    this.sendForm = this.sendForm.bind(this);
  }

  setFile(event) {
    this.setState({ file: event.target.files[0] });
  }

  sendForm() {
    const { file } = this.state;
    const url = 'http://localhost:8000/api/invoice/invoice/';
    var data = new FormData();
    data.append('file', file);
    fetch(url, { method: 'POST', body: data });
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.file);

    return (
      <div>
        <Paper className={classes.root} elevation={5}>
        <Typography variant="h4" color="inherit" className={classes.grow}>
          Criar Nota Fiscal
        </Typography>
        <br /><br />
        <form onSubmit={this.sendForm}>
        <input
        accept=".pdf"
        className={classes.input}
        id="contained-button-file"
        onChange={this.setFile}
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" color='primary' className={classes.button}>
          Upload
        </Button>
      </label>
          <br /><br />
          <Button variant="fab" color="secondary" aria-label="Add" className={classes.buttonSend}>
            <AddIcon />
          </Button>
        </form>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(InvoiceCreate);

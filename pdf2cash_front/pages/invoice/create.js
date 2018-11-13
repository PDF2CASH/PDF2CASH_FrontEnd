import React, { Component } from 'react';
import {
  Grid, Button, Input, Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  input: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
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
    const { file } = this.state;
    const url = 'http://localhost:8008/api/invoice/invoice/';
    const data = new FormData();
    data.append('file', file);
    fetch(url, { method: 'POST', body: data });
  }

  render() {
    const { classes } = this.props;

    return (
        <Grid>
            <Typography variant="h2">
          Criar Nota Fiscal
            </Typography>
            <br />
            <br />
            <form onSubmit={ this.sendForm }>
                <Input
                  accept="image/*"
                  id="raised-button-file"
                  className={ classes.input }
                  onChange={ this.setFile }
                  type="file"
                />
                <br />
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
            Criar
                </Button>
            </form>
        </Grid>
    )
  }
}

export default withStyles(styles)(InvoiceCreate);

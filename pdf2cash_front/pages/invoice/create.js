import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  input: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  }
});

class InvoiceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      open: false
    };
    this.setFile = this.setFile.bind(this);
    this.sendForm = this.sendForm.bind(this);
  }

  setFile(event) {
    this.setState({ file: event.target.files[0] });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid>
        <Typography variant='h2'>
          Criar Nota Fiscal
        </Typography>
        <br /><br />
        <form onSubmit={this.sendForm}>
          <Input
            accept='image/*'
            id='raised-button-file'
            className={classes.input}
            onChange={this.setFile}
            type='file'
          />
          <br /><br />
          <Button
            type='submit'
            variant='contained'
            color='primary'
          >
            Criar
          </Button>
        </form>
      </Grid>
    );
  }
}

export default withStyles(styles)(InvoiceCreate);

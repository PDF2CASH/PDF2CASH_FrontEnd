import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

});

class InvoiceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      open: false
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div />
    );
  }
}

export default withStyles(styles)(InvoiceCreate);

import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
});

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = [];
  }

  render() {
    return (
        <head>
            <title>PDF2CASH</title>
        </head>
    );
  }
}

export default withStyles(styles)(Index);

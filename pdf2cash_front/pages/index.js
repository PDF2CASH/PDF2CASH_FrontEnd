import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
const styles = ({
});

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state= [];
    }

    render() {

        return (
            <h1> PDF2CASH </h1>
        );

    }

}

export default withStyles(styles)(Index);

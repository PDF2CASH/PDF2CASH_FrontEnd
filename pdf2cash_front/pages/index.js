import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
});

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state= [];
    }

    render() {

        return (<h1> Hello World </h1>);
    }

}


export default withStyles(styles)(Index);

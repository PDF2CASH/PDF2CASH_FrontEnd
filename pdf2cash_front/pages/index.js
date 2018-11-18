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
            <iframe
                src="http://localhost:3030/public/dashboard/2c1a7ad7-8c66-4e6d-8493-73cb5cad0b13"
                frameborder="0"
                width="100%"
                height="90%"
                allowtransparency
            />
        );

    }

}

export default withStyles(styles)(Index);

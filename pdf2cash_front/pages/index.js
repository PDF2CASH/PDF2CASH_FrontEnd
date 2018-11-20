import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';

const styles = theme => ({

});

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state= [];
    }

    render() {

        return (
            <Grid>
                <Bar
                    data={data}
                    width={100}
                    height={400}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </Grid>
        );

    }

}

export default withStyles(styles)(Index);

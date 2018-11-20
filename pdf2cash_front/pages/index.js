import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Authenticate  from './auth';
import { Grid } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';

const styles = ({
    chart: {
        width: '100%',
        maxWidth: '100%',
    },
    grid: {
        overflowX: 'auto',
        overflowY: 'auto'
    },
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
      },
      {
        label: 'teste',
        backgroundColor: 'rgba(255,15,50,200)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [25, 19, 40, 31, 16, 25, 20]
      }
    ]
  };

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            invoices: []
        };
    }

    async componentDidMount2() {
        const url = 'http://localhost:8000/invoice/invoice/'
        const head = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + Authenticate.getToken()
            },
            credentials: 'omit',
        }
        const response = await fetch(url, head);
        const data = await response.json();
        this.setState({ invoices: data });
    }

    render() {
        const classes = this.props;

        return (
            <Grid className={classes.grid}>
                <Bar
                    data={data}
                    height={'250px'}
                    classesName={classes.chart}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </Grid>
        );
    }
}

export default withStyles(styles)(Index);

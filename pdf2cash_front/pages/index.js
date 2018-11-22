import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Authenticate  from './auth';
import { Grid } from '@material-ui/core';
import { Line, Bar } from 'react-chartjs-2';

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

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chart_data: {}
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:8008/api/invoice/chart_total_value_per_time/';
        const head = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + Authenticate.getToken()
            },
            credentials: 'omit',
        }
        const res = await fetch(url, head);
        const data = await res.json();
        const chart_data = await {
            labels: data.date,
            datasets: [
                {
                    label: 'Valor total/Tempo',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: data.total
                },
            ]
        }
        const chart_dataM = await {
            labels: data.dateM,
            datasets: [
                {
                    label: 'Valor total/Tempo em mês',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: data.totalM
                },
            ]
        }
        const chart_dataY = await {
            labels: data.dateY,
            datasets: [
                {
                    label: 'Valor total/Tempo em ano',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: data.totalY
                },
            ]
        }
        
        const urlQ = 'http://localhost:8008/api/invoice/chart_qtd_per_time/';
        const resQ = await fetch(urlQ, head);
        const dataQ = await resQ.json();

        const chart_dataQtd = await {
            labels: dataQ.date,
            datasets: [{
                label: 'Quantidade de notas/Tempo',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: dataQ.count
            }, ]
        }

        await this.setState({
            chart_data,
            chart_dataM,
            chart_dataY,
            chart_dataQtd
        });
    }

    render() {
        const classes = this.props;
        const {
            chart_data,
            chart_dataM,
            chart_dataY,
            chart_dataQtd
        } = this.state;

        return (
            <Grid className={classes.grid}>
                <Grid>
                    <Line
                        data={chart_data}
                        height={250}
                        classesName={classes.chart}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </Grid>
                <Grid>
                    <Line
                        data={chart_dataM}
                        height={250}
                        classesName={classes.chart}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </Grid>
                {/* <Grid>
                    <Line
                        data={chart_dataY}
                        height={250}
                        classesName={classes.chart}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </Grid> */}
                <Grid>
                    <Bar
                        data={chart_dataQtd}
                        height={250}
                        classesName={classes.chart}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        min: 0
                                    }
                                }]
                            }
                        }}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Index);

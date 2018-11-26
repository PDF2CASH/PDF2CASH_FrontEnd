import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Authenticate  from './auth';
import {
    Grid,
    Radio,
    FormControlLabel,
    RadioGroup
} from '@material-ui/core';
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
            chart_data: {},
            chart_data1S: {},
            chart_data1M: {},
            chart_data6M: {},
            chart_data1A: {},
            chart_dataMax: {},
            chart_dataM: {},
            chart_dataY: {},
            chart_qtdByTime: {},
            chart_totalByCategory: {},
            chart_freightByDate: {},
            chart_total_valueBySeller: {},
            chart_total_current_year: {},
            chart_total_current_month: {},
            selectedValue: '1s',
        };
    }

    async componentDidMount() {
        let url = 'http://localhost:8008/api/invoice/chart_total_value_per_chosen_date/';
        const head = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'JWT ' + Authenticate.getToken()
            },
            credentials: 'omit',
        }
        let res = await fetch(url, head);
        let data = await res.json();
        const chart_data1S = await {
            labels: data.dateW,
                datasets: [{
                    label: 'Valor total/Tempo',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: data.totalW
                }, 
            ]
        }
        const chart_data1M = await {
            labels: data.dateM,
                datasets: [{
                    label: 'Valor total/Tempo',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: data.totalM
                }, 
            ]
        }
        const chart_data6M = await {
            labels: data.dateS,
                datasets: [{
                    label: 'Valor total/Tempo',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: data.totalS
                }, 
            ]
        }
        const chart_data1A = await {
            labels: data.dateY,
                datasets: [{
                    label: 'Valor total/Tempo',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: data.totalY
                }, 
            ]
        }
        
        url = 'http://localhost:8008/api/invoice/chart_total_value_per_time/';
        res = await fetch(url, head);
        data = await res.json();
        const chart_dataMax = await {
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
        
        url = 'http://localhost:8008/api/invoice/chart_qtd_per_time/';
        res = await fetch(url, head);
        data = await res.json();

        const chart_qtdByTime = await {
            labels: data.date,
            datasets: [{
                label: 'Quantidade de notas/Tempo',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.count
            }, ]
        }

        url = 'http://localhost:8008/api/invoice/chart_total_value_per_category/';
        res = await fetch(url, head);
        data = await res.json();

        const chart_totalByCategory = await {
            labels: data.category,
            datasets: [{
                label: 'Valor total/Categoria',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.total
            }, ]
        }

        url = 'http://localhost:8008/api/invoice/chart_freight_value_per_date/';
        res = await fetch(url, head);
        data = await res.json();

        const chart_freightByDate = await {
            labels: data.date,
            datasets: [{
                label: 'Valor do Frete/Tempo',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.freight
            }, ]
        }

        url = 'http://localhost:8008/api/invoice/chart_total_valueBySeller/';
        res = await fetch(url, head);
        data = await res.json();

        const chart_total_valueBySeller = await {
            labels: data.seller,
            datasets: [{
                label: 'Valor total/Vendedor',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.total
            }, ]
        }
        
        url = 'http://localhost:8008/api/invoice/chart_total_value_current/';
        res = await fetch(url, head);
        data = await res.json();

        const chart_total_current_year = await {
            labels: data.date,
            datasets: [{
                label: 'Valor total no ano atual',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.total
            }, ]
        }

        const chart_total_current_month = await {
            labels: data.dateM,
            datasets: [{
                label: 'Valor total no mês atual',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.totalM
            }, ]
        }

        await this.setState({
            chart_data: chart_data1S,
            chart_data1S,
            chart_data1M,
            chart_data6M,
            chart_data1A,
            chart_dataMax,
            chart_dataM,
            chart_dataY,
            chart_qtdByTime,
            chart_totalByCategory,
            chart_freightByDate,
            chart_total_valueBySeller,
            chart_total_current_year,
            chart_total_current_month
        });
    }

    handleChangeDate = event => {
        const {
            chart_data1S,
            chart_data1M,
            chart_data6M,
            chart_data1A,
            chart_dataMax,
        } = this.state;
        this.setState({
            selectedValue: event.target.value
        });
        if (event.target.value == '1s') {
            this.setState({
                chart_data: chart_data1S
            });
        } else if (event.target.value == '1m') {
            this.setState({
                chart_data: chart_data1M
            });
        } else if (event.target.value == '6m') {
            this.setState({
                chart_data: chart_data6M
            });
        } else if (event.target.value == '1a') {
            this.setState({
                chart_data: chart_data1A
            });
        } else if (event.target.value == 'max') {
            this.setState({
                chart_data: chart_dataMax
            });
        }
    };


    render() {
        const classes = this.props;
        const {
            chart_data,
            chart_dataMax,
            chart_dataM,
            chart_dataY,
            chart_qtdByTime,
            chart_totalByCategory,
            chart_freightByDate,
            chart_total_valueBySeller,
            chart_total_current_year,
            chart_total_current_month,
            selectedValue,
        } = this.state;

        return (
            <Grid className={classes.grid}>
                <Grid>
                    <Line
                        data={chart_total_current_year}
                        height={250}
                        classesName={classes.chart}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </Grid>
                <Grid>
                    <Line
                        data={chart_total_current_month}
                        height={250}
                        classesName={classes.chart}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </Grid>
                { /*<Grid>
                    <Bar
                        data={chart_total_valueBySeller}
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
                <Grid>
                    <Bar
                        data={chart_freightByDate}
                        height={250}
                        classesName={classes.chart}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </Grid>
                <Grid>
                    <Bar
                        data={chart_totalByCategory}
                        height={250}
                        classesName={classes.chart}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </Grid>
                < Grid>
                    < Grid 
                        container
                        direction = "row"
                        justify = "center"
                        alignItems = "center" 
                    >
                        <RadioGroup 
                            name="options"
                            className={classes.group}
                            value={selectedValue}
                            onChange={this.handleChangeDate}
                            row
                        >
                            <FormControlLabel value="1s" control={<Radio color="primary"/>} label="1 Semana" />
                            <FormControlLabel value="1m" control={<Radio color="primary"/>} label="1 Mês" />
                            <FormControlLabel value="6m" control={<Radio color="primary"/>} label="6 Meses" />
                            <FormControlLabel value="1a" control={<Radio color="primary"/>} label="1 Ano" />
                            <FormControlLabel value="max" control={<Radio color="primary"/>} label="Máx" />
                        </RadioGroup>
                    </Grid>
                    <Line
                        data={chart_data}
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
                <Grid>
                    <Line
                        data={chart_dataMax}
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
                <Grid>
                    <Line
                        data={chart_dataY}
                        height={250}
                        classesName={classes.chart}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </Grid>
                <Grid>
                    <Bar
                        data={chart_qtdByTime}
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
                </Grid> */}
            </Grid>
        );
    }
}

export default withStyles(styles)(Index);

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Authenticate  from './auth';
import {
    Paper,
    Grid,
    Radio,
    FormControlLabel,
    RadioGroup,
    Typography,
} from '@material-ui/core';
import {
    Line,
    Bar,
    Pie,
    Radar
} from 'react-chartjs-2';

const styles = theme => ({
    chart: {
        width: '100%',
        maxWidth: '100%',
    },
    grid: {
        overflowX: 'auto',
        overflowY: 'auto'
    },
    chart_paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    information_paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
        height: '10%',
        maxHeight: '10%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    card: {
        maxWidth: 400,
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
            chart_qtdByMonth: {},
            chart_qtdByYear: {},
            chart_total_current_year: {},
            chart_total_current_month: {},
            chart_total_qtd: {},
            chart_qtd_business: {},
            selectedValue: '1s',
            totalM: '',
        };
    }

    async componentDidMount() {
        let url = 'http://localhost:8000/api/invoice/chart_total_value_per_chosen_date/';
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
                label: 'Valor total em 1 Semana',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.totalW
            }, ]
        }
        const chart_data1M = await {
            labels: data.dateM,
            datasets: [{
                label: 'Valor total em 1 Mês',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.totalM
            }, ]
        }
        const chart_data6M = await {
            labels: data.dateS,
            datasets: [{
                label: 'Valor total em 6 meses',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.totalS
            }, ]
        }
        const chart_data1A = await {
            labels: data.dateY,
            datasets: [{
                label: 'Valor total em 1 Ano',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.totalY
            }, ]
        }

        url = 'http://localhost:8000/api/invoice/chart_total_value_per_time/';
        res = await fetch(url, head);
        data = await res.json();
        const chart_dataMax = await {
            labels: data.date,
            datasets: [{
                label: 'Valor total por Tempo máximo',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.total
            }, ]
        }

        url = 'http://localhost:8000/api/invoice/chart_qtd_per_time/';
        res = await fetch(url, head);
        data = await res.json();

        const chart_qtdByMonth = await {
            labels: data.date,
            datasets: [{
                label: 'Quantidade de notas por Mês',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.count
            }, ]
        }

        const chart_qtdByYear = await {
            labels: data.dateY,
            datasets: [{
                label: 'Quantidade de notas por Ano',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.countY
            }, ]
        }

        url = 'http://localhost:8000/api/invoice/chart_total_value_current/';
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
        
        url = 'http://localhost:8000/api/invoice/information_invoices/';
        res = await fetch(url, head);
        data = await res.json();
        const totalM = data.totalM
        const chart_total_qtd = {
            labels: [
                'Mensal',
                'Anual'
            ],
            datasets: [{
                label: 'Nº notas Mensal / Anual',
                data: [data.total_qtd_month, data.total_qtd_year],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                ]
            }]
        }
        const chart_qtd_business = {
            labels: data.sellers,
            datasets: [{
                label: "Nº notas por empresa",
                backgroundColor: "rgba(255,99,132,0.5)",
                pointBackgroundColor: "rgba(54,162,235,1)",
                data: data.count
            }]
        }


        await this.setState({
            chart_data: chart_data1S,
            chart_data1S,
            chart_data1M,
            chart_data6M,
            chart_data1A,
            chart_dataMax,
            chart_qtdByMonth,
            chart_qtdByYear,
            chart_total_current_year,
            chart_total_current_month,
            totalM,
            chart_total_qtd,
            chart_qtd_business,
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
            chart_qtdByMonth,
            chart_qtdByYear,
            chart_total_current_year,
            chart_total_current_month,
            selectedValue,
            totalM,
            chart_total_qtd,
            chart_qtd_business
        } = this.state;

        return (
            <Grid className={classes.grid} container spacing={24}>
                <Grid item xs={4}>
                    <Paper className={classes.information_paper}> 
                        <Radar 
                            data={chart_qtd_business}
                            height={270}
                            classesName={classes.chart}
                            options={{
                                reverse: false,
                                gridLines: {
                                    color: [
                                        'red',
                                    ]
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid container spacing={16} item xs={4}>
                    <Grid item xs={12}>
                        <Paper className={classes.information_paper}> 
                            <Typography variant="subtitle2">
                                Valor total mensal
                            </Typography>
                            <Typography variant="h4" component="p" style={{textAlign:'right'}}>
                                {totalM}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.information_paper}> 
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.information_paper}>
                        <Pie
                            data={chart_total_qtd}
                            height={355}
                            classesName={classes.chart}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Nº notas Mensal / Anual'
                                },
                                maintainAspectRatio: false,
                                responsive: false,
                                legend: {
                                    position: 'left',
                                    labels: {
                                        boxWidth: 10
                                    }
                                }
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}> 
                    <Paper className={classes.chart_paper}> 
                        < Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <RadioGroup
                                name="options"
                                className={classes.group}
                                value={selectedValue}
                                onChange={this.handleChangeDate}
                                row
                            >
                                <FormControlLabel value="1s" control={<Radio color="primary" />} label="1 Semana" />
                                <FormControlLabel value="1m" control={<Radio color="primary" />} label="1 Mês" />
                                <FormControlLabel value="6m" control={<Radio color="primary" />} label="6 Meses" />
                                <FormControlLabel value="1a" control={<Radio color="primary" />} label="1 Ano" />
                                <FormControlLabel value="max" control={<Radio color="primary" />} label="Máx" />
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
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper classesName={classes.chart_paper}>
                        <Line
                            data={chart_total_current_month}
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
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper classesName={classes.chart_paper}>
                    <Line
                        data={chart_total_current_year}
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
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper classesName={classes.chart_paper}>
                        <Bar
                            data={chart_qtdByMonth}
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
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper classesName={classes.chart_paper}>
                        <Bar
                            data={chart_qtdByYear}
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
                    </Paper>
                </Grid>
            </Grid> 
        );
    }
}

export default withStyles(styles)(Index);

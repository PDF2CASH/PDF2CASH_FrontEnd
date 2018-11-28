import React from 'react';
import {
    withStyles
} from '@material-ui/core/styles';
import {
    Grid,
    Checkbox,
    FormControl,
    Typography,
    Select,
    MenuItem,
    Input,
    InputLabel,
    ListItemText,
    Paper
} from '@material-ui/core';
import {
    Line,
    Bar
} from 'react-chartjs-2';

import Authenticate from '../auth';

const styles = theme => ({
    grid: {
        height: '80%',
        overflow: 'auto'
    },

    formControl: {
        margin: theme.spacing.unit,
        minWidth: '25%',
        maxWidth: '30%',
    },
    chart_paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 375,
        },
    },
};

const names = [
    'Valor total em 1 Semana',
    'Valor total em 1 Mês',
    'Valor total em 6 meses',
    'Valor total em 1 Ano',
    'Valor total por Tempo máximo',
    'Valor total por Tempo máximo - Mês',
    'Valor total por Tempo máximo - Ano',
    'Quantidade de notas por Mês',
    'Quantidade de notas por Ano',
    'Valor total por Categoria',
    'Valor do Frete por Tempo',
    'Valor total por Empresa',
    'Valor total no ano atual',
    'Valor total no mês atual',
];

class Index extends React.Component {
    handleChange = event => {
        this.setState({ name: event.target.value });
    };

    constructor(props) {
        super(props);
        this.state = {
            name: [],
            chart_data1S: {},
            chart_data1M: {},
            chart_data6M: {},
            chart_data1A: {},
            chart_dataMax: {},
            chart_dataM: {},
            chart_dataY: {},
            chart_qtdByMonth: {},
            chart_qtdByYear: {},
            chart_totalByCategory: {},
            chart_freightByDate: {},
            chart_total_valueBySeller: {},
            chart_total_current_year: {},
            chart_total_current_month: {},
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
        const chart_dataM = await {
            labels: data.dateM,
            datasets: [{
                label: 'Valor total por Tempo máximo - Mês',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.totalM
            }, ]
        }
        const chart_dataY = await {
            labels: data.dateY,
            datasets: [{
                label: 'Valor total por Tempo máximo - Ano',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.totalY
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

        url = 'http://localhost:8000/api/invoice/chart_total_value_per_category/';
        res = await fetch(url, head);
        data = await res.json();

        const chart_totalByCategory = await {
            labels: data.category,
            datasets: [{
                label: 'Valor total por Categoria',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.total
            }, ]
        }

        url = 'http://localhost:8000/api/invoice/chart_freight_value_per_date/';
        res = await fetch(url, head);
        data = await res.json();

        const chart_freightByDate = await {
            labels: data.date,
            datasets: [{
                label: 'Valor do Frete por Tempo',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.freight
            }, ]
        }

        url = 'http://localhost:8000/api/invoice/chart_total_valueBySeller/';
        res = await fetch(url, head);
        data = await res.json();

        const chart_total_valueBySeller = await {
            labels: data.seller,
            datasets: [{
                label: 'Valor total por Empresa',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: data.total
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
        
        await this.setState({
            chart_data1S,
            chart_data1M,
            chart_data6M,
            chart_data1A,
            chart_dataMax,
            chart_dataM,
            chart_dataY,
            chart_qtdByMonth,
            chart_qtdByYear,
            chart_totalByCategory,
            chart_freightByDate,
            chart_total_valueBySeller,
            chart_total_current_year,
            chart_total_current_month,            
        });
    }

    render() {
        const { classes } = this.props;
        const {
            name,
            chart_data1S,
            chart_data1M,
            chart_data6M,
            chart_data1A,
            chart_dataMax,
            chart_dataM,
            chart_dataY,
            chart_total_current_month,
            chart_total_current_year,
            chart_qtdByMonth,
            chart_qtdByYear,
            chart_totalByCategory,
            chart_freightByDate,
            chart_total_valueBySeller,
        } = this.state;

        var chart_data1S_print;
        var chart_data1M_print;
        var chart_data6M_print;
        var chart_data1A_print;
        var chart_dataMax_print;
        var chart_dataM_print;
        var chart_dataY_print;
        var chart_total_current_month_print;
        var chart_total_current_year_print;
        var chart_qtdByMonth_print;
        var chart_qtdByYear_print;
        var chart_totalByCategory_print;
        var chart_freightByDate_print;
        var chart_total_valueBySeller_print;

        if (this.state.name.indexOf('Valor total em 1 Semana') > -1) {
            chart_data1S_print = <Grid item xs={12}>
                        <Paper className={classes.chart_paper}>
                            <Line
                                data={chart_data1S}
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
                    </Grid>;
        }

        if (this.state.name.indexOf('Valor total em 1 Mês') > -1) {
            chart_data1M_print = <Grid item xs={12} >
                        <Paper className={classes.chart_paper}>
                            <Line
                                data={chart_data1M}
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
        }

        if (this.state.name.indexOf('Valor total em 6 meses') > -1) {
            chart_data6M_print = <Grid item xs={12}>
                <Paper className={classes.chart_paper}>
                    <Line
                        data={chart_data6M}
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
        }

        if (this.state.name.indexOf('Valor total em 1 Ano') > -1) {
            chart_data1A_print = <Grid item xs={12}>
                <Paper className={classes.chart_paper}>
                    <Line
                        data={chart_data1A}
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
        }

        if (this.state.name.indexOf('Valor total por Tempo máximo') > -1) {
            chart_dataMax_print = <Grid item xs={12}>
                <Paper className={classes.chart_paper}>
                    <Line
                        data={chart_dataMax}
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
        }

        if (this.state.name.indexOf('Valor total por Tempo máximo - Mês') > -1) {
            chart_dataM_print = <Grid item xs={12}>
                <Paper className={classes.chart_paper}>
                    <Line
                        data={chart_dataM}
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
        }

        if (this.state.name.indexOf('Valor total por Tempo máximo - Ano') > -1) {
            chart_dataY_print = <Grid item xs={12}>
                <Paper className={classes.chart_paper}>
                    <Line
                        data={chart_dataY}
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
        }

        if (this.state.name.indexOf('Quantidade de notas por Mês') > -1) {
            chart_total_current_month_print = <Grid item xs={12}>
                <Paper className={classes.chart_paper}>
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
        }

        if (this.state.name.indexOf('Quantidade de notas por Ano') > -1) {
            chart_total_current_year_print = <Grid item xs={12}>
                <Paper className={classes.chart_paper}>
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
        }

        if (this.state.name.indexOf('Valor total por Categoria') > -1) {
            chart_qtdByMonth_print = <Grid item xs={12}>
                <Paper className={classes.chart_paper}>
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
        }

        if (this.state.name.indexOf('Valor do Frete por Tempo') > -1) {
            chart_qtdByYear_print = <Grid item xs={12}>
                <Paper className={classes.chart_paper}>
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
        }

        if (this.state.name.indexOf('Valor total por Empresa') > -1) {
            chart_totalByCategory_print = <Grid item xs={12}>
                <Paper className={classes.chart_paper}>
                    <Bar
                        data={chart_totalByCategory}
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
        }

        if (this.state.name.indexOf('Valor total no ano atual') > -1) {
            chart_freightByDate_print = <Grid item xs={12}>
                <Paper className={classes.chart_paper}>
                    <Bar
                        data={chart_freightByDate}
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
        }

        if (this.state.name.indexOf('Valor total no mês atual') > -1) {
            chart_total_valueBySeller_print = <Grid item xs={12}>
                <Paper className={classes.chart_paper}>
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
                </Paper>
            </Grid>
        }
        
        return (
            <Grid className={classes.grid} container spacing={24}>
                <Grid item xs={12}>
                    < Typography variant = 'h3' >
                        Gráficos
                    </Typography>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor='select-multiple-checkbox'>Filtro</InputLabel>
                        <Select
                            multiple
                            value={this.state.name}
                            onChange={this.handleChange}
                            input={<Input id='select-multiple' />}
                            renderValue={selected => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                        {names.map(name => (
                            <MenuItem key={name} value={name}>
                                <Checkbox color = 'primary' checked={this.state.name.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Grid>
                {chart_data1S_print}
                {chart_data1M_print}
                {chart_data6M_print}
                {chart_data1A_print}
                {chart_dataMax_print}
                {chart_dataM_print}
                {chart_dataY_print}
                {chart_total_current_month_print}
                {chart_total_current_year_print}
                {chart_qtdByMonth_print}
                {chart_qtdByYear_print}
                {chart_totalByCategory_print}
                {chart_freightByDate_print}
                {chart_total_valueBySeller_print}
            </Grid>
        );

    }

}


export default withStyles(styles)(Index);

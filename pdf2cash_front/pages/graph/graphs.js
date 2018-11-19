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
    ListItemText
} from '@material-ui/core';

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
    'Valor total/Data',
    'Valor total de vendedor/Mês',
    'Valor total/Categoria',
    'Quantidade de NFe/Vendedor',
    'Impostos/Data',
    'Frete/Data',
    'Desconto/Vendedor'
];

class Index extends React.Component {
    handleChange = event => {
        this.setState({ name: event.target.value });
    };

    constructor(props) {
        super(props);
        this.state = {
            name: [],
        };
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.name)
        return (
            <Grid className={classes.grid}>
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
                <iframe
                    hidden={!(this.state.name.indexOf('Valor total/Data') > -1)}
                    src='http://localhost:3030/public/question/0be92c1f-ab8a-4d14-9b71-0fbd5a160dd9'
                    frameBorder='0'
                    width='100%'
                    height='60%'
                    allowtransparency
                />
                < iframe 
                    hidden={!(this.state.name.indexOf('Valor total de vendedor/Mês') > -1)}
                    src='http://localhost:3030/public/question/72435521-fd23-49dd-b4a8-601ad34d75bf'
                    frameBorder='0'
                    width='100%'
                    height='60%'
                    allowtransparency
                />
                <iframe
                    hidden={!(this.state.name.indexOf('Valor total/Categoria') > -1)}
                    src='http://localhost:3030/public/question/1d57945f-d665-43a5-b862-989a1d90d5e3'
                    frameBorder='0'
                    width='100%'
                    height='60%'
                    allowtransparency
                />
                <iframe
                    hidden={!(this.state.name.indexOf('Quantidade de NFe/Vendedor') > -1)}
                    src='http://localhost:3030/public/question/ebbdd534-0017-4068-b5f3-c745c8be954f'
                    frameBorder='0'
                    width='100%'
                    height='60%'
                    allowtransparency
                />
                <iframe
                    hidden={!(this.state.name.indexOf('Impostos/Data') > -1)}
                    src='http://localhost:3030/public/question/b294d15b-b4b7-4438-86b6-d9a5740b46ca'
                    frameBorder='0'
                    width='100%'
                    height='60%'
                    allowtransparency
                />
                <iframe
                    hidden={!(this.state.name.indexOf('Frete/Data') > -1)}
                    src='http://localhost:3030/public/question/afcfb81f-71a7-4f72-91c2-1d39d677b136'
                    frameBorder='0'
                    width='100%'
                    height='60%'
                    allowtransparency
                />
                <iframe
                    hidden={!(this.state.name.indexOf('Desconto/Vendedor') > -1)}
                    src='http://localhost:3030/public/question/ab83a558-da8c-4647-9cc5-6f72c9de57ef'
                    frameBorder='0'
                    width='100%'
                    height='60%'
                    allowtransparency
                />
            </Grid>
        );

    }

}


export default withStyles(styles)(Index);

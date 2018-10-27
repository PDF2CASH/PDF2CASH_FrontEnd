import React, { Component } from 'react';
import CustomatizedTable from '../../comps/table';
import { TableRow, TableCell, Button, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  cell: {
    textAlign: 'center'
  },
  warning: {
    textAlign: 'center',
    marginTop: 100
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class InvoiceIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: [],
      sellers: [],
      join: [],
      open: false,
    };

    this.joinInvoiceSeller = this.joinInvoiceSeller.bind(this);
    this.dateFormatter = this.dateFormatter.bind(this);
    this.delete = this.delete.bind(this);
    this.getInvoices = this.getInvoices.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  async handleOpenModal(){
    this.setState ({
      open: true
    });
  }

  async closeModal(){
    this.setState({
     open: false
    });
  }

  async componentDidMount() {
    const url_invoice = 'http://localhost:8000/api/invoice/invoice/';
    const res_invoice = await fetch(url_invoice);
    const data_invoice = await res_invoice.json();
    this.setState({
      invoices: data_invoice,
      open: false,
    });

    const url_seller = 'http://localhost:8000/api/invoice/seller/';
    const res_seller = await fetch(url_seller);
    const data_seller = await res_seller.json();
    this.setState({ sellers: data_seller });

    this.joinInvoiceSeller();
  }

  async getInvoices() {
    const url_invoice = 'http://localhost:8000/api/invoice/invoice/';
    const res_invoice = await fetch(url_invoice);
    const data_invoice = await res_invoice.json();
    this.setState({ invoices: data_invoice });

    const url_seller = 'http://localhost:8000/api/invoice/seller/';
    const res_seller = await fetch(url_seller);
    const data_seller = await res_seller.json();
    this.setState({ sellers: data_seller });

    this.joinInvoiceSeller();
  }

  async delete(id){
    const url = 'http://localhost:8000/api/invoice/invoice/'+ id + '/';
    const res = await fetch(url, { method:'DELETE' });
    this.getInvoices();
  }

  dateFormatter(date) {
    var old_date = new Date(date);
    var day = old_date.getDate();
    var month = old_date.getMonth();
    var year = old_date.getFullYear();

    var new_date = day + '/' + month + '/' + year

    return new_date;
  }

  joinInvoiceSeller() {
    const { invoices, sellers } = this.state;
    var join = invoices;

    for (let i = 0; i < invoices.length; i++) {
      for (let i2 = 0; i2 < sellers.length; i2++) {
        if(invoices[i].seller === sellers[i2].id) {
          join[i].seller = sellers[i2];
          join[i].emission_date = this.dateFormatter(join[i].emission_date);
        }
      }
    }

    this.setState({ join: join });
  }

  render() {
    const { classes } = this.props;
    const { join } = this.state;

    return (
      <Grid>
        <Typography variant="display2">
          Listar Notas Fiscais
        </Typography>

        {
          this.state.invoices.length ? (
            <CustomatizedTable>
              {
                join.map(invoice => (
                  <TableRow key={invoice.id}>
                    <TableCell className={classes.cell}>
                      <Typography>
                        {invoice.emission_date}
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.cell}>
                      <Typography>
                        {invoice.access_key}
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.cell}>
                      <Typography>
                        {invoice.seller.name}
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.cell}>
                      <Typography>
                        {invoice.seller.cnpj}
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.cell}>
                      <Typography>
                        {invoice.total_invoice_value}
                      </Typography>
                    </TableCell>
                    <TableCell className={classes.cell}>
                      <Button>
                        <VisibilityIcon />
                      </Button>
                    </TableCell>
                    <TableCell className={classes.cell}>
                    <Button onClick={this.handleOpenModal}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                    
                  </TableRow>
                ))
              }
            </CustomatizedTable>
          ) : (
          <Grid className = {classes.warning}>
            <Typography variant="display1">
              Não há notas fiscais registradas!
            </Typography>
          </Grid>
          )
        }

      </Grid>
    )
  }
}

export default withStyles(styles)(InvoiceIndex);

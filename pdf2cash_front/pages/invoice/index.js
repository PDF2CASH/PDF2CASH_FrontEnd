import React, { Component } from 'react';
import {
  TableRow,
  TableCell,
  Button,
  Grid,
  Modal,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { withStyles } from '@material-ui/core/styles';
import CustomatizedTable from '../../comps/table';

const styles = theme => ({
  cell: {
    textAlign: 'center',
  },
  warning: {
    textAlign: 'center',
    marginTop: 100,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[ 5 ],
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
  },
  buttom: {
    marginTop: 30,
  },
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${ top }%`,
    left: `${ left }%`,
    transform: `translate(-${ top }%, -${ left }%)`,
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
      id: 0,
    };

    this.joinInvoiceSeller = this.joinInvoiceSeller.bind(this);
    this.dateFormatter = this.dateFormatter.bind(this);
    this.delete = this.delete.bind(this);
    this.getInvoices = this.getInvoices.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    const urlInvoice = 'http://localhost:8000/api/invoice/invoice/';
    const resInvoice = await fetch(urlInvoice);
    const dataInvoice = await resInvoice.json();
    this.setState({
      invoices: dataInvoice,
      open: false,
    });

    const urlSeller = 'http://localhost:8000/api/invoice/seller/';
    const resSeller = await fetch(urlSeller);
    const dataSeller = await resSeller.json();
    this.setState({ sellers: dataSeller });

    this.joinInvoiceSeller();
  }

  async getInvoices() {
    const urlInvoice = 'http://localhost:8000/api/invoice/invoice/';
    const resInvoice = await fetch(urlInvoice);
    const dataInvoice = await resInvoice.json();
    this.setState({ invoices: dataInvoice });

    const urlSeller = 'http://localhost:8000/api/invoice/seller/';
    const resSeller = await fetch(urlSeller);
    const dataSeller = await resSeller.json();
    this.setState({ sellers: dataSeller });

    this.joinInvoiceSeller();
  }

  async delete() {
    const { id } = await this.state;
    const url = `http://localhost:8000/api/invoice/invoice/${ id }/`;
    await fetch(url, { method: 'DELETE' });
    this.closeModal();
    this.getInvoices();
  }

  dateFormatter(date) {
    this.oldDate = new Date(date);
    const day = this.oldDate.getDate();
    const month = this.oldDate.getMonth();
    const year = this.oldDate.getFullYear();

    const newDate = `${ day }/${ month }/${ year }`

    return newDate;
  }

  joinInvoiceSeller() {
    const { invoices, sellers } = this.state;
    const join = invoices;

    for (let i = 0; i < invoices.length; i += 1) {
      for (let i2 = 0; i2 < sellers.length; i2 += 1) {
        if (invoices[ i ].seller === sellers[ i2 ].id) {
          join[ i ].seller = sellers[ i2 ];
          join[ i ].emission_date = this.dateFormatter(join[ i ].emission_date);
        }
      }
    }

    this.setState({ join });
  }

  openModal(id) {
    this.setState({
      open: true,
      id,
    });
  }

  async closeModal() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { classes } = this.props;
    const {
      join,
      open,
      id,
      invoices,
    } = this.state;

    return (
        <Grid>
            <Typography variant="display2">
              Listar Notas Fiscais
            </Typography>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={ open }
              onClose={ this.closeModal }
            >
                <Grid style={ getModalStyle() } className={ classes.paper }>
                    <Typography variant="h6" className={ classes.cell }>
                      Deseja realmete deletar essa nota fiscal ?
                    </Typography>
                    <Button
                      variant="contained"
                      className={ classes.buttom }
                      color="primary"
                      onClick={ () => this.delete(id) }
                    >
                      SIM
                    </Button>
                    <Button
                      variant="contained"
                      className={ classes.buttom }
                      color="secondary"
                      onClick={ this.closeModal }
                    >
                      NÃO
                    </Button>
                </Grid>
            </Modal>
            {
          invoices.length ? (
              <CustomatizedTable>
                  {
                join.map(invoice => (
                    <TableRow key={ invoice.id }>
                        <TableCell className={ classes.cell }>
                            <Typography>
                                {invoice.emission_date}
                            </Typography>
                        </TableCell>
                        <TableCell className={ classes.cell }>
                            <Typography>
                                {invoice.access_key}
                            </Typography>
                        </TableCell>
                        <TableCell className={ classes.cell }>
                            <Typography>
                                {invoice.seller.name}
                            </Typography>
                        </TableCell>
                        <TableCell className={ classes.cell }>
                            <Typography>
                                {invoice.seller.cnpj}
                            </Typography>
                        </TableCell>
                        <TableCell className={ classes.cell }>
                            <Typography>
                                {invoice.total_invoice_value}
                            </Typography>
                        </TableCell>
                        <TableCell className={ classes.cell }>
                            <Button>
                                <VisibilityIcon />
                            </Button>
                        </TableCell>
                        <TableCell className={ classes.cell }>
                            <Button onClick={ () => this.openModal(invoice.id) }>
                                <DeleteIcon />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))
              }
              </CustomatizedTable>
          ) : (
              <Grid className={ classes.warning }>
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

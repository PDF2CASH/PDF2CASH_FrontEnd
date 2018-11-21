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
import AddIcon from '@material-ui/icons/Add';
import InvoiceCreate from '../../comps/createInvoice'
import Authenticate from '../auth';

const styles = theme => ({
  cell: {
    textAlign: 'center',
  },
  warning: {
    textAlign: 'center',
    marginTop: 100,
  },
  paperDelete: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[ 5 ],
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
  },
  paperCreate: {
    position: 'absolute',
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    textAlign: 'center'
  },
  button: {
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
      openDelete: false,
      openCreate: false,
      id: 0,
    };

    this.joinInvoiceSeller = this.joinInvoiceSeller.bind(this);
    this.dateFormatter = this.dateFormatter.bind(this);
    this.delete = this.delete.bind(this);
    this.getInvoices = this.getInvoices.bind(this);
    this.openModalDelete = this.openModalDelete.bind(this);
    this.closeModalDelete = this.closeModalDelete.bind(this);
    this.openModalCreate = this.openModalCreate.bind(this);
    this.closeModalCreate = this.closeModalCreate.bind(this);
  }

  async componentDidMount() {
    Authenticate.loginValidationdation();
    const urlInvoice = 'http://localhost:8008/api/invoice/invoice/';
    const resInvoice = await fetch(urlInvoice,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'JWT ' + Authenticate.getToken()
        },
        credentials: 'omit',
      });
    const dataInvoice = await resInvoice.json();
    this.setState({
      invoices: dataInvoice,
      openDelete: false,
    });

    const urlSeller = 'http://localhost:8008/api/invoice/seller/';
    const resSeller = await fetch(urlSeller);
    const dataSeller = await resSeller.json();
    this.setState({ sellers: dataSeller });

    this.joinInvoiceSeller();
  }

  async getInvoices() {
    Authenticate.loginValidationdation();
    const urlInvoice = 'http://localhost:8008/api/invoice/invoice/';
    const resInvoice = await fetch(urlInvoice);
    const dataInvoice = await resInvoice.json();
    this.setState({ invoices: dataInvoice });

    const urlSeller = 'http://localhost:8008/api/invoice/seller/';
    const resSeller = await fetch(urlSeller);
    const dataSeller = await resSeller.json();
    this.setState({ sellers: dataSeller });

    this.joinInvoiceSeller();
  }

  async delete() {
    const { id } = await this.state;
    const url = `http://localhost:8008/api/invoice/invoice/${ id }/`;
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

  openModalDelete(id) {
    this.setState({
      openDelete: true,
      id,
    });
  }

  async closeModalDelete() {
    this.setState({
      openDelete: false,
    });
  }

  openModalCreate() {
    this.setState({
      openCreate: true,
    });
  }

  async closeModalCreate() {
    this.setState({
      openCreate: false
    });
  }

  render() {
    const { classes } = this.props;
    const {
      join,
      openDelete,
      openCreate,
      id,
      invoices,
    } = this.state;

    return (
        <Grid>
            <Typography variant="display2">
              Listar Notas Fiscais
            </Typography>
            <Button
              variant="fab"
              color="secondary"
              aria-label="Add"
              className={classes.buttonCreate}
              onClick={() => this.openModalCreate()}
            >
              <AddIcon />
            </Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={ openDelete }
              onClose={ this.closeModalDelete }
            >
                <Grid style={ getModalStyle() } className={ classes.paperDelete }>
                    <Typography variant="h6" className={ classes.cell }>
                      Deseja realmente deletar essa nota fiscal ?
                    </Typography>
                    <Button
                      id='SIM'
                      variant="contained"
                      className={ classes.button }
                      color="primary"
                      onClick={ () => this.delete(id) }
                    >
                      SIM
                    </Button>
                    <Button
                      id='NAO'
                      variant="contained"
                      className={ classes.button }
                      color="secondary"
                      onClick={ this.closeModalDelete }
                    >
                      NÃO
                    </Button>
                </Grid>
            </Modal>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={ openCreate }
              onClose={ this.closeModalCreate }
            >
                <Grid style={ getModalStyle() } className={ classes.paperCreate }>
                  < InvoiceCreate />
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
                            <Button onClick={ () => this.openModalDelete(invoice.id) }>
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
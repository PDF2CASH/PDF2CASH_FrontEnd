import React from 'react';
import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({

  paper: {
    textAlign: 'center',
  },
  mainPaper: {
    position: 'relative',
  },
  show: {
    height: '400px',
    overflow: 'scroll',
  },
  waiter: {
    position: 'relative',
    width: '50px',
    margin: 'auto',
    top: '200px',
  },
});

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: null,
      seller: null,
      receiver: null,
      value: 0,
      data_has_loaded: false,
    }
  }

    renderNFData = () => {
      const nf = this.state.invoice;

      return (
          <Table>
              <TableBody>
                  <TableRow>
                      <TableCell>
                          <Typography variant="body1">
                                Natureza da Operação
                          </Typography>
                      </TableCell>
                      <TableCell>
                          <Typography>
                              {nf.operation_nature}
                          </Typography>
                      </TableCell>
                  </TableRow>

                  <TableRow>
                      <TableCell>
                          <Typography variant="body1">
                                Chave de Acesso
                          </Typography>
                      </TableCell>
                      <TableCell>
                          <Typography>
                              {nf.acess_key}
                          </Typography>
                      </TableCell>
                  </TableRow>

                  <TableRow>
                      <TableCell>
                          <Typography variant="body1">
                                Protocolo de Autorização de Uso
                          </Typography>
                      </TableCell>
                      <TableCell>
                          <Typography>
                              {nf.authorization_protocol}
                          </Typography>
                      </TableCell>
                  </TableRow>

                  <TableRow>
                      <TableCell>
                          <Typography variant="body1">
                                Data de Emissão
                          </Typography>
                      </TableCell>
                      <TableCell>
                          <Typography>
                              {nf.emission_date}
                          </Typography>
                      </TableCell>
                  </TableRow>

              </TableBody>
          </Table>
      );
    }

    renderReceiverData = () => {
      const receiver = this.state.receiver;

      return (
          <Table>
              <TableBody>
                  <TableRow>
                      <TableCell>
                          <Typography variant="body1">
                                Nome
                          </Typography>
                      </TableCell>
                      <TableCell>
                          <Typography>
                              {receiver.name}
                          </Typography>
                      </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>
                          <Typography variant="body1">
                                CPF/CNPJ
                          </Typography>
                      </TableCell>
                      <TableCell>
                          <Typography>
                              {receiver.cpf_cnpj}
                          </Typography>
                      </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>
                          <Typography variant="body1">
                                Endereço
                          </Typography>
                      </TableCell>
                      <TableCell>
                          <Typography>
                              {receiver.address}
                          </Typography>
                      </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>
                          <Typography variant="body1">
                                Município
                          </Typography>
                      </TableCell>
                      <TableCell>
                          <Typography>
                              {receiver.county}
                          </Typography>
                      </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>
                          <Typography variant="body1">
                                Bairro
                          </Typography>
                      </TableCell>
                      <TableCell>
                          <Typography>
                              {receiver.neighborhood}
                          </Typography>
                      </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>
                          <Typography variant="body1">
                                Telefone
                          </Typography>
                      </TableCell>
                      <TableCell>
                          <Typography>
                              {receiver.phone}
                          </Typography>
                      </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>
                          <Typography variant="body1">
                                CEP
                          </Typography>
                      </TableCell>
                      <TableCell>
                          <Typography>
                              {receiver.cep}
                          </Typography>
                      </TableCell>
                  </TableRow>
              </TableBody>
          </Table>
      );
    }

    renderTaxData = () => {
      const invoice = this.state.invoice;

      return (
          <Table>
              <TableBody>
                  <TableRow>
                      <TableCell>
                          <Typography variant="body1">
                                Valor de ICMS
                          </Typography>
                      </TableCell>
                      <TableCell>
                          <Typography>
                              {invoice.icms_value}
                          </Typography>
                      </TableCell>
                  </TableRow>

                  <TableRow>
                      <TableCell>
                          <Typography variant="body1">
                                Valor do Frete
                          </Typography>
                      </TableCell>
                      <TableCell>
                          <Typography>
                              {invoice.freight_value}
                          </Typography>
                      </TableCell>
                  </TableRow>

              </TableBody>
          </Table>
      );
    }

    renderSellerData = () => {
      const seller = this.state.seller;

      return (
          <Table>
              <TableBody>
                  <TableRow>
                      <TableCell>
                          <Typography variant="body1">
                                Nome
                          </Typography>
                      </TableCell>
                      <TableCell>
                          {seller.name}
                      </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>
                          <Typography variant="body1">
                                CNPJ
                          </Typography>
                      </TableCell>
                      <TableCell>
                          {seller.cnpj}
                      </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell>
                          <Typography variant="body1">
                                CEP
                          </Typography>
                      </TableCell>
                      <TableCell>
                          {seller.cep}
                      </TableCell>
                  </TableRow>
              </TableBody>
          </Table>
      );
    }

    async componentDidMount() {
      const invoice_id = this.props.router.query.id;
      const invoice_url = `http://localhost:8000/api/invoice/invoice/${ invoice_id }`;
      const invoice_res = await fetch(invoice_url);
      const invoice = await invoice_res.json();

      const receiver_id = await invoice.receiver;
      const receiver_url = `http://localhost:8000/api/invoice/receiver/${ receiver_id }`;
      const receiver_res = await fetch(receiver_url);
      const receiver = await receiver_res.json();

      const seller_id = await invoice.seller;
      const seller_url = `http://localhost:8000/api/invoice/seller/${ seller_id }`;
      const seller_res = await fetch(seller_url);
      const seller = await seller_res.json();

      this.setState({
        invoice,
        receiver,
        seller,
        data_has_loaded: true,
      });
    }

    handleChange = (event, value) => {
      this.setState({ value });
    };

    render() {
      const { classes } = this.props;
      const { value } = this.state;
      const { data_has_loaded } = this.state;

      let content;

      if (!data_has_loaded) {
        content = <CircularProgress className={ classes.waiter } />
      } else {
        content = <>
            <Grid item xs={ 12 }>
                <AppBar position="static">
                    <Tabs value={ value } onChange={ this.handleChange }>
                        <Tab label="Dados da NF" />
                        <Tab label="Imposto" />
                        <Tab label="Dados vendedor" />
                        <Tab label="Dados recebedor" />
                    </Tabs>
                </AppBar>
            </Grid>
            <Grid item xs={ 12 } className={ classes.show }>
                { value == 0 && this.renderNFData() }
                { value == 1 && this.renderTaxData() }
                { value == 2 && this.renderSellerData() }
                { value == 3 && this.renderReceiverData() }
            </Grid>
            <Grid item xs={ 12 }>
                <Grid container direction="column" justify="flex-end" alignItems="flex-end" alignContent="flex-end">
                    <Grid item xs={ 3 }>
                        <Button variant="contained" color="primary" component="a" href="/invoice">
                                Voltar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
                </>
      }
      return (

          <Grid container spacing={ 16 } className={ classes.root }>
              {content}
          </Grid>
      );
    }
}

export default withRouter(withStyles(styles)(Show));

import React from 'react';
import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tabs,
  Tab,
  AppBar,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Authenticate from './../auth.js';

const styles = ({

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
      dataHasLoaded: false,
    }
  }

  async componentDidMount() {
    Authenticate.loginValidationdation();
    const { router } = this.props;
    const invoiceId = router.query.id;
    const invoiceUrl = `http://localhost:8008/api/invoice/invoice/${ invoiceId }`;
    const invoiceRes = await fetch(invoiceUrl);
    const invoice = await invoiceRes.json();

    const receiverId = await invoice.receiver;
    const receiverUrl = `http://localhost:8008/api/invoice/receiver/${ receiverId }`;
    const receiverRes = await fetch(receiverUrl);
    const receiver = await receiverRes.json();

    const sellerId = await invoice.seller;
    const sellerUrl = `http://localhost:8008/api/invoice/seller/${ sellerId }`;
    const sellerRes = await fetch(sellerUrl);
    const seller = await sellerRes.json();

    this.setState({
      invoice,
      receiver,
      seller,
      dataHasLoaded: true,
    });
  }

    handleChange = (event, value) => {
      this.setState({ value });
    };

    renderNFData = () => {
      const { invoice } = this.state;

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
                              {invoice.operationNature}
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
                              {invoice.acessKey}
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
                              {invoice.authorizationProtocol}
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
                              {invoice.emissionDate}
                          </Typography>
                      </TableCell>
                  </TableRow>

              </TableBody>
          </Table>
      );
    }

    renderReceiverData = () => {
      const { receiver } = this.state;

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
      const { invoice } = this.state;

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
      const { seller } = this.state;

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

    render() {
      const { classes } = this.props;
      const { value } = this.state;
      const { dataHasLoaded } = this.state;

      let content;

      if (!dataHasLoaded) {
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
                { value === 0 && this.renderNFData() }
                { value === 1 && this.renderTaxData() }
                { value === 2 && this.renderSellerData() }
                { value === 3 && this.renderReceiverData() }
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

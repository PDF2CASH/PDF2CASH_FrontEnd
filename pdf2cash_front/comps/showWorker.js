import React from 'react';
import { withRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  Grid,
  TextField,
  CircularProgress,
  Paper,
} from '@material-ui/core';
import Authenticate from '../pages/auth.js';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit,
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    'max-width': '100%',
    'max-weight': '100%',
    marginLeft: '32%',
    marginTop: '10%',
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
  },
  button: {
    marginTop: '10%',
  },
});

class WorkerShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      worker: null,
      dataHasLoaded: false,
    }
  }

  async componentDidMount() {
    Authenticate.loginValidationdation();
    const { router } = this.props;
    const { id } = router.query;
    const url = publicRuntimeConfig.workerHostDomain+`/api/worker/worker/${ this.props.id }/`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + Authenticate.getToken()
      },
      credentials: 'omit',
    });
    const worker = await res.json();
    console.log(worker);
    this.setState({
      worker,
      dataHasLoaded: true,
    });
  }

  render() {
    const { classes } = this.props;
    const { worker, dataHasLoaded } = this.state;

    let content;

    if (!dataHasLoaded) {
      content = <CircularProgress className={ classes.waiter } />
    } else {
      content = <>
      <Paper className={ classes.root } elevation={ 5 }> 
          <Typography variant="h4" color="inherit">
                  Visualizar Funcionario
          </Typography>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >

              <TextField
                id="standard-read-only-input"
                label="Nome"
                defaultValue={ worker.username }
                className={ classes.textField }
                margin="normal"
                InputProps={ {
                  readOnly: true,
                } }
              />

              <TextField
                id="standard-read-only-input"
                label="CPF"
                defaultValue={ worker.cpf }
                className={ classes.textField }
                margin="normal"
                InputProps={ {
                  readOnly: true,
                } }
              />

              <TextField
                id="standard-read-only-input"
                label="Email"
                defaultValue={ worker.email }
                className={ classes.textField }
                margin="normal"
                InputProps={ {
                  readOnly: true,
                } }
              />

              <Button
                onClick={() => this.props.close()}
                variant="contained"
                color="primary"
                component="a"
              >
                    VOLTAR
              </Button>

          </Grid>
          </Paper>
          </>
    }

    return (
        <Grid container spacing={ 16 }>
            {content}
        </Grid>
    );
  }
}

export default withRouter(withStyles(styles)(WorkerShow));

import React from 'react';
import { withRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = ({
  cell: {
    textAlign: 'center',
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
    const { router } = this.props;
    const { id } = router.query;
    const url = `http://localhost:8008/api/worker/worker/${ id }/`;
    const res = await fetch(url);
    const worker = await res.json();
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
          <Typography variant="display2">
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
                defaultValue={ worker.name }
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
                type="back"
                variant="contained"
                color="primary"
                component="a"
                href="http://localhost:3000/worker"
              >
                    VOLTAR
              </Button>

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

export default withRouter(withStyles(styles)(WorkerShow));

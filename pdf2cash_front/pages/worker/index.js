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
import CreateIcon from '@material-ui/icons/Create'
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import CustomatizedTable from '../../comps/tableWorker';

const styles = theme => ({
  cell: {
    textAlign: 'center',
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[ 5 ],
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
  },
  warning: {
    textAlign: 'center',
    marginTop: 100,
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

class WorkerIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workers: [],
      open: false,
      id: 0,
    };
    this.delete = this.delete.bind(this);
    this.getWorkers = this.getWorkers.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8008/api/worker/worker/';
    const res = await fetch(url);
    const dataWorkers = await res.json();
    this.setState({
      workers: dataWorkers,
      open: false,
    });
  }

  async getWorkers() {
    const url = 'http://localhost:8008/api/worker/worker/';
    const res = await fetch(url);
    const dataWorkers = await res.json();
    this.setState({ workers: dataWorkers });
  }

  async delete() {
    const { id } = await this.state;
    const url = `http://localhost:8008/api/worker/worker/${ id }/`;
    await fetch(url, { method: 'DELETE' });
    this.closeModal();
    this.getWorkers();
  }

  openModal(id) {
    this.setState({
      open: true,
      id,
    });
  }

  closeModal() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { classes } = this.props;
    const { open, id, workers } = this.state;
    return (
        <Grid>
            <Typography variant="display2">
          Listar Funcionarios
            </Typography>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={ open }
              onClose={ this.closeModal }
            >
                <Grid style={ getModalStyle() } className={ classes.paper }>
                    <Typography variant="h6" className={ classes.cell }>
              Deseja realmete deletar esse funcionário ?
                    </Typography>
                    <Button
                      className={ classes.buttom }
                      color="primary"
                      onClick={ () => this.delete({ id }) }
                    >
              SIM
                    </Button>
                    <Button
                      className={ classes.buttom }
                      color="secondary"
                      onClick={ this.closeModal }
                    >
              NÃO
                    </Button>
                </Grid>
            </Modal>
            {
          workers.length ? (
              <CustomatizedTable>
                  {
            workers.map(worker => (
                <TableRow key={ worker.id }>
                    <TableCell className={ classes.cell }>
                        <Typography>
                            {worker.name}
                        </Typography>
                    </TableCell>
                    <TableCell className={ classes.cell }>
                        <Typography>
                            {worker.cpf}
                        </Typography>
                    </TableCell>
                    <TableCell className={ classes.cell }>
                        <Link href={ { pathname: '/worker/show', query: { id: worker.id } } }>
                            <Button>
                                <VisibilityIcon />
                            </Button>
                        </Link>
                    </TableCell>
                    <TableCell className={ classes.cell }>
                        <Link href={ { pathname: '/worker/edit', query: { id: worker.id } } }>
                            <Button>
                                <CreateIcon />
                            </Button>
                        </Link>
                    </TableCell>
                    <TableCell className={ classes.cell }>
                        <Button onClick={ () => this.openModal(worker.id) }>
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
          Não há funcionários cadastrados!
                  </Typography>
              </Grid>
          )
    }
        </Grid>
    )
  }
}

export default withStyles(styles)(WorkerIndex);

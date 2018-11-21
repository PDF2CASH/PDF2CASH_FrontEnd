
import React, { Component } from 'react';
import CustomatizedTable from '../../comps/tableWorker';
import { TableRow, TableCell, Button, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateIcon from '@material-ui/icons/Create'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link'
import Modal from '@material-ui/core/Modal';
import Authenticate  from '../auth';
import AddIcon from '@material-ui/icons/Add';
import WorkerCreate from '../../comps/createWorker'

const styles = theme => ({
  cell: {
    textAlign: 'center'
  },
  paperDelete: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
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
  warning: {
    textAlign: 'center',
    marginTop: 100,
  },
  button: {
    marginTop: 30,
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

class WorkerIndex extends Component{

  constructor(props) {
    super(props);
    this.state = {
      workers: [],
      openDelete: false,
      openCreate: false,
      id: 0,
    };
    this.delete = this.delete.bind(this);
    this.getWorkers = this.getWorkers.bind(this);
    this.openModalDelete = this.openModalDelete.bind(this);
    this.closeModalDelete = this.closeModalDelete.bind(this);
    this.openModalCreate = this.openModalCreate.bind(this);
    this.closeModalCreate = this.closeModalCreate.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8000/api/worker/worker/';
    const res = await fetch(url, {
    method: 'GET',
    headers: {
         'Content-Type': 'application/json',
         'Authorization': 'JWT ' + Authenticate.getToken()
    },
    credentials: 'omit',
  });
    const data_workers = await res.json();
    this.setState({
      workers: data_workers,
      openDelete: false,
      openCreate: false,
    });
  }

  async getWorkers() {
    const url = 'http://localhost:8000/api/worker/worker/';
    const res = await fetch(url)
    const data_workers = await res.json();
    this.setState({ workers: data_workers });
  }

  async delete(){
    const id = await this.state.id;
    const url = 'http://localhost:8000/api/worker/worker/'+ id + '/';
    const res = await fetch(url, { method:'DELETE' });
    this.closeModal();
    this.getWorkers();
  }

  openModalDelete(id) {
    this.setState({
      openDelete: true,
      id,
    });
  }

  closeModalDelete() {
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
      openDelete,
      openCreate,
      id,
      workers
    } = this.state;
    return (
      <Grid>
        <Typography variant="display2">
          Listar Funcionarios
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
          open={openDelete}
          onClose={this.closeModalDelete}
        >
          <Grid style={getModalStyle()} className={classes.paper}>
            <Typography variant='h6' className={classes.cell} >
              Deseja realmente deletar esse funcionário ?
            </Typography>
            <Button
              id = 'SIM'
              variant = "contained"
              className={classes.button}
              color='primary'
              onClick={() => this.delete(id)}
            >
              SIM
            </Button>
            <Button
              id = 'NAO'
              variant = "contained"
              className={classes.button}
              color='secondary'
              onClick={this.closeModal}
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
            < WorkerCreate />
          </Grid>
        </Modal>
        {
          workers.length ? (
        <CustomatizedTable>
          {
            workers.map(worker => (
              <TableRow key={worker.id}>
                <TableCell className={classes.cell}>
                  <Typography>
                    {worker.username}
                  </Typography>
                </TableCell>
                <TableCell className={classes.cell}>
                  <Typography>
                    {worker.cpf}
                  </Typography>
                </TableCell>
                <TableCell className={classes.cell}>
                  <Link href={{ pathname: '/worker/show', query: { id: worker.id } }}>
                    <Button>
                      <VisibilityIcon />
                    </Button>
                  </Link>
                </TableCell>
                <TableCell className={classes.cell}>
                  <Link href={{ pathname: '/worker/edit', query: { id: worker.id } }}>
                    <Button
                    id = 'EDIT'
                    >
                      <CreateIcon />
                    </Button>
                  </Link>
                </TableCell>
                <TableCell className={classes.cell}>
                  <Button onClick={() => this.openModal(worker.id)}>
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

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


const styles = theme => ({
  cell: {
    textAlign: 'center'
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
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
      open: false,
      id: 0,
    };
    this.delete = this.delete.bind(this);
    this.getWorkers = this.getWorkers.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    Authenticate.loginValidationdation();
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
      open: false,
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

  openModal(id){
    this.setState ({
      open: true,
      id: id,
    });
  }

  closeModal(){
    this.setState({
      open: false
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Typography variant="display2">
          Listar Funcionarios
        </Typography>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.closeModal}
        >
          <Grid style={getModalStyle()} className={classes.paper}>
            <Typography variant='h6' className={classes.cell} >
              Deseja realmete deletar esse funcionário ?
            </Typography>
            <Button
              id = 'SIM'
              className={classes.buttom}
              color='primary'
              onClick={() => this.delete(this.state.id)}
            >
              SIM
            </Button>
            <Button
              id = 'NAO'
              className={classes.buttom}
              color='secondary'
              onClick={this.closeModal}
            >
              NÃO
            </Button>
          </Grid>
        </Modal>
        {
          this.state.workers.length ? (
        <CustomatizedTable>
          {
            this.state.workers.map(worker => (
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

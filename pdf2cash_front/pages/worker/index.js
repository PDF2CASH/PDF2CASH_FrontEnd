
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
import WorkerCreate from '../../comps/createWorker';
import AddIcon from '@material-ui/icons/Add';
import getConfig from 'next/config';
import WorkerShow from '../../comps/showWorker';


const { publicRuntimeConfig } = getConfig();


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
  buttonCreate: {
    marginLeft: '88.5%',
    position: 'fixed',
    marginTop: '34.5%',
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

class WorkerIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {
      workers: [],
      openDelete: false,
      openCreate: false,
      openWorker: false,
      id: 0,
    };
    this.delete = this.delete.bind(this);
    this.getWorkers = this.getWorkers.bind(this);
    this.openModalDelete = this.openModalDelete.bind(this);
    this.closeModalDelete = this.closeModalDelete.bind(this);
    this.openModalCreate = this.openModalCreate.bind(this);
    this.closeModalCreate = this.closeModalCreate.bind(this);
    this.openModalWorker = this.openModalWorker.bind(this);
    this.closeModalWorker = this.closeModalWorker.bind(this);
  }

  componentDidMount() {
    Authenticate.loginValidationdation();
    this.getWorkers();
  }
  
  async getWorkers() {
    const url = publicRuntimeConfig.workerHostDomain+'/api/worker/worker/';
    const res = await fetch(url, {
    method: 'GET',
    headers: {
         'Content-Type': 'application/json',
         'Authorization': 'JWT ' + Authenticate.getToken()
    },
    credentials: 'omit',
  });
    const data = await res.json();
    this.setState({
      workers: data,
    });
  }

  async delete() {
    const { id } = await this.state;
    const url = publicRuntimeConfig.workerHostDomain+'/api/worker/worker/'+ id + '/';
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + Authenticate.getToken()
      },
      credentials: 'omit',
    });
    this.getWorkers();
    this.closeModalDelete();
  }

  openModalDelete(id){
    this.setState ({
      openDelete: true,
      id: id,
    });
  }

  openModalWorker(id){
    this.setState ({
      openWorker: true,
      id: id,
    });
  }

  closeModalWorker(){
    this.setState({
      openWorker: false
    });
  }

  closeModalDelete(){
    this.setState({
      openDelete: false
    });
  }

  openModalCreate(){
    this.setState ({
      openCreate: true,
    });
  }

  closeModalCreate(){
    this.setState({
      openCreate: false,
    });
  }


  render() {
    const { classes } = this.props;
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
          onClick={this.openModalCreate}
        >
          <AddIcon />
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-deion"
          open={this.state.openCreate}
          onClose={this.closeModalCreate}
        >
          <WorkerCreate
            close={this.closeModalCreate}
            update={this.getWorkers}
          />
        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-deion"
          open={this.state.openWorker}
          onClose={this.closeModalWorker}
        >
          <WorkerShow
            close={this.closeModalWorker}
            id={this.state.id}
          />
        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-deion"
          open={this.state.openDelete}
          onClose={this.closeModalDelete}
        >
          <Grid style={getModalStyle()} className={classes.paper}>
            <Typography variant='h6' className={classes.cell} >
              Deseja realmente deletar esse funcionário ?
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
                  
                    <Button onClick={() => this.openModalWorker(worker.id)}>
                      <VisibilityIcon />
                    </Button>
                  
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
                  <Button onClick={() => this.openModalDelete(worker.id)}>
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

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


const styles = theme => ({
  cell: {
    textAlign: 'center'
  },

  warning: {
    textAlign: 'center',
    marginTop: 100
  },
});



class WorkerIndex extends Component{

  constructor(props) {
    super(props);
    this.state = {
      workers: [],

    };
    this.delete = this.delete.bind(this);
    this.getWorkers = this.getWorkers.bind(this);

  }

  async componentDidMount() {
    const url = 'http://localhost:8000/api/worker/worker/';
    const res = await fetch(url);
    const data_workers = await res.json();
    this.setState({
      workers: data_workers,

    });
  }

  async getWorkers() {
    const url = 'http://localhost:8000/api/worker/worker/';
    const res = await fetch(url);
    const data_workers = await res.json();
    this.setState({ workers: data_workers });
  }

  async delete(id){
    const url = 'http://localhost:8000/api/worker/worker/'+ id + '/';
    const res = await fetch(url, { method:'DELETE' });

    this.getWorkers();
  }



    render() {
      const { classes } = this.props;
      return (
        <Grid>
          <Typography variant="display2">
            Listar Funcionarios
          </Typography>
          {
            this.state.workers.length ? (
          <CustomatizedTable>
            {
              this.state.workers.map(worker => (
                <TableRow key={worker.id}>
                  <TableCell className={classes.cell}>
                    <Typography>
                      {worker.name}
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
                      <Button>
                        <CreateIcon />
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <Button onClick={this.handleOpenModal}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.closeModal}
                  >
                    <div style={getModalStyle()} className={classes.paper}>
                      <Typography className={classes.cell} >
                      <h3>
                        DESEJA REALMENTE DELETAR ESSE FUNCIONÁRIO ?
                      </h3>
                        <Button color='primary'>
                          <h3>
                          SIM
                          </h3>
                        </Button>
                        <Button color='secondary'>
                        <h3>
                          NÃO
                        </h3>
                        </Button>
                      </Typography>
                    </div>
                  </Modal>
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

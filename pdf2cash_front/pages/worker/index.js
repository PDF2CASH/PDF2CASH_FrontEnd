import React, { Component } from 'react';
import CustomatizedTable from '../../comps/tableWorker';
import { TableRow, TableCell, Button, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link'


const styles = theme => ({
  cell: {
    textAlign: 'center'
  }
});

class WorkerIndex extends Component{

  constructor(props) {
    super(props);
    this.state = {
      workers: []
    };
    this.delete = this.delete.bind(this);
    this.getWorkers = this.getWorkers.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8000/api/worker/worker/';
    const res = await fetch(url);
    const data_workers = await res.json();
    this.setState({ workers: data_workers });
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
      console.log(this.state.workers);

      return (
        <Grid>
          <Typography variant="display2">
            Listar Funcionarios
          </Typography>
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
                    <Button onClick={() => this.delete(worker.id)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </CustomatizedTable>
        </Grid>
      );
    }
}

export default withStyles(styles)(WorkerIndex);

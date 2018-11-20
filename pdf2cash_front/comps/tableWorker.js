import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  cell: {
    textAlign: 'center',
  },
});

function SimpleTable(props) {
  const { classes, children } = props;

  return (
      <Paper className={ classes.root }>
          <Table className={ classes.table }>
              <TableHead>
                  <TableRow>
                      <TableCell className={ classes.cell }>Username</TableCell>
                      <TableCell className={ classes.cell }>CPF</TableCell>
                      <TableCell className={ classes.cell }>Vizualizar</TableCell>
                      <TableCell className={ classes.cell }>Editar</TableCell>
                      <TableCell className={ classes.cell }>Excluir</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  { children }
              </TableBody>
          </Table>
      </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);

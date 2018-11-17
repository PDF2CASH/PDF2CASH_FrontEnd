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
    maxWidth: '90%',
    maxWeight: '90%',
    overflowX: 'auto',
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
                      <TableCell className={ classes.cell }>Data</TableCell>
                      <TableCell className={ classes.cell }>Chave de acesso</TableCell>
                      <TableCell className={ classes.cell }>Empresa</TableCell>
                      <TableCell className={ classes.cell }>CNPJ</TableCell>
                      <TableCell className={ classes.cell }>Valor</TableCell>
                      <TableCell className={ classes.cell }>Vizualizar</TableCell>
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

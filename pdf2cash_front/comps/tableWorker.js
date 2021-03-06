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

const CustomTableCell = withStyles(theme => ({
  head: {
    'background-color': '#3f51b5',
    color: theme.palette.common.white,
    fontSize: 15,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflow: 'auto',
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
                      <CustomTableCell style={{ width: '35%', textAlign: 'center' }}>Username</CustomTableCell>
                      <CustomTableCell style={{ width: '35%', textAlign: 'center' }}>CPF</CustomTableCell>
                      <CustomTableCell style={{ width: '10%', textAlign: 'center' }}>Visualizar</CustomTableCell>
                      <CustomTableCell style={{ width: '10%', textAlign: 'center' }}>Editar</CustomTableCell>
                      <CustomTableCell style={{ width: '10%', textAlign: 'center' }}>Excluir</CustomTableCell>
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

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
    'max-width': '93%',
    'max-weight': '93%',
  },
  table: {
    'max-width': '10%',
    'max-weight': '10%',
    overflowX: 'auto',
  },
});

function SimpleTable(props) {
  const { classes, children } = props;

  return (
      <Paper className={ classes.root }>
          <Table className={ classes.table }>
              <TableHead>
                  <TableRow>
                      <CustomTableCell style={{ textAlign: 'center' }}>Data</CustomTableCell>
                      <CustomTableCell style={{ textAlign: 'center' }}>Chave de acesso</CustomTableCell>
                      <CustomTableCell style={{ textAlign: 'center' }}>Empresa</CustomTableCell>
                      <CustomTableCell style={{ textAlign: 'center' }}>Valor</CustomTableCell>
                      <CustomTableCell style={{ textAlign: 'center' }}>Vizualizar</CustomTableCell>
                      <CustomTableCell style={{ textAlign: 'center' }}>Excluir</CustomTableCell>
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

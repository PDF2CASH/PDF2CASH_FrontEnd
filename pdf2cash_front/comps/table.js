import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import IconButton from '@material-ui/core/IconButton';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

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
  const { classes } = props;

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
                  {props.children}
              </TableBody>
          </Table>
      </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);

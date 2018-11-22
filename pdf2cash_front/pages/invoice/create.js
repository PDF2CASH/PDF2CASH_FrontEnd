import React, { Component } from 'react';
import {
  Button, Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Authenticate  from '../auth';
import { FilePond, File, registerPlugin } from 'react-filepond';
//import '../../comps/dist/filepond.min.css';

const styles = theme => ({
  input: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
    display: 'none',
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    'max-width': '30%',
    'max-weight': '100%',
    marginLeft: '32%',
    marginTop: '10%',
  },
  grid: {
    margin: '5%',
  },
  button: {
    marginTop: '10%',
  },
  buttonSend: {
    marginLeft: '85%',
    marginTop: '10%',
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class InvoiceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    }
    this.setFile = this.setFile.bind(this);
    this.sendForm = this.sendForm.bind(this);
    this.sendFile = this.sendFile.bind(this);
  }

  setFile(event) {
    this.setState({ file: event.target.files[ 0 ] });
  }

  async sendFile(data){
    console.log('BBBBBBBBBBBBBBB');
    Authenticate.loginValidationdation();
    const A = await fetch(
      'http://localhost:8008/api/invoice/invoice/', 
      {
        method: 'POST',
        headers: {
           'Authorization': 'JWT ' + Authenticate.getToken()
        },
        credentials: 'omit',
        body: data
      })
      console.log(A);
  }
  
  render() {
    const { classes } = this.props;
    console.log(this.state.files);
    return (
        <div>
            <Paper className={ classes.root } elevation={ 5 }>
                <Typography variant="h4" color="inherit" className={ classes.grow }>
          Criar Nota Fiscal
                </Typography>
                <br />
                <br />
                <form onSubmit={this.sendForm}>
                <FilePond allowMultiple={true}
                          className={ classes.root }
                          onupdatefiles={(fileItems) => {
                              // Set current file objects to this.state
                              this.setState({
                                  files: fileItems.map(fileItem => fileItem.file)
                              });
                          }}>

                    {/* Update current files  */}
                    {this.state.files.map(file => (
                        <File key={file} src={file} origin="local" />
                    ))}
                    
                </FilePond>
                <Button type='submit'>
                ENVIAR
                </Button>
                </form>
            </Paper>
        </div>
    )
  }
}

export default withStyles(styles)(InvoiceCreate);

import React, { Component } from 'react';
import {
  Button,
  Typography,
  Paper,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FilePond, File } from 'react-filepond';
//import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import Authenticate  from '../pages/auth';
import './dist/filepond.css'

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
    'max-width': '100%',
    'max-height': '100%',
    border: '0.5px solid black',
  },
  pond: {
    marginBottom: 55,
  },
  grid: {
    margin: '5%',
  },
  button: {
    marginBottom: '10%',
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class InvoiceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    }
    this.sendForm = this.sendForm.bind(this);
    this.sendFile = this.sendFile.bind(this);
  }

  sendForm(event) {
    event.preventDefault();
    const { files } = this.state;
    var data = new FormData();
    for(let i = 0; i<files.length; i+=1){
      data.append('file', files[i]);
      this.sendFile(data);
      data = new FormData();
    }
    this.props.close();
  }

  async sendFile(data){
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
      
  }
  

  render() {
    const { classes } = this.props;
    return (
        <Grid>
            <Paper elevation={ 5 } className={ classes.root }>
              <Typography variant="h4" color="inherit">
                Criar Nota Fiscal
              </Typography>
              <br />
              <br />
              <form onSubmit={this.sendForm}>
                <Button 
                  type='submit' 
                  color='primary'
                  variant='contained'
                  className={ classes.button }
                >
                  SALVAR
                </Button>
                  <FilePond
                    className={ classes.pond }
                    allowMultiple={ true }
                    maxTotalFileSize={ '7MB' }
                    labelMaxTotalFileSizeExceeded={ 'Máximo de 7MB excedido' }
                    onupdatefiles={(fileItems) => {
                      this.setState({
                        files: fileItems.map(fileItem => fileItem.file)
                      });
                    }}>
                    {this.state.files.map(file => (
                      <File key={file} src={file} origin="local" />
                    ))}
                    </FilePond>
              </form>
            </Paper>
        </Grid>
    )
  }
}

export default withStyles(styles)(InvoiceCreate);

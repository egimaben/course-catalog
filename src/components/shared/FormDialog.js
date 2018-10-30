import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      data: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    let keys = Object.keys(nextProps.data);
    let initialData = {};
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      initialData[key] = nextProps.data[key].value;
    }
    this.setState({
      data: initialData
    });
  }
  handleChange = name => event => {
    let newValue = event.target.value;
    this.setState((prevState) => {
      let prevData = prevState.data;
      prevData[name] = newValue;
      return {
        data: prevData
      }
    });
  };
  render() {
    const {open,handleClose,title,data,save} = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit the fields below
            </DialogContentText>
            {Object.keys(data).map((key, index) => {
              const valueObject = data[key];
              switch (valueObject.type) {
                case 'boolean': return (
                  <TextField
                    key={index}
                    autoFocus
                    margin="dense"
                    id={key}
                    label={valueObject.label}
                    onChange={this.handleChange(key)}
                    type={valueObject.type}
                    defaultValue={valueObject.value === true ? 'YES' : 'NO'}
                    fullWidth
                    InputProps={{
                      readOnly: valueObject.readOnly ? true : false,
                    }}
                  />);
                case 'text': default: return (

                  <TextField
                    key={index}
                    autoFocus
                    margin="dense"
                    id={key}
                    label={valueObject.label}
                    onChange={this.handleChange(key)}
                    type={valueObject.type}
                    defaultValue={valueObject.value}
                    fullWidth
                    InputProps={{
                      readOnly: valueObject.readOnly ? true : false,
                    }}
                  />);
              }
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => save(this.state.data)} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
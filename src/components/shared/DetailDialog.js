import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

const detailDialogStyles = theme => ({
  detailRow: {
    display: 'flex',
  },
  detailField: {
    textAlign: 'right',
    width: '50%',
    padding: '5px',
    verticalAlign: 'top',
    marginTtop: '10px',
  },
  detailValue: {
    textAlign: 'left',
    // width: '50%',
    verticalAlign: 'bottom',
  },
  detailDialogContent: {
    position: 'relative',
    width: '400px'
  }
});
class DetailDialog extends React.Component {
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
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent className={classes.detailDialogContent}>
            <DialogContentText>
              Record Details
            </DialogContentText>
            {Object.keys(this.props.data).map((key, index) => {
              let valueObject = this.props.data[key];
              return <div key={index} className={classes.detailRow}>
                <div className={classes.detailField}>{valueObject.label + ':'}</div>
                <div className={classes.detailValue}>{valueObject.value}</div>
              </div>
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(detailDialogStyles)(DetailDialog);
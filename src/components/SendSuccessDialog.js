import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class SendSuccessDialog extends React.Component {
  constructor(props) {
		super(props);
		this.setState.bind(this);
		this.state = {
			open: false,
		};
	}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    console.log("oldProps.isOpen: "+oldProps.isOpen);
    console.log("newProps.isOpen: "+newProps.isOpen);
    if(oldProps.isOpen !== newProps.isOpen && newProps.isOpen === true) {
      this.setState({ open: true });
    }
  }

  render() {
    console.log("state open: "+this.state.open);
    if (this.state.open === true) {
      return (
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"成功"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                気になるリストに追加しました
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary" autoFocus>
                ok
              </Button>
          </DialogActions>
          </Dialog>
      </div>
    );
    
    } else {
      return (null);
    }
  }
}

export default SendSuccessDialog;
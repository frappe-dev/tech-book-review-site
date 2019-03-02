import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
    textField: {
        width: 350,
    },
});

class FreeWordInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.state = {
            selectedValue: ''
        };
    }

    handleChangeText(event) {
        this.setState({ "selectedValue": event.target.value });
        this.props.updateState({ [event.target.name]: event.target.value });
    }

    keyPress(event) {
        this.setState({ "selectedValue": event.target.value });
        this.props.updateState({ [event.target.name]: event.target.value });
        // EnterKeyでページが更新されるのを防ぐ
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <TextField
                className={classes.textField}
                name={this.props.reviewKeyName}
                value={this.state.selectedValue}
                onChange={this.handleChangeText}
                onKeyPress={this.keyPress}
                label={this.props.label}
                margin="normal"
            />
        )
    }
}

export default withStyles(styles)(FreeWordInput);
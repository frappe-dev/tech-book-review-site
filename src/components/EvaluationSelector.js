import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = ({
    selector: {
        width: 350,
    },
});

class EvaluationSelector extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.state = {
            selectedValue: ""
        };
    }

    handleChangeValue(event) {
        this.setState({ "selectedValue": event.target.value });
        this.props.updateState({ [event.target.name]: event.target.value });
    }

    render() {
        const { classes } = this.props;
        return (
            <FormControl className={classes.selector}>
                <InputLabel htmlFor="selector">{this.props.label}</InputLabel>
                <Select
                    value={this.state.selectedValue}
                    onChange={this.handleChangeValue}
                    name={this.props.reviewKeyName}
                >
                    <MenuItem value={"初級者"}>初級者</MenuItem>
                    <MenuItem value={"中級者"}>中級者</MenuItem>
                    <MenuItem value={"上級者"}>上級者</MenuItem>
                </Select >
            </FormControl >
        );
    }
}

export default withStyles(styles)(EvaluationSelector);

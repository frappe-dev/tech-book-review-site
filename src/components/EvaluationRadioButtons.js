import React from 'react';
import Radio from '@material-ui/core/Radio';

export default class EvaluationRadioButtons extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeRadio = this.handleChangeRadio.bind(this);
        this.state = {
            selectedValue: 0
        };
    }

    handleChangeRadio(event) {
        this.setState({ "selectedValue": Number(event.target.value) });
        this.props.updateState({ [event.target.name]: Number(event.target.value) });
    }

    render() {
        return (
            <label>{this.props.title}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                1<Radio
                    checked={this.state.selectedValue === 1}
                    onChange={this.handleChangeRadio}
                    value={1}
                    name={this.props.reviewKeyName}
                    aria-label="A"
                    disabled={this.props.disabled}
                />
                2<Radio
                    checked={this.state.selectedValue === 2}
                    onChange={this.handleChangeRadio}
                    value={2}
                    name={this.props.reviewKeyName}
                    aria-label="B"
                    disabled={this.props.disabled}
                />
                3<Radio
                    checked={this.state.selectedValue === 3}
                    onChange={this.handleChangeRadio}
                    value={3}
                    name={this.props.reviewKeyName}
                    aria-label="C"
                    disabled={this.props.disabled}
                />
                4<Radio
                    checked={this.state.selectedValue === 4}
                    onChange={this.handleChangeRadio}
                    value={4}
                    name={this.props.reviewKeyName}
                    aria-label="D"
                    disabled={this.props.disabled}
                />
                5<Radio
                    checked={this.state.selectedValue === 5}
                    onChange={this.handleChangeRadio}
                    value={5}
                    name={this.props.reviewKeyName}
                    aria-label="E"
                    disabled={this.props.disabled}
                />
            </label>
        )
    }
}

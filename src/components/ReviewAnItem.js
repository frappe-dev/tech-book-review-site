import React from 'react';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewItem: ''
        };

        this.handleChangeRadio = this.handleChangeRadio.bind(this);
    }

    handleChangeRadio(event) {
        this.setState({ [event.target.name]: event.target.value });
        this.props.updateState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <form>
            <label>{this.props.reviewItem}
                <input type="radio" name={this.props.reviewItem} onChange={this.handleChangeRadio} value={1} />1
                <input type="radio" name={this.props.reviewItem} onChange={this.handleChangeRadio} value={2} />2
                <input type="radio" name={this.props.reviewItem} onChange={this.handleChangeRadio} value={3} />3
                <input type="radio" name={this.props.reviewItem} onChange={this.handleChangeRadio} value={4} />4
                <input type="radio" name={this.props.reviewItem} onChange={this.handleChangeRadio} value={5} />5
            </label>
            </form>
        )
    }
}

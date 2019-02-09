import React from 'react';

export default class ReviewItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeRadio = this.handleChangeRadio.bind(this);
    }

    handleChangeRadio(event) {
        this.props.updateState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
          <label>{this.props.title}
              <input type="radio" name={this.props.reviewKeyName} onChange={this.handleChangeRadio} value={1} />1
              <input type="radio" name={this.props.reviewKeyName} onChange={this.handleChangeRadio} value={2} />2
              <input type="radio" name={this.props.reviewKeyName} onChange={this.handleChangeRadio} value={3} />3
              <input type="radio" name={this.props.reviewKeyName} onChange={this.handleChangeRadio} value={4} />4
              <input type="radio" name={this.props.reviewKeyName} onChange={this.handleChangeRadio} value={5} />5
          </label>
        )
    }
}

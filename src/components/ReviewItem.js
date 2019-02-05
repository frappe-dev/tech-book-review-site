import React from 'react';

export default class ReviewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewPoint: ''
        };

        this.handleChangeRadio = this.handleChangeRadio.bind(this);
    }

    handleChangeRadio(event) {
        this.setState({ [event.target.name]: event.target.value });
        this.props.updateState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
          <label>読みやすさ
              <input type="radio" name="reviewPoint" onChange={this.handleChangeRadio} value={1} />1
              <input type="radio" name="reviewPoint" onChange={this.handleChangeRadio} value={2} />2
              <input type="radio" name="reviewPoint" onChange={this.handleChangeRadio} value={3} />3
              <input type="radio" name="reviewPoint" onChange={this.handleChangeRadio} value={4} />4
              <input type="radio" name="reviewPoint" onChange={this.handleChangeRadio} value={5} />5
          </label>
        )
    }
}

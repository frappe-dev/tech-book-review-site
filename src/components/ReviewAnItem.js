import React from 'react';

export default class ReviewAnItem extends React.Component {
  const { reviewItem } = props;

  constructor(props) {
    super(props);
    this.state = {
      reviewItem: ''
    };
    this.handleChangeRadio = this.handleChangeRadio.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChangeRadio(event) {
      this.setState({ [event.target.name]: event.target.value });
  }

  render() {
      return (
          <form>
              <label>reviewItem
                  <input type="radio" name=reviewItem onChange={this.handleChangeRadio} value=1 />1
                  <input type="radio" name=reviewItem onChange={this.handleChangeRadio} value=2 />2
                  <input type="radio" name=reviewItem onChange={this.handleChangeRadio} value=3 />3
              </label>
          </form>
      )
  }
}

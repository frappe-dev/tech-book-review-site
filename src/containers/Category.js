import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Category extends Component {
    render() {
        return (
            <div>
                <h2>this is category page</h2>
            </div>
        );
    }
}
export default withRouter(Category);
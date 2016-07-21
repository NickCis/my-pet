import React, { Component, PropTypes } from 'react'

export default class Marketing extends Component {
  render() {
    return (
      <div className="container marketing">
        <div className="row">
          { this.props.children }
        </div>
      </div>
    );
  }
}

import React, { Component, PropTypes } from 'react'

export default class Panel extends Component {
  static get propTypes() {
    return {
      title: PropTypes.string
    };
  }

  renderTitle() {
    if(this.props.title)
      return (
        <div className="panel-heading">
          <h3 className="panel-title">{ this.props.title }</h3>
        </div>
      );
  }

  containerClassName() {
    let className = 'panel panel-default';
    if(this.props.className)
      className += ' ' + this.props.className;
    return className;
  }

  render() {
    return (
      <div className={ this.containerClassName() }>
        { this.renderTitle() }
        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}


import React, { Component, PropTypes } from 'react';

export default class LoadingButton extends Component {
  static get propTypes() {
    return {
      isLoading: PropTypes.bool,
      disabled: PropTypes.bool,
      className: PropTypes.string,
      style: PropTypes.object,
      type: PropTypes.string
    };
  }

  renderLoading() {
    if(this.props.isLoading)
      return (
        <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate" />
      );
  }

  render() {
    const { type, className, disabled, style, children } = this.props;
    return (
        <button type={ type } className={ className } disabled={ disabled }>
          { this.renderLoading() }
          { children }
        </button>
    );
  }
}

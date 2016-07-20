import React, { Component, PropTypes } from 'react'

export default class Panel extends Component {
  static get defaultProps() {
    return {
      wrapInBody: true
    };
  }

  static get propTypes() {
    return {
      title: PropTypes.string,
      wrapInBody: PropTypes.bool,
      loading: PropTypes.bool,
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

  renderBody() {
    if(this.props.loading)
      return (
        <div className="panel-body">
          <p style={{ width: '100%' }} className="text-center">
            <span style={{ fontSize: '22px' }} className="glyphicon glyphicon-refresh glyphicon-refresh-animate" />
          </p>
        </div>
      );

    if(this.props.wrapInBody)
      return (
        <div className="panel-body">
          { this.props.children }
        </div>
      );

    return this.props.children;
  }

  render() {
    return (
      <div className={ this.containerClassName() }>
        { this.renderTitle() }
        { this.renderBody() }
      </div>
    );
  }
}


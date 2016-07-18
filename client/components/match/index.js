import React, { Component, PropTypes } from 'react';

import Stack from './stack';

export default class Match extends Component {

  static get propTypes() {
    return {
      className: PropTypes.string,
      onLike: PropTypes.func
    }
  }

  getLikeHandler(like) {
    return e => {
      if(e)
        e.preventDefault();

      if(this.props.onLike)
        this.props.onLike({result: like});
    };
  }

  getThrowOutHandler() {
    return e => {
      if(this.props.onLike)
        this.props.onLike({result: e.throwDirection == 1});
    };
  }

  render() {
    const { children, className } = this.props;
    return (
      <div className={ className }>
        <div className="row">
          <Stack className='stack col-xs-12 col-sm-offset-4 col-sm-4' onThrowOut={ this.getThrowOutHandler() }>
            { children }
          </Stack>
        </div>
        <div className="row">
          <div className="col-xs-6 col-sm-6">
            <a className="matching-button pull-right" onClick={ this.getLikeHandler(false) }>
              <span className="glyphicon glyphicon-remove" />
            </a>
          </div>
          <div className="col-xs-6 col-sm-6">
            <a className="matching-button pull-left" onClick={ this.getLikeHandler(true) }>
              <span className="glyphicon glyphicon-ok" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

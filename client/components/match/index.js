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

  getDragMoveHandler() {
    return ev => {
      let showEle = '.glyphicon-ok',
        hideEle = '.glyphicon-remove';

      if(ev.throwDirection <= -1){
        showEle = '.glyphicon-remove';
        hideEle = '.glyphicon-ok';
      }

      const show = ev.target.querySelector(showEle);
      show.classList.remove('hidden', 'invisible');
      show.style.opacity = ev.throwOutConfidence;

      ev.target.querySelector(hideEle)
        .classList.add('hidden', 'invisible');
    };
  };

  getDragEndHandler() {
    return ev => {
      ['.glyphicon-ok', '.glyphicon-remove'].forEach(e => {
        ev.target.querySelector(e)
          .classList.add('hidden', 'invisible');
      });
    }
  };

  getThrowOutHandler() {
    return e => {
      // XXX: por algun problema raro, los eventos se estan llamando muchas veces
      const petId = e.target.getAttribute('data-id');

      if(this.props.onLike)
        this.props.onLike({result: e.throwDirection == 1, id: petId});
    };
  }

  render() {
    const { children, className } = this.props;
    return (
      <div className={ className }>
        <div className="row">
          <Stack className='stack col-xs-12 col-sm-offset-4 col-sm-4' onThrowOut={ this.getThrowOutHandler() } onDragMove={ this.getDragMoveHandler() } onDragEnd={ this.getDragEndHandler() }>
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

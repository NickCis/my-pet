import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import * as Swing from 'swing';

export default class Stack extends Component {
  static get propTypes() {
    return {
      className: PropTypes.string,
      onThrowOut: PropTypes.func,
      onDragMove: PropTypes.func,
      onDragEnd: PropTypes.func
    }
  }

  constructor(props) {
    super(props);
    [ 'onThrowOut', 'onDragMove', 'onDragEnd' ].forEach(m => {
      this[m] = props[m];
    });
    this.initSwing();
  }

  componentDidMount() {
    this.populateSwing();
  }

  componentDidUpdate() {
    this.populateSwing();
  }

  componentWillUnmount() {
    console.log('Delete swing');
    [ 'onThrowOut', 'onDragMove', 'onDragEnd' ].forEach(m => {
      this[m] = () => {};
    });
  }

  initSwing() {
    console.log('initswing');
    const stack = Swing.Stack();

    stack.on('throwout', e => {
      console.log(e);
      if(this.onThrowOut)
        this.onThrowOut(e);
    });

    stack.on('dragmove', e => {
      if(this.onDragMove)
        this.onDragMove(e);
    });
    stack.on('dragend', e => {
      if(this.onDragEnd)
        this.onDragEnd(e);
    });

    this.stack = stack;
  }

  populateSwing() {
    const ul = ReactDOM.findDOMNode(this);
    const stack = this.stack;

    this.cards = [].map.call(ul.children, targetElement => {
      if(!stack.getCard(targetElement))
        stack.createCard(targetElement);
    });
  }

  render() {
    const { className, children } = this.props;
    return (
      <ul className={ className }>
        { children }
      </ul>
    );
  }
}

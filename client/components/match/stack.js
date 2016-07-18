import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import * as Swing from 'swing';

export default class Stack extends Component {
  static get propTypes() {
    return {
      className: PropTypes.string,
      onThrowOut: PropTypes.func
    }
  }

  componentDidMount() {
    this.initSwing();
  }

  componentDidUpdate() {
    this.initSwing();
  }

  initSwing() {
    const ul = ReactDOM.findDOMNode(this);
    console.log(Swing);
    const stack = Swing.Stack();

    [].slice.call(ul.children).forEach(targetElement => {
      stack.createCard(targetElement);
    });

    stack.on('throwout', e => {
      if(this.props.onThrowOut)
        this.props.onThrowOut(e);
      // const direction = e.throwDirection == 1 ? 'right' : 'left';
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

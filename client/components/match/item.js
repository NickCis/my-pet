import React, { Component, PropTypes } from 'react';

export default class Item extends Component {
  static get propTypes() {
    return {
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    };
  }

  render() {
    const { img, name } = this.props;
    return (
      <li className='in-deck' data-id={ this.props['data-id'] } >
         <div className="panel panel-default">
           <div className="panel-body">
             <img src={ img } />
           </div>
           <div className="panel-footer">
             <p className="text-center">{ name }</p>
           </div>
         </div>
      </li>
    );
  }
}

import React, { Component, PropTypes } from 'react'

export default class CarouselItem extends Component {
  static get propTypes() {
    return {
      className: PropTypes.string
    };
  }

  render() {
    const { children, className } = this.props;
    return (
      <div className={ 'item ' +  (className || '') }>
        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="First slide" />
        <div className="container">
          <div className="carousel-caption">
            <div className="container-center">
              <div>
                { children }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

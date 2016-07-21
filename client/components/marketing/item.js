import React, { Component, PropTypes } from 'react'

export default class MarketingItem extends Component {
  static get defaultProps() {
    return {
      img: "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
    };
  }
  static get propTypes() {
    return {
      title: PropTypes.string.isRequired,
      img: PropTypes.string,
      onClick: PropTypes.func
    }
  }
  render() {
    const { title, onClick, children, img } = this.props;
    return (
      <div className="col-lg-4">
        <img className="img-circle" src={ img } alt="Generic placeholder image" width="140" height="140" />
        <h2>{ title } </h2>
        { children }
        <p><a className="btn btn-default" href="#" role="button" onClick={ onClick }>Ver detalles &raquo;</a></p>
      </div>
    );
  }

}

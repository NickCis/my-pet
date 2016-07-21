import React, { Component, PropTypes } from 'react'

export default class MarketingItem extends Component {
  static get propTypes() {
    return {
      title: PropTypes.string.isRequired,
      onClick: PropTypes.func
    }
  }
  render() {
    const { title, onClick, children } = this.props;
    return (
      <div className="col-lg-4">
        <img className="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140" />
        <h2>{ title } </h2>
        { children }
        <p><a className="btn btn-default" href="#" role="button" onClick={ onClick }>Ver detalles &raquo;</a></p>
      </div>
    );
  }

}

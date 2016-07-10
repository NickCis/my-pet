import React, { Component, PropTypes } from 'react';

export default class Navbar extends Component {
  static get propTypes() {
    return {
      onChangePage: PropTypes.func.isRequired
    };
  }

  getChangePageHandler(name) {
    return ev => {
      ev.preventDefault();
      this.props.onChangePage(name);
    };
  }

  renderNavbarRight() {
    return (
      <div className="nav navbar-nav navbar-right">
        <button type="button" className="btn btn-default navbar-btn" onClick={ this.getChangePageHandler('Login') }>Conectate</button>
        <button type="button" className="btn btn-success navbar-btn" onClick={ this.getChangePageHandler('Register') }>Registrate</button>
      </div>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="#">
              <img alt="My Pet" id="logo" src="/img/logo.png" />
            </a>
          </div>
          <div className="navbar-collapse collapse">
            <form className="navbar-form navbar-left" role="search">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Buscar" />
              </div>
            </form>
            { this.renderNavbarRight() }
          </div>
        </div>
      </nav>
    );
  }
}

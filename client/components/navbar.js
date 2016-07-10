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
      <ul className="nav navbar-nav navbar-right">
        <li className="visible-xs"><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" onClick={ this.getChangePageHandler('Login') }>Conectate</a></li>
        <li className="hidden-xs"><button type="button" className="btn btn-default navbar-btn" onClick={ this.getChangePageHandler('Login') }>Conectate</button></li>

        <li className="visible-xs"><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" onClick={ this.getChangePageHandler('Register') }>Registrate</a></li>
        <li className="hidden-xs"><button type="button" className="btn btn-success navbar-btn" onClick={ this.getChangePageHandler('Register') }>Registrate</button></li>
      </ul>
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
          <div id="navbar" className="navbar-collapse collapse">
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

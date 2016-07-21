import React, { Component, PropTypes } from 'react';

export default class Navbar extends Component {
  static get propTypes() {
    return {
      onChangePage: PropTypes.func.isRequired,
      onLogout: PropTypes.func.isRequired,
      username: PropTypes.string
    };
  }

  getChangePageHandler(name) {
    return ev => {
      ev.preventDefault();
      this.props.onChangePage(name);
    };
  }

  renderNavbarRight() {
    const { username } = this.props;
    if(username)
      return (
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{ username }<span className="caret" /></a>
              <ul className="dropdown-menu">
              <li><a data-toggle="collapse" data-target=".navbar-collapse.in" href="#" onClick={ this.getChangePageHandler('Profile/profile') }>Perfil</a></li>
              <li><a data-toggle="collapse" data-target=".navbar-collapse.in" href="#" onClick={ this.getChangePageHandler('Profile/pet') }>Mascotas</a></li>
              <li><a data-toggle="collapse" data-target=".navbar-collapse.in" href="#">Venta</a></li>
              <li><a data-toggle="collapse" data-target=".navbar-collapse.in" href="#" onClick={ this.getChangePageHandler('Matching') }>Matching</a></li>
              <li><a data-toggle="collapse" data-target=".navbar-collapse.in" href="#" onClick={ this.getChangePageHandler('Match') }>Notificaciones </a></li>
              <li><a data-toggle="collapse" data-target=".navbar-collapse.in" href="#" onClick={ this.getChangePageHandler('NewProduct') }>Venta</a></li>
              <li><a data-toggle="collapse" data-target=".navbar-collapse.in" href="#" onClick={ this.getChangePageHandler('ProductsList') }>Comprar</a></li>
              <li role="separator" className="divider"></li>
              <li><a data-toggle="collapse" data-target=".navbar-collapse.in" href="#" onClick={ this.props.onLogout }>Desconectarse</a></li>
              </ul>
            </li>
          </ul>
      );

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
            <a className="navbar-brand" href="#" onClick={ this.getChangePageHandler('Home') }>
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

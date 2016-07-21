import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changePageIfNeeded } from '../../actions';
import { doRegisterIfNeeded, invalidateRegister } from '../../actions/register';

class Register extends Component {
  componentWillUnmount() {
    this.props.invalidateRegister()
  }

  renderError() {
    const { registerError } = this.props;

    if(registerError)
      return (
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" />
          <span className="sr-only">Error:</span>
          { registerError.description }
        </div>
      );
  }

  renderInnerButton() {
    if(this.props.isFetching)
      return (
        <span>
          <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate" />  Cargando...
        </span>
      );

    return "Registrate";
  }

  getChangePageHandler(page) {
    const { onChangePage } = this.props;
    return ev => {
      ev.preventDefault();
      onChangePage(page);
    };
  }

  renderSuccess() {
    return (
      <div>
        <h2 className="form-signin-heading">Registrate</h2>
        <p>Te registraste correctamente! <a href="#" onClick={ this.getChangePageHandler('Login') }>Conectate!</a></p>
      </div>
    );

  }

  render() {
    const onSubmit = ev => {
      ev.preventDefault();
      const { registerUsername, registerPassword, registerName, registerSurname, registerEmail, registerTel } = ev.target;
      this.props.onRegister({
        username: registerUsername.value,
        password: registerPassword.value,
        name: registerName.value,
        surname: registerSurname.value,
        email: registerEmail.value,
        tel: registerTel.value
      });
    };

    const { isFetching, success } = this.props;

    if(success)
      return this.renderSuccess();

    return (
      <form onSubmit={ onSubmit }>
        <h2 className="form-signin-heading">Registrate</h2>
        { this.renderError() }
        <div className="form-group">
          <label htmlFor="registerUsername">Usuario</label>
          <input type="text" id="registerUsername" className="form-control" placeholder="Nombre de Usuario" required autoFocus disabled={ isFetching } required />
          <p className="help-block">M&aacute;s de 6 car&aacute;cteres</p>
        </div>
        <div className="form-group">
          <label htmlFor="registerPassword">Contrase&ntilde;a</label>
          <input type="password" id="registerPassword" className="form-control" placeholder="Password" required disabled={ isFetching } required pattern=".{5,}" title="Minimo 5 caracteres" />
          <p className="help-block">M&aacute;s de 6 car&aacute;cteres</p>
        </div>
        <div className="form-group">
          <label htmlFor="registerName">Nombre</label>
          <input type="text" id="registerName" className="form-control" placeholder="Nombre" required disabled={ isFetching } required />
        </div>
        <div className="form-group">
          <label htmlFor="registerSurname">Apellido</label>
          <input type="text" id="registerSurname" className="form-control" placeholder="Apellido" required disabled={ isFetching } required />
        </div>
        <div className="form-group">
          <label htmlFor="registerEmail">E-Mail</label>
          <input type="email" id="registerEmail" className="form-control" placeholder="Email" required disabled={ isFetching } required />
        </div>
        <div className="form-group">
          <label htmlFor="registerTel">Tel&eacute;fono</label>
          <input type="text" id="registerTel" className="form-control" placeholder="Tel&eacute;fono" required disabled={ isFetching } required />
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={ isFetching }>
          { this.renderInnerButton() }
        </button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    success: state.user.success,
    registerError: state.user.error,
    isFetching: state.user.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (username, password) => dispatch(doRegisterIfNeeded(username, password)),
    onChangePage: page => dispatch(changePageIfNeeded(page)),
    invalidateRegister: () => dispatch(invalidateRegister())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register)

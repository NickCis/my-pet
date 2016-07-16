import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changePageIfNeeded } from '../../actions';
import { doRegisterIfNeeded } from '../../actions/register';

class Register extends Component {
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
      this.props.onRegister(ev.target.registerUsername.value, ev.target.registerPassword.value);
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
          <input type="text" id="registerUsername" className="form-control" placeholder="Nombre de Usuario" required autoFocus disabled={ isFetching } />
          <p className="help-block">M&aacute;s de 6 car&aacute;cteres</p>
        </div>
        <div className="form-group">
          <label htmlFor="registerPassword">Contrase&ntilde;a</label>
          <input type="password" id="registerPassword" className="form-control" placeholder="Password" required disabled={ isFetching } />
          <p className="help-block">M&aacute;s de 6 car&aacute;cteres</p>
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
    onChangePage: page => dispatch(changePageIfNeeded(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register)

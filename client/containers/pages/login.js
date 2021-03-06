import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import LoadingButton from '../../components/loading_button';

import { changePageIfNeeded } from '../../actions';
import { doLoginIfNeeded, invalidateLogin } from '../../actions/login';

class Login extends Component {
  componentWillUnmount() {
    this.props.invalidateLogin()
  }

  renderError() {
    const { loginError } = this.props;

    if(loginError)
      return (
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" />
          <span className="sr-only">Error:</span>
          { loginError.description }
        </div>
      );
  }

  getRegisterHandler() {
    return ev => {
      ev.preventDefault();
      this.props.onChangePage('Register');
    };
  }

  render() {
    const onSubmit = ev => {
      ev.preventDefault();
      this.props.onLogin(ev.target.loginUsername.value, ev.target.loginPassword.value);
    };

    const { isFetching } = this.props;

    return (
      <form className="form-signin" onSubmit={ onSubmit }>
        <h2 className="form-signin-heading">Conectate</h2>
        <div className="form-group">
          <label htmlFor="loginUsername" className="sr-only">Usuario</label>
          <input type="text" id="loginUsername" className="form-control" placeholder="Usuario" required autoFocus disabled={ isFetching } />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword" className="sr-only">Contrase&ntilde;a</label>
          <input type="password" id="loginPassword" className="form-control" placeholder="Contrase&ntilde;a" required disabled={ isFetching } />
        </div>
        { this.renderError() }
        <p className="help-block">Nuevo? <a href="#" onClick={ this.getRegisterHandler() }>Registrate</a></p>
        <LoadingButton isLoading={ isFetching } className="btn btn-lg btn-primary btn-block" type="submit" disabled={ isFetching }>Conectate</LoadingButton>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    loginError: state.login.error,
    isFetching: state.login.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (username, password) => dispatch(doLoginIfNeeded(username, password)),
    onChangePage: page => dispatch(changePageIfNeeded(page)),
    invalidateLogin: () => dispatch(invalidateLogin())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)

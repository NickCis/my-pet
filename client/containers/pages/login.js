import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { doLoginIfNeeded } from '../../actions/login';

class Login extends Component {
  render() {
    const onSubmit = ev => {
      ev.preventDefault();
      this.props.onLogin(ev.target.loginUsername.value, ev.target.loginPassword.value);
    };

    const { isFetching } = this.props;

    return (
      <form className="form-signin" onSubmit={ onSubmit }>
        <h2 className="form-signin-heading">Please sign in</h2>
        <label aria-for="loginUsername" className="sr-only">Email address</label>
        <input type="email" id="loginUsername" className="form-control" placeholder="Email address" required aria-autofocus disabled={ isFetching} />
        <label aria-for="loginPassword" className="sr-only">Password</label>
        <input type="password" id="loginPassword" className="form-control" placeholder="Password" required disabled={ isFetching} />
        <div className="checkbox">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    loginError: state.login.error,
    ifFetching: state.login.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (username, password) => dispatch(doLoginIfNeeded(username, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)

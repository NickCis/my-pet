import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { changePageIfNeeded } from '../actions';
import { logout } from '../actions/login';

import Navbar from '../components/navbar';

import * as Pages from './pages';

class App extends Component {
  renderCurrentPage() {
    const { currentPage } = this.props;
    switch(currentPage.type.displayName){
      case 'Connect(Home)':
        return currentPage;
    }

    return (
      <div className='container'>
        { currentPage }
      </div>
    );
  }

  render() {
    const { username, onChangePage, onLogout } = this.props;
    return (
      <div>
        <Navbar onChangePage={ onChangePage } username={ username } onLogout={ onLogout }/>
        { this.renderCurrentPage() }
      </div>
    );
  }
}

const pageFactory = state => {
  if(state.page.name in Pages)
    return React.createElement(Pages[state.page.name]);
  return React.createElement(Pages.NotFound);
};

const mapStateToProps = state => {
  return {
    currentPage: pageFactory(state),
    username: state.login.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangePage: page => dispatch(changePageIfNeeded(page)),
    onLogout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)

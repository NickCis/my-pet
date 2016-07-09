import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changePageIfNeeded } from '../actions';

import * as Pages from './pages';

class App extends Component {
  static get propTypes() {
    return {};
  }

  render() {
    const { currentPage } = this.props;
    return (
      <div>
        { currentPage }
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
    currentPage: pageFactory(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App)

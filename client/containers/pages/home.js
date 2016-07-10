import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Home extends Component {
  render() {
    return (
      <h1>My Pet</h1>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)

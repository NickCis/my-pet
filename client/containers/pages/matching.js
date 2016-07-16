import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Panel from '../../components/panel';
import LoadingButton from '../../components/loading_button';

import Match from '../../components/match';

class Matching extends Component {

  renderMatching() {
    return (
      <Panel title="Matching">
        <Match />
      </Panel>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-3">
          <Panel title="Mascotas"/>
        </div>
        <div className="col-xs-12 col-sm-9">
          { this.renderMatching() }
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Matching)

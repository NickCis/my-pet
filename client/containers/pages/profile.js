import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Nav from '../../components/profile/nav';
import Panel from '../../components/panel';


class Profile extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-3">
          <Nav/>
        </div>
        <div className="col-xs-12 col-sm-9">
          <Panel title="Perfil">
            hola :)
          </Panel>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

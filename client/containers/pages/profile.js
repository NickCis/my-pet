import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Nav from '../../components/profile/nav';
import Panel from '../../components/panel';
import LoadingButton from '../../components/loading_button';

import { changeProfileTab, updateProfile } from '../../actions/profile';


class Profile extends Component {

  getProfileFormSubmitHandler() {
    return ev => {
      ev.preventDefault();
      this.props.updateProfile({
        password: ev.target.password.value
      });
    };
  }

  renderProfileTabResult() {
    const { profile } = this.props;
    if(profile.success)
      return (
        <div className="alert alert-success" role="alert">
          <span className="glyphicon glyphicon-ok"/>
          Se guardo correctamente
        </div>
      );
    if(profile.error)
      return (
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign"/>
          <strong>Error:</strong> { profile.error.description || '' }
        </div>
      );
  }

  renderProfileTab() {
    const { profile } = this.props;
    return (
      <Panel title="Perfil">
        <form onSubmit={ this.getProfileFormSubmitHandler() }>
          { this.renderProfileTabResult() }
          <div className="form-group">
            <label htmlFor="">Contrase&ntilde;a</label>
            <input name="password" type="password" className="form-control" placeholder="Contrase&ntilde;a" required pattern=".{5,}" title="Minimo 5 caracteres" disabled={ profile.isLoading }/>
            <p className="help-block">Minimo 5 car&aacute;cteres</p>
          </div>
          <div className="form-group">
          </div>
          <LoadingButton isLoading={ profile.isLoading } type="submit" className="btn btn-default pull-right" disabled={ profile.isLoading }>Guardar</LoadingButton>
        </form>
      </Panel>
    );
  }

  renderPetTab() {
    return (
      <Panel title="Mascota">
      </Panel>
    );
  }

  renderCurrentTab() {
    switch(this.props.currentTab) {
      case 'profile':
        return this.renderProfileTab();

      case 'pet':
        return this.renderPetTab();
    }

    return (
      <Panel />
    )
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-3">
          <Nav onClick={ tab => this.props.changeTab(tab) } active={ this.props.currentTab }/>
        </div>
        <div className="col-xs-12 col-sm-9">
          { this.renderCurrentTab() }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.profile.tab,
    profile: state.profile.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeTab: tab => dispatch(changeProfileTab(tab)),
    updateProfile: data => dispatch(updateProfile(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

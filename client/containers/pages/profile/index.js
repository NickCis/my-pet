import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Nav from '../../../components/profile/nav';
import Panel from '../../../components/panel';
import LoadingButton from '../../../components/loading_button';

import PetTab from './pet_tab';

import { changeProfileTab, updateProfile } from '../../../actions/profile';

class Profile extends Component {
  getProfileFormSubmitHandler() {
    return ev => {
      ev.preventDefault();
      const { password, name, surname, email, tel } = ev.target;
      this.props.updateProfile({
        password: password.value,
        name: name.value,
        surname: surname.value,
        email: email.value,
        tel: tel.value
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
            <label htmlFor="password">Contrase&ntilde;a</label>
            <input type="password" id="password" className="form-control" placeholder="Password" required disabled={ profile.isLoading } required pattern=".{5,}" title="Minimo 5 caracteres" />
            <p className="help-block">M&aacute;s de 6 car&aacute;cteres</p>
          </div>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" className="form-control" placeholder="Nombre" required disabled={ profile.isLoading } required />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Apellido</label>
            <input type="text" id="surname" className="form-control" placeholder="Apellido" required disabled={ profile.isLoading } required />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-Mail</label>
            <input type="email" id="email" className="form-control" placeholder="Email" required disabled={ profile.isLoading } required />
          </div>
          <div className="form-group">
            <label htmlFor="tel">Tel&eacute;fono</label>
            <input type="text" id="tel" className="form-control" placeholder="Tel&eacute;fono" required disabled={ profile.isLoading } required />
          </div>
          <LoadingButton isLoading={ profile.isLoading } type="submit" className="btn btn-default pull-right" disabled={ profile.isLoading }>Guardar</LoadingButton>
        </form>
      </Panel>
    );
  }

  renderCurrentTab() {
    switch(this.props.currentTab) {
      case 'profile':
        return this.renderProfileTab();

      case 'pet':
        return (
          <PetTab />
        );
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

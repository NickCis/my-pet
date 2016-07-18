import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Nav from '../../components/profile/nav';
import Panel from '../../components/panel';
import LoadingButton from '../../components/loading_button';

import { changeProfileTab, updateProfile } from '../../actions/profile';
import { getPetsIfNeeded } from '../../actions/pet';


import { getPetPicture } from '../../utils';

class Profile extends Component {
  componentDidMount() {
    this.props.getPets();
  }

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

  renderPetRow(pet) {
    return (
      <li className="media" key={ pet.id }>
        <div className="media-left media-middle">
          <a href="#">
            <img style={{ maxHeight: '128px' }} className="media-object" src={ getPetPicture(pet) } alt={ "Foto de "+pet.name } />
          </a>
        </div>
        <div className="media-body">
          <h4 className="media-heading">{ pet.name }</h4>
          <p>Esto seria texto</p>
        </div>
        <div className="media-right media-middle">
          <div className="btn-group-vertical" role="group">
            <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-edit" /></button>
            <button type="button" className="btn btn-danger"><span className="glyphicon glyphicon-remove" /></button>
          </div>
        </div>
      </li>
    );
  }
  renderPetTab() {
    const { petsIsLoading, pets } = this.props;
    // XXX: se podria extraer a un componente!
    return (
      <Panel title="Mascotas" loading={ petsIsLoading }>
        <p>
          Esta es una lista de todas las mascotas asociadas a tu cuenta.
        </p>
        <ul className="media-list profile-pet-media-list">
          { pets.map(pet => this.renderPetRow(pet)) }
        </ul>
        <button type="button" className="btn btn-success pull-right">
          <span className="glyphicon glyphicon-plus" />  Agregar
        </button>
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
    pets: state.pet.pets,
    petsIsLoading: state.pet.isLoading,
    currentTab: state.profile.tab,
    profile: state.profile.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPets: () => dispatch(getPetsIfNeeded()),
    changeTab: tab => dispatch(changeProfileTab(tab)),
    updateProfile: data => dispatch(updateProfile(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Panel from '../../../components/panel';
import DropImage from '../../../components/drop_image';
import LoadingButton from '../../../components/loading_button';
import DatePicker from 'react-bootstrap-date-picker';

import {
  getPetsIfNeeded,
  createNewPet,
  errorNewPet,
  invalidateNewPet
} from '../../../actions/pet';
import { getBreedsIfNeeded } from '../../../actions/pet_info';
import { getPetPicture } from '../../../utils';

class PetTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'list',
      images: [],
      datePickerValue: undefined
    };
  }

  componentDidMount() {
    this.props.getPets();
    this.props.getBreeds();
  }

  renderPetRow(pet) {
    return (
      <li className="list-group-item" key={ pet.id }>
        <div className="media">
          <div className="media-left media-middle">
            <a href="#">
              <img className="media-object profile-pet-media-object" src={ getPetPicture(pet) } alt={ "Foto de "+pet.name } />
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
        </div>
      </li>
    );
  }

  changeMode(mode) {
    if(mode == 'add')
      this.props.invalidateNewPet();

    this.setState({
      ...this.state,
      mode
    });
  }

  getChangeModeHandler(mode) {
    return ev => {
      ev.preventDefault();
      this.changeMode(mode);
    }
  }

  renderList() {
    const { petsIsLoading, pets } = this.props;

    return (
      <Panel title="Mascotas" loading={ petsIsLoading } wrapInBody={ false }>
        <div className="panel-body">
          { this.renderResult() }
          <p>
            Esta es una lista de todas las mascotas asociadas a tu cuenta.
          </p>
        </div>
        <ul className="list-group">
          { pets.map(pet => this.renderPetRow(pet)) }
        </ul>
        <div className="panel-body">
          <button onClick={ this.getChangeModeHandler('add') } type="button" className="btn btn-success pull-right">
            <span className="glyphicon glyphicon-plus" />  Agregar
          </button>
        </div>
      </Panel>
    );
  }

  getOnDropHandler() {
    return images => {
      this.setState({
        ...this.state,
        images: [
          ...this.state.images,
          ...images
        ]
      });
    }
  }

  getOnDatePickerChangeHandler() {
    return value => {
      this.setState({
        ...this.state,
        datePickerValue: value
      });
    };
  }

  getOnSubmitHandler() {
    return ev => {
      ev.preventDefault();
      const { petName, petBirthdate, petBreed } = ev.target;
      if(!petBirthdate.value)
        return this.props.errorNewPet({description: "Se debe completar la fecha de nacimiento"})

      if(this.state.images.length < 1)
        return this.props.errorNewPet({description: "Se deben agregar imagenes"})

      this.props.createNewPet({
        name: petName.value,
        birthdate: petBirthdate.value,
        breed: petBreed.value,
        images: this.state.images
      });
    };
  }

  renderError(ev) {
    const { error } = this.props.create;
    if(error)
      return (
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" />
          <span className="sr-only">Error:</span>
          { error.description }
        </div>
      );
  }

  renderResult() {
    const { success } = this.props.create;

    if(success)
      return (
        <div className="alert alert-success" role="alert">
          <span className="glyphicon glyphicon-ok"/>  Mascota creada correctamente
        </div>
      );
  }

  renderNew(ev) {
    const { breed } = this.props;
    const { isSubmitting } = this.props.create;

    return (
      <Panel title="Nueva Mascota">
        <form onSubmit={ this.getOnSubmitHandler() }>
          { this.renderError() }
          <div className="form-group">
            <label htmlFor="petName">Nombre</label>
            <input type="text" id="petName" className="form-control" placeholder="Nombre" required autoFocus disabled={ isSubmitting }/>
          </div>
          <div className="form-group">
            <label htmlFor="petBirthdate">D&iacute;a de nacimiento</label>
            <DatePicker id="petBirthdate" inputFormat="DD/MM/YYYY" onChange={ this.getOnDatePickerChangeHandler() } value={ this.state.datePickerValue } required/>
          </div>
          <div className="form-group">
            <label htmlFor="petBreed">Raza</label>
            <select id="petBreed" className="form-control" disabled={ isSubmitting } required defaultValue="-1">
              <option disabled value="-1">Seleccionar</option>
              { breed.breeds.map(b => ( <option key={ b } value={ b }>{ b }</option>)) }
            </select>
          </div>
          <DropImage label="Fotos" images={ this.state.images } onDrop={ this.getOnDropHandler() } disabled={ isSubmitting } />
          <LoadingButton isLoading={ isSubmitting } disabled={ isSubmitting } className="btn btn-success pull-right">
            <span className="glyphicon glyphicon-plus" />  Agregar
          </LoadingButton>
        </form>
      </Panel>
    );
  }

  render() {
    switch(this.state.mode) {
      case 'add':
        if(!this.props.create.success)
          return this.renderNew();

      case 'edit':
        break;
    }

    return this.renderList();
  }

}

const mapStateToProps = state => {
  return {
    breed: state.pet_info.breed,
    pets: state.pet.pets,
    create: state.pet.create,
    petsIsLoading: state.pet.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPets: () => dispatch(getPetsIfNeeded()),
    getBreeds: () => dispatch(getBreedsIfNeeded()),
    createNewPet: pet => dispatch(createNewPet(pet)),
    errorNewPet: err => dispatch(errorNewPet(err)),
    invalidateNewPet: () => dispatch(invalidateNewPet())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PetTab)

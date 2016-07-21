import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Panel from '../../components/panel';
import PetList from '../../components/pet_list';

import { getPetsAndDefaultMatch, getMatch } from '../../actions/match';
import { delLike, invalidateDelLike } from '../../actions/like';

import { getPetPicture } from '../../utils';

class Match extends Component {

  componentDidMount() {
    this.props.getMatches();
  }

  componentWillUnmount() {
    this.props.invalidateDelLike();
  }

  getPetListClickHandler() {
    return (e, pet) => {
      e.preventDefault();
      this.props.invalidateDelLike();
      this.props.getMatch(pet.id);
    };
  }

  getDelLikeHandler(to) {
    const from = this.props.currentPet;
    return ev => {
      ev.preventDefault();
      this.props.delLike(from, to);
    };
  }

  renderMatchRow(pet) {
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
            <ul>
              <li><strong>Raza</strong>: { pet.breed }</li>
              <li><strong>Fecha de nacimiento</strong>: { pet.niceBirthdate }</li>
              <li><strong>Due&ntilde;o</strong>: { `${pet.owner.name} ${pet.owner.surname} (${pet.owner.username})` }</li>
              <li><strong>E-Mail</strong>: { pet.owner.email }</li>
              <li><strong>Tel:</strong>: { pet.owner.tel }</li>
            </ul>
          </div>
          <div className="media-right media-middle">
            <div className="btn-group-vertical" role="group">
              <button type="button" className="btn btn-danger" onClick={ this.getDelLikeHandler(pet.id) }><span className="glyphicon glyphicon-remove"/></button>
            </div>
          </div>
        </div>
      </li>
    );
  }

  renderListContent() {
    const { matches } = this.props;
    if(matches.length)
      return matches.map(match => this.renderMatchRow(match));

    return (
      <li className="list-group-item">
        <p className="text-center">
          <span className="glyphicon glyphicon-heart-empty" style={{color: 'red', fontSize: '32px'}}/>
        </p>
        <p className="text-center">
          ¡Mala suerte, No hubo coincidencias!
        </p>
      </li>
    );
  }

  renderResult() {
    const { del } = this.props;

    if(del.error)
      return (
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" />
          <span className="sr-only">Error:</span>
            { del.error.description }
        </div>
      );

    if(del.success)
      return (
        <div className="alert alert-success" role="alert">
          <span className="glyphicon glyphicon-ok"/>  Like borrado correctamente
        </div>
      );
  }

  render() {
    const { pet, matchIsFetching, currentPet } = this.props,
      isLoading = pet.isLoading || matchIsFetching;

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-3">
          <PetList
            loading={ pet.isLoading }
            pets={ pet.pets }
            currentPet={ currentPet }
            onClick={ this.getPetListClickHandler() }
          />
        </div>
        <div className="col-xs-12 col-sm-9">
          <Panel title="Matches" loading={ isLoading } wrapInBody={ false }>
            <div className="panel-body">
              { this.renderResult() }
              <p>
                Esta es una lista de todas los matches que tuvo su mascota.
              </p>
            </div>
            <ul className="list-group">
                { this.renderListContent() }
            </ul>
          </Panel>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pet: state.pet,
    currentPet: state.match.pet,
    matches: state.match.matches,
    matchIsFetching: state.match.isFetching,
    del: state.like.del
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMatches: () => dispatch(getPetsAndDefaultMatch()),
    getMatch: id => dispatch(getMatch(id)),
    delLike: (from, to) => dispatch(delLike(from, to)),
    invalidateDelLike: () => dispatch(invalidateDelLike())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Match)

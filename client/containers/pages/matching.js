import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getPetsIfNeeded } from '../../actions/pet';
import { getCandidatesIfNeeded, invalidateGetCandidates, removeCandidate } from '../../actions/candidate';
import { likePet } from '../../actions/like';

import Panel from '../../components/panel';
import LoadingButton from '../../components/loading_button';

import Match from '../../components/match';
import MatchItem from '../../components/match/item';

import { getPetPicture } from '../../utils';

class Matching extends Component {
  componentDidMount() {
    this.props.getPets();

    // XXX:
    const { pet, pets, getCandidate } = this.props;
    if(pets.length)
      getCandidate(pet || pets[0].id);
  }



  componentWillReceiveProps(nextProps) {
    const { pet, pets, getCandidate } = nextProps;

    // XXX:
    if(this.props.pets.length == 0 && pets.length)
      getCandidate(pet || pets[0].id);
  }

  componentWillUnmount() {
    this.props.invalidateGetCandidates();
  }

  renderMatchingItem(pet) {
    return (
      <MatchItem data-id={ pet.id } key={ pet.id } name={ pet.name } img={ getPetPicture(pet) } />
    );
  }

  getLikeHandler() {
    return e => {
      const lastCandidate = this.props.candidates.slice(-1).pop();
      if(!lastCandidate)
        return;

      const idTo = lastCandidate.id,
        idFrom = this.props.pet;

      this.props.likePet(idFrom, idTo, e.result);
      this.props.removeCandidate(idFrom, idTo);

      if(this.props.candidates.length <= 1)
        this.props.getCandidate(idFrom);
    };
  }

  renderMatchingContent() {
    const { candidates } = this.props;
    if(candidates.length <= 0)
      return (
        <div>
          <p className="text-center">
            <span className="glyphicon glyphicon-heart" style={{color: 'red', fontSize: '40px'}}/>
          </p>
          <p className="text-center">
            Lamentablemente no hay m&aacute;s candidatos. Intenta m&aacute;s tarde.
          </p>
        </div>
      );

    return (
      <Match onLike={ this.getLikeHandler() }>
        { candidates.map(candidate => this.renderMatchingItem(candidate)) }
      </Match>
    );

  }

  renderMatching() {
    const isLoading = this.props.petsIsLoading || this.props.candidatesIsLoading;
    return (
      <Panel title="Matching" loading={ isLoading }>
        { this.renderMatchingContent() }
      </Panel>
    );
  }

  getSelectPetHandler(pet) {
    return e => {
      e.preventDefault();
      this.props.getCandidate(pet);
    };
  }

  renderPet(pet) {
    const className = pet.id == this.props.pet ? 'active' : '';
    return (
      <li role="presentation" className={ className } key={ pet.id }><a href="#" onClick={ this.getSelectPetHandler(pet.id) }>{ pet.name }</a></li>
    );
  }

  render() {
    const { pets, petsIsLoading } = this.props;

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-3">
          <Panel title="Mascotas" loading={ petsIsLoading }>
            <ul className="nav nav-pills nav-stacked nav-profile">
              { pets.map(pet => this.renderPet(pet)) }
            </ul>
          </Panel>
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
    pets: state.pet.pets,
    petsIsLoading: state.pet.isLoading,
    candidatesIsLoading: state.candidate.isLoading,
    pet: state.candidate.pet,
    candidates: state.candidate.candidates
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPets: () => dispatch(getPetsIfNeeded()),
    getCandidate: id => dispatch(getCandidatesIfNeeded(id)),
    invalidateGetCandidates: () => dispatch(invalidateGetCandidates()),
    removeCandidate: (idPet, idCandidate) => dispatch(removeCandidate(idPet, idCandidate)),
    likePet: (idFrom, idTo, result) => dispatch(likePet(idFrom, idTo, result))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Matching)

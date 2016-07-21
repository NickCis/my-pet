import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  getPetsAndDefaultCandidate,
  getCandidatesIfNeeded,
  invalidateGetCandidates,
  removeCandidate
} from '../../actions/candidate';

import { likePet } from '../../actions/like';

import Panel from '../../components/panel';
import PetList from '../../components/pet_list';
import LoadingButton from '../../components/loading_button';

import Match from '../../components/match';
import MatchItem from '../../components/match/item';

import { getPetPicture } from '../../utils';

class Matching extends Component {
  componentDidMount() {
    this.props.getPetsAndDefaultCandidates();
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

      const idTo = e.id || lastCandidate.id,
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
            <span className="glyphicon glyphicon-fire" style={{color: 'red', fontSize: '40px'}}/>
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

  getPetListClickHandler() {
    return (e, pet) => {
      e.preventDefault();
      this.props.getCandidate(pet.id);
    };
  }

  render() {
    const { petsIsLoading, pets, pet } = this.props;

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-3">
          <PetList
            loading={ petsIsLoading }
            pets={ pets }
            currentPet={ pet }
            onClick={ this.getPetListClickHandler() }
          />
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
    getPetsAndDefaultCandidates: () => dispatch(getPetsAndDefaultCandidate()),
    getCandidate: id => dispatch(getCandidatesIfNeeded(id)),
    invalidateGetCandidates: () => dispatch(invalidateGetCandidates()),
    removeCandidate: (idPet, idCandidate) => dispatch(removeCandidate(idPet, idCandidate)),
    likePet: (idFrom, idTo, result) => dispatch(likePet(idFrom, idTo, result))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Matching)

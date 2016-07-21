import React, { Component, PropTypes } from 'react';

import Panel from './panel';

export default class PetList extends Component {
  static get propTypes() {
    return {
      onClick: PropTypes.func,
      loading: PropTypes.bool,
      currentPet: PropTypes.number,
      pets: PropTypes.array.isRequired
    };
  }

  static get defaultProps() {
    return {
      onClick: () => {}
    };
  }

  getOnClickHandler(pet) {
    return ev => {
      this.props.onClick(ev, pet);
    };
  }

  renderPet(pet) {
    const className = pet.id == this.props.currentPet ? 'active' : '';
    return (
        <li role="presentation" className={ className } key={ pet.id }><a href="#" onClick={ this.getOnClickHandler(pet) }>{ pet.name }</a></li>
        );
  }

  renderPetList() {
    const { pets } = this.props;
    if(pets.length)
      return pets.map(pet => this.renderPet(pet));

    return (
        <li role="presentation" style={{ color: 'grey' }}>
          <p className="text-center" style={{ margin: '10px 0 0' }}>
            <span className="glyphicon glyphicon-option-horizontal" />
          </p>
          <p className="text-center">No tenes mascotas</p>
        </li>
    );
  }
  render() {
    return (
      <Panel title="Mascotas" loading={ this.props.loading }>
        <ul className="nav nav-pills nav-stacked nav-profile">
          { this.renderPetList() }
        </ul>
      </Panel>
    );
  }
}

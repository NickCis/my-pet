import React, { Component, PropTypes } from 'react'
import Panel from '../panel';

export default class Nav extends Component {
  static get propTypes() {
    return {
      onClick: PropTypes.func,
      active: PropTypes.string

    };
  }

  static get defaultProps() {
    return {
      active: 'profile'
    };
  }

  getClickHandler(name) {
    return ev => {
      ev.preventDefault();
      if(this.props.onClick)
        this.props.onClick(name);
    };
  }

  renderListItem(text, tab) {
    const { active } = this.props;
    return (
      <li role="presentation" className={ tab == active && "active" }><a href="#" onClick={ this.getClickHandler(tab) }>{ text }</a></li>
    );
  }

  render() {
    const { active } = this.props;
    return (
      <Panel title="Configuraci&oacute;n Personal" className={ this.props.className }>
        <ul className="nav nav-pills nav-stacked nav-profile">
          { this.renderListItem("Perfil", "profile") }
          { this.renderListItem("Mascotas", "pet") }
        </ul>
      </Panel>
    );
  }
}

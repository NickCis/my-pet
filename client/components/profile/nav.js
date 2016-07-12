import React, { Component, PropTypes } from 'react'
import Panel from '../panel';

export default class Nav extends Component {
  render() {
    return (
      <Panel title="Configuraci&oacute;n Personal" className={ this.props.className }>
        <ul className="nav nav-pills nav-stacked">
          <li role="presentation" className="active"><a href="#">Perfil</a></li>
          <li role="presentation"><a href="#">Mascotas</a></li>
        </ul>
      </Panel>
    );
  }
}

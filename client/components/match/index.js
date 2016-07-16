import React, { Component, PropTypes } from 'react';

import Stack from './stack';

export default class Match extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <Stack className='stack col-xs-12 col-sm-offset-4 col-sm-4'>
            <li className='in-deck'><img src="https://placekitten.com/g/200/300" /></li>
            <li className='in-deck'><img src="https://placekitten.com/g/200/300" /></li>
            <li className='in-deck'><img src="https://placekitten.com/g/200/300" /></li>
          </Stack>
        </div>
        <div className="row">
          <div className="col-xs-6 col-sm-6">
            <a className="matching-button pull-right">
              <span className="glyphicon glyphicon-remove" />
            </a>
          </div>
          <div className="col-xs-6 col-sm-6">
            <a className="matching-button pull-left">
              <span className="glyphicon glyphicon-ok" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

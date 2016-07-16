import React, { Component, PropTypes } from 'react';

import Stack from './stack';

export default class Match extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <Stack className='stack col-xs-12 col-sm-offset-4 col-sm-4'>
            <li className='in-deck'>
              <div className="panel panel-default">
                <div className="panel-body">
                  <img src="https://placekitten.com/200/300" />
                </div>
                <div className="panel-footer">
                  <p className="text-center">
                    Lindo Gatito
                  </p>
                </div>
              </div>
            </li>
            <li className='in-deck'>
              <div className="panel panel-default">
                <div className="panel-body">
                  <img src="https://placekitten.com/g/200/300" />
                </div>
                <div className="panel-footer">
                  <p className="text-center">
                    Otro gato
                  </p>
                </div>
              </div>
            </li>
            <li className='in-deck'>
              <div className="panel panel-default">
                <div className="panel-body">
                  <img src="https://placekitten.com/200/300" />
                </div>
                <div className="panel-footer">
                  <p className="text-center">
                    M&aacute;s gatos
                  </p>
                </div>
              </div>
            </li>
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

import React, { Component, PropTypes } from 'react'

export default class Carousel extends Component {
  render() {
    const { children } = this.props;
    return (
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          {
            children.map((c, i) => {
              console.log(c, i);
              const className = ( i === 0 ) ? 'active' : '';
              return (
                <li key={ i } data-target="#myCarousel" data-slide-to={ i } className={ className }></li>
              );
            })
          }
        </ol>
        <div className="carousel-inner" role="listbox">
          { children }
        </div>
        <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}

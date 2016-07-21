import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changePageIfNeeded } from '../../actions';

import Carousel from '../../components/carousel';
import CarouselItem from '../../components/carousel/item'
import Marketing from '../../components/marketing';
import MarketingItem from '../../components/marketing/item';

function getData() {
  const data = [
    { name: 'Papita', img: '/img/breed/basset_hound.jpg', text: 'Le gustan las siestas y comer mucho' },
    { name: 'Pelos', img: '/img/breed/beagle.jpg', text: 'No estariamos seguros si es un chanchito!' },
    { name: 'Lilita', img: '/img/breed/boxer.jpg', text: 'Simpatico, confianzudo y alegre' },
    { name: 'Cacho', img: '/img/breed/britanico_de_pelo_corto.jpg', text: 'Timido, pero bueno' },
    { name: 'Juan', img: '/img/breed/caniche.jpg', text: 'Ladra, ladra y ladra, pero no muerde!' },
    { name: 'Marta', img: '/img/breed/himalayo.jpg', text: 'Muy activo, nunca para de hacer cosas!' },
    { name: 'Rayo Silver', img: '/img/breed/san_bernardo.jpg', text: 'Divertido y alegre!' },
  ];

  const rand = Math.round((Math.random() * data.length)) % data.length;
  return data[rand];
}

class Home extends Component {
  getChangePageHandler(page) {
    return ev => {
      ev.preventDefault();
      this.props.onChangePage(page);
    };
  }
  renderCarousel() {
    return (
      <Carousel>
        <CarouselItem className="active">
          <p><span style={{ fontSize: '64px', color: 'red' }}className="glyphicon glyphicon-fire" /></p>
          <h1>Matching</h1>
          <p>¿Tu mascota se siente sola? ¿La compa&ntilde;ia humana no le alcanza?  ¡Ellos tambien tienen necesidades, encontrale una pareja!</p>
          <p><a className="btn btn-lg btn-primary" href="#" role="button" onClick={ this.getChangePageHandler('Register') }>Registrate hoy!</a></p>
        </CarouselItem>
        <CarouselItem>
          <p><span style={{ fontSize: '64px', color: 'yellow' }}className="glyphicon glyphicon-gift" /></p>
          <h1>Compras</h1>
          <p>Ellos siempre piensan en nosotros, ¿Por que nosotros nunca pensamos en ellos?. Sumate al <code>#RegaloXMovidaDeCola</code></p>
          <p><a className="btn btn-lg btn-primary" href="#" role="button" onClick={ this.getChangePageHandler('Register') }>Registrate hoy!</a></p>
        </CarouselItem>
        <CarouselItem>
          <p><span style={{ fontSize: '64px'}}className="glyphicon glyphicon-info-sign" /></p>
          <h1>Informate</h1>
          <p>Darle el cuidado necesario es algo dificil, manetene informado y al d&iacute;!</p>
          <p><a className="btn btn-lg btn-primary" href="#" role="button" onClick={ this.getChangePageHandler('Register') }>Registrate hoy!</a></p>
        </CarouselItem>
      </Carousel>
    );
  }
  renderMarketing() {
    const [ pet1, pet2, pet3 ] = [ getData(), getData(), getData() ];
    return (
      <Marketing>
        <MarketingItem title={ pet1.name } img={ pet1.img }>
          <p>{ pet1.text }</p>
        </MarketingItem>
        <MarketingItem title={ pet2.name } img={ pet2.img }>
          <p>{ pet2.text }</p>
        </MarketingItem>
        <MarketingItem title={ pet3.name } img={ pet3.img }>
          <p>{ pet3.text }</p>
        </MarketingItem>
      </Marketing>
    );
  }

  render() {
    return (
      <div style={{ marginTop: '-20px' }}>
      { this.renderCarousel() }
      { this.renderMarketing() }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangePage: page => dispatch(changePageIfNeeded(page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)

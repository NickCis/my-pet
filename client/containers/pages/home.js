import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Carousel from '../../components/carousel';
import CarouselItem from '../../components/carousel/item'
import Marketing from '../../components/marketing';
import MarketingItem from '../../components/marketing/item';

class Home extends Component {
  renderCarousel() {
    return (
      <Carousel>
        <CarouselItem className="active">
          <h1>Example headline.</h1>
          <p>Note: If you're viewing this page via a <code>file://</code> URL, the "next" and "previous" Glyphicon buttons on the left and right might not load/display properly due to web browser security rules.</p>
          <p><a className="btn btn-lg btn-primary" href="#" role="button">Sign up today</a></p>
        </CarouselItem>
        <CarouselItem>
          <h1>Another example headline.</h1>
          <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
          <p><a className="btn btn-lg btn-primary" href="#" role="button">Learn more</a></p>
        </CarouselItem>
        <CarouselItem>
          <h1>One more for good measure.</h1>
          <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
          <p><a className="btn btn-lg btn-primary" href="#" role="button">Browse gallery</a></p>
        </CarouselItem>
      </Carousel>
    );
  }
  renderMarketing() {
    return (
      <Marketing>
        <MarketingItem title="Titulo">
          <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
        </MarketingItem>
        <MarketingItem title="Titulo">
          <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
        </MarketingItem>
        <MarketingItem title="Titulo">
          <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)

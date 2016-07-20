import React, { Component, PropTypes } from 'react';

import Dropzone from 'react-dropzone';

export default class DropImage extends Component {
  static get defaultProps() {
    return {
      images: [],
      onDrop: () => {},
      onRemove: () => {},
      getImageInDrop: true
    };
  }

  static get propTypes() {
    return {
      getImageInDrop: PropTypes.bool,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
      onDrop: PropTypes.func,
      onRemove: PropTypes.func,
      images: PropTypes.array
    };
  }

  renderImage(img, key) {
    return (
      <div className="col-xs-12 col-sm-6 col-md-3" key={ key }>
        <a href="#" className="thumbnail">
          <img className="img-rounded" style={{ maxHeight: '128px' }} src={ img } />
        </a>
      </div>
    );
  }

  getOnDropHandler() {
    return files => {
      if(!this.props.getImageInDrop)
        return this.props.onDrop(files);

      return Promise.all(files.map(f => {
        return new Promise((rs, rj) => {
          let reader = new FileReader();
          reader.addEventListener('load', ev => {
            rs(reader.result);
          }, false);
          reader.readAsDataURL(f);
        });
      }))
        .then(images => this.props.onDrop(images));
    };
  }

  render() {
    const { label, images, disabled } = this.props;
    return (
      <div className="form-group">
        <label>{ label }</label>
        <div className="row">
          { images.map((img, i) => this.renderImage(img, i)) }
        </div>
        <Dropzone disabled={ disabled } style={{
          width: '100%',
          height: '200px',
          border: '2px dashed rgb(102, 102, 102)',
          borderRadius: '5px'
        }} activeStyle={{
          width: '100%',
          height: '200px',
          border: '2px solid rgb(102, 102, 102)',
          borderRadius: '5px',
          backgroundColor: 'rgb(238, 238, 238)'
        }} onDrop={ this.getOnDropHandler() } />
      </div>
    );
  }
};

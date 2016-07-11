import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changePageIfNeeded } from '../../actions';
import { doLoginIfNeeded } from '../../actions/login';

class NewProduct extends Component{

	render(){
    const onSubmit = ev => {
      ev.preventDefault();
	};

		const { isFetching } = this.props;

		return(
			<form className="form-newProduct" onSubmit= { onSubmit } >
				<h2 className="form-newProduct-heading"> Publicar </h2>
				<div className="form-group">
					<label htmlFor="nombreProducto" className="product-name"> Producto / Servicio </label>
				</div>

			</form>
		)
	}

}

const mapStateToProps = state => {
  return {
    isFetching: state.login.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangePage: page => dispatch(changePageIfNeeded(page))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(NewProduct)


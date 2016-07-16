import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { changePageIfNeeded } from '../../actions';
//import ImageUploader from '../../components/image_uploader';
import DropzoneComponent from 'react-dropzone-component/lib/react-dropzone';

class NewProduct extends Component{


	renderInnerButton() {
		if(this.props.isFetching)
			return (
				<span>
					<span className="glyphicon glyphicon-refresh glyphicon-refresh-animate" />  Cargando...
				</span>
			);

		return "Publicar";
	}


	render(){
		const onSubmit = ev => {
			ev.preventDefault();
			this.props.onNewProduct(
				ev.target.productName.value,
				ev.target.productType.value,
				ev.target.productPrice.value,
				ev.target.productDescription.value
			);
		};

		var componentConfig = {
			iconFileTypes: ['.jpg' , '.png' , '.gif'],
			showFiletypeIcon: true,
			postUrl : '/'
		};

		const { isFetching } = this.props;


		return(
			<form className="form-newProduct" onSubmit= { onSubmit } >
				<h2 className="form-newProduct-heading"> Publicar </h2>
					<div className="form-group">
						<input type="text"  id="productName" className="form-control" placeholder="Nombre Producto" required autoFocus disabled={ isFetching } />
						<select id="productType" className="form-control">
							<option value="product">Producto</option>
							<option value="service">Servicio</option>
							<option value="professional-service">Servicio Profesional</option>
						</select>
						<input type="number" step="0.01" id="productPrice" className="form-control" placeholder="Precio" required disabled={ isFetching } />
						<textarea id="productDescription" className="form-control" placeholder="Descripcion del Producto" required disabled={ isFetching } />
						<DropzoneComponent config={componentConfig} />
					</div>
				<button className="btn btn-lg btn-primary btn-block" type="submit" disabled={ isFetching }>
					{ this.renderInnerButton() }
				</button>

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
	onNewProduct: (productName,	productType, productPrice, productDescription) => dispatch(doNewProduct(productName, productType, productPrice, productDescription);
    onChangePage: page => dispatch(changePageIfNeeded(page))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(NewProduct)


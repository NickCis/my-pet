import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'

import LoadingButton from '../../components/loading_button';

import { changePageIfNeeded } from '../../actions';
import { doNewProduct, invalidateProduct } from '../../actions/newProduct';

class NewProduct extends Component{
	constructor(props) {
		super(props);
		this.state = {images:[]};
	}

	componentWillUnmount() {
		this.props.invalidateProduct();
	}

	renderError() {
		if(!this.props.error)
			return;
		return (
			<div className="alert alert-danger" role="alert">
				Error: { this.props.error.description }
			</div>
		);
	}

	renderForm(){
		const onSubmit = ev => {
			ev.preventDefault();
			this.props.onNewProduct(
				ev.target.productName.value,
				ev.target.productType.value,
				ev.target.productPrice.value,
				ev.target.productDescription.value,
				this.state.images
			);
		};

		const onDrop = files => {
			files.forEach(f => {
				let reader = new FileReader();
				reader.addEventListener('load', ev => {
					const images = this.state.images.slice();
					images.push(reader.result);
					this.setState({
						images: images
					});
				});
				reader.readAsDataURL(f);
			});
		};

		const { isFetching } = this.props;
		return (
			<form className="form-newProduct" onSubmit= { onSubmit } >
				<h2 className="form-newProduct-heading"> Publicar </h2>
				{ this.renderError() }
				<div className="form-group">
					<label htmlFor="productName">Nombre Producto</label>
					<input type="text" id="productName" className="form-control" placeholder="Nombre Producto" required autoFocus disabled={ isFetching } />
				</div>
				<div className="form-group">
					<label htmlFor="productType"> Tipo de publicaci&oacute;n</label>
					<select id="productType" className="form-control">
						<option value="product">Producto</option>
						<option value="service">Servicio</option>
						<option value="professional-service">Servicio Profesional</option>
					</select>
				</div>
				<div className="form-group">
					<label htmlFor="productPrice"> Precio</label>
					<input type="number" step="0.01" id="productPrice" className="form-control" placeholder="Precio" required disabled={ isFetching } />
				</div>
				<div className="form-group">
					<label htmlFor="productDescription"> Descripcion del Producto</label>
					<textarea id="productDescription" className="form-control" placeholder="Descripcion del Producto" required disabled={ isFetching } />

				</div>
				<div className="form-group">
					<label htmlFor="images">Imagenes del producto</label>
					<div className="row">
						{ this.state.images.map((img, i) => {
							return (
								<div className="col-xs-12 col-sm-6 col-md-3" key={ i }>
									<a href="#" className="thumbnail"><img className="img-rounded" style={{maxHeight: '128px'}} src={ img } /></a>
								</div>
							);
						}) }
					</div>
					<Dropzone style={{
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
					}} onDrop={onDrop } />
				</div>
					<LoadingButton isLoading={ isFetching } disabled={ isFetching }>Publicar</LoadingButton>
			</form>
		);
	}

	render(){
		if(!this.props.finished)
			return this.renderForm();

		return (
			<div className="alert alert-success" role="alert">
				Producto cargado correctamente
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		isFetching: state.newProduct.isFetching,
		finished: state.newProduct.finished
	};
};

const mapDispatchToProps = dispatch => {
	return {
		//onNewProduct: (productName, productType, productPrice, productDescription) => dispatch( console.log(productName,productType,productPrice,productDescription)),
		onNewProduct: (productName, productType, productPrice, productDescription,images) => dispatch(doNewProduct(productName, productType, parseFloat(productPrice), productDescription,images)),
		onChangePage: page => dispatch(changePageIfNeeded(page)),
		invalidateProduct: () => dispatch(invalidateProduct())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct)

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import LoadingButton from '../../components/loading_button';

import { changePageIfNeeded } from '../../actions';
import { fetchProducts , delProduct } from '../../actions/products';
//import { doNewProduct, invalidateProduct } from '../../actions/newProduct';

class ProductsList extends Component{
	constructor(props) {
		super(props);
		this.state = {products:[]};
	}

	componentDidMount(){
		this.props.fetchProducts("");
	}

	render(){
		if (!this.props.delFinished)
			return this.renderForm();
		return (
			<div className="alert alert-success" role="alert">
				Compraste satisfactoriamente! Muchas gracias por tu compra
			</div>
		)
	}

	renderForm(){
		const onSubmit = ev => {
			ev.preventDefault();
		}

		return(
			<form className="form-products-list"  >
				<h2 className="form-newProduct-heading"> Encuentra lo que buscas ! </h2>
					<div className="container">
						<div className="row">
							{ this.renderGallery() } 
						</div>
					</div>
			</form>
		)
	}
	renderGallery(){

		//XXX:
		const handleCompra = product => {
			this.props.buyProduct(product.id);
			console.log("compraron: ",product);
		};

		if (this.props.products){
			return this.props.products.map((prod,i) =>{
				console.log("i",i);
				return(
					<div style={{marginTop: '50px'}} className="col-lg-3 col-md-4 col-xs-6 thumb" key= { i } >
						<a id= { i } className="thumbnail" href="#">

							<img className="img-responsive" src= { `/api/product/${prod.id}/image/0` }  style={{maxHeight: '128px'}} alt=""/>
						</a>
						<div> <label> Nombre: </label><label  htmlFor={ i }> {prod.name} </label> </div>
						<div> <label> Precio:  </label><label  htmlFor={ i }>$ {prod.price} </label> </div>
						<div> <label> Descripcion:  </label><label  htmlFor={ i }> {prod.description} </label> </div>
						<div> <label> Tipo: </label><label  htmlFor={ i }> {prod.type} </label> </div>
						<div> <button type="button" className="btn btn-primary" onClick={ () => handleCompra(prod) }>Comprar</button></div>
					</div>
				);
			})
		} }

}

const mapStateToProps = state => {
	return {
		products : state.productsList.products,
		delFinished: state.productsList.delFinished
		//error: state.newProduct.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchProducts : (productName) => dispatch(fetchProducts(productName)),
		buyProduct : (productId) => dispatch(delProduct(productId)),
		onChangePage: page => dispatch(changePageIfNeeded(page))
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import LoadingButton from '../../components/loading_button';

import { changePageIfNeeded } from '../../actions';
import { fetchProducts , fetchImages, fetchAll } from '../../actions/products';
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
		const onSubmit = ev => {
			ev.preventDefault();
			console.log("SUBMIT");
		}

		return (
			<form className="form-products-list" onSubmit= { onSubmit } >
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
		if (this.props.products){
			this.props.products.map((prod,i) =>{
				console.log("i",i);
				return(
					<div>HOLA</div>
				);
			})
		}
	}

}

const mapStateToProps = state => {
	return {
		products : state.productsList.products

		//isFetching: state.newProduct.isFetching,
		//finished: state.newProduct.finished,
		//error: state.newProduct.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchProducts : (productName) => dispatch(fetchProducts(productName)),

		//onNewProduct: (productName, productType, productPrice, productDescription,images) => dispatch(doNewProduct(productName, productType, parseFloat(productPrice), productDescription,images)),
		onChangePage: page => dispatch(changePageIfNeeded(page)),
		//invalidateProduct: () => dispatch(invalidateProduct())
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)

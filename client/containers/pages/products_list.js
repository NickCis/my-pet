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
//		if (this.state.products.size > 0 ) {
//			console.log("BUSCAR IMAGENES");
//			for (let product of this.products){
//				for ( let i = 0 ; i < product.images_length ; i++ ){
//					console.log("FETCHING IMAGES");
//					fetchImages(product,i)
//				}
//			}
//		}
	}

	componentWillUpdate(oldProps,oldState){
		console.log("OLDIE: ",oldState);
		console.log("NOWIE:",this.state);
			
	}

	render(){
		const onSubmit = ev => {
			ev.preventDefault();
			console.log("SUBMIT");
		}

		return (
			<form className="form-products-list" onSubmit= { onSubmit } >
				<h2 className="form-newProduct-heading"> Encuentra lo que buscas ! </h2>
				{ this.renderGallery() } 
			</form>
		)
	}

	renderGallery(){
		return(
			<div className="container">
				<div className="row">

					<div className="col-lg-12">
						<h1 className="page-header"> Encuentra lo que buscas ! </h1>
					</div>

						{this.state.products.map((product,i) =>{
							console.log(i);
							<div className="col-lg-3 col-md-4 col-xs-6 thumb" key= { i } >
							<a id= { i } className="thumbnail" href="#">
								<img className="img-responsive" src= { product.src }  alt=""/>
							</a>
							<div> <label htmlFor={ i }> {product.price} </label> </div>
							</div>
						})}


				</div>
			</div>
		)
	}
}


const mapStateToProps = state => {
	console.log("STATE CULEADO" , state);
	return {
		products : state.productsList.products

		//isFetching: state.newProduct.isFetching,
		//finished: state.newProduct.finished,
		//error: state.newProduct.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchProducts : (productName) => dispatch(fetchAll(productName)),

		//onNewProduct: (productName, productType, productPrice, productDescription,images) => dispatch(doNewProduct(productName, productType, parseFloat(productPrice), productDescription,images)),
		onChangePage: page => dispatch(changePageIfNeeded(page)),
		//invalidateProduct: () => dispatch(invalidateProduct())
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)

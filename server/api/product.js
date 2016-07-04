export function post(request, response, next){

	next.ifError(request.hasSessionError());
	next.ifError(request.params.validationError({
		// Tiene que devolver un id del producto
		// TODO: validar token
		// TODO: agregar fotos
		required: ['name', 'description', 'price','type'],
		properties: {
			token: {type: 'string'},
			name: {type: 'string', minLength: 5},
			description: {type: 'string', minLength: 10},
<<<<<<< Updated upstream
			price: {type: 'number'},
=======
			price: {type: 'integer', minimum: 0},
>>>>>>> Stashed changes
			type: {
				"enum" : [ "producto" , "servicio" , "servicio-profesional"]
			}
		}
	}));

<<<<<<< Updated upstream
	response.json(200,{sucess:true});
	next();
=======
	const query = `INSERT into products (name, description, price, type) VALUES(
		'${request.params.name}','${request.params.description}','${request.params.price}','${request.params.type}'
	) RETURNING id as PRODUCT_ID`;
	request.db.doQuery(query)
	.then( queryResult => {
		if (queryResult.rows.length > 0){
			const productId = queryResult.rows[0].product_id;
			return response.json(200,{productId} || -1 );
		}
	}).catch(err => response.send(new ApiError(500 , err)))
	.then( () => next());
}
>>>>>>> Stashed changes


// Dado un id devuelve un producto
export function get(request, response, next){
	next.ifError(request.params.validationError({
		required : ['productId'],
		properties: {
			productId: {type : 'string'}
		}
	}));

	const query = `SELECT * FROM products where id = '${request.params.productId}'`;

	request.db.doQuery(query)
	.then(queryResult => {
		var returnValue;
		if (queryResult.rows.length > 0){
			returnValue = queryResult.rows[0];
		}
		return response.json (200, returnValue || {})
	})
	.catch(err => res.send(new ApiError(500, err)))
	.then( () => next());
}

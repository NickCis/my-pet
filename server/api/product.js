export function post(request, response, next){

	next.ifError(request.hasSessionError());
	next.ifError(request.params.validationError({
		// Tiene que devolver un id del producto
		// TODO: validar token
		// TODO: agregar fotos
		required: ['name', 'description', 'price','type'],
		properties: {
			name: {type: 'string', minLength: 5},
			description: {type: 'string', minLength: 10},
			price: {type: 'integer', minimum: 0},
			type: {
				"enum" : [ "producto" , "servicio" , "servicio-profesional"]
			}
		}
	}));

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

// Busca todos los productos con los nombres que tengan substring el name pasado
// Es decir si tengo 3 productos : alimento canino, alimenento gatuno , alimento
// Y buscan alimento, va a devolver los 3.
export function get(request,response,next){
	next.ifError(request.params.validationError({
		required : [ 'name' ],
		properties : {
			name: { type : 'string', minLength: 5}
		}
	}));

	const query = `SELECT * FROM products WHERE name ~ '${request.params.name}'`;
	console.log(query);
	request.db.doQuery(query)
	.then(queryResult =>{
		var returnValue = [];
		if (queryResult.rows.length >0){
			returnValue = queryResult.rows;
		}
		return response.json(200,returnValue);
	})
    .catch(err => res.json(500, {error: err}))
    .then(() => next());
}

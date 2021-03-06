//Agrega un nuevo producto ejemplo 
//
//{
//		"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcGUxIiwiaWF0IjoxNDY4MDE1NDM4fQ.CFKDtiulzTTAGj09-xw8HMUxdAtGvnpL8oJmKmaau_o",
//	    "name":"correa",
//	    "description":"correa para ropes copada",
//	    "price":50030,
//	    "type":"product"
//}
//
//Devuelve el mismo objeto con el product_id agregado: 
//
///{
//		"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcGUxIiwiaWF0IjoxNDY4MDE1NDM4fQ.CFKDtiulzTTAGj09-xw8HMUxdAtGvnpL8oJmKmaau_o",
//	    "name":"correa",
//	    "description":"correa para ropes copada",
//	    "price":50030,
//	    "type":"product"
//	    "product_id": 10
//}/
export function post(request, response, next){
	//TODO: Como no puedo obtener el token desde react, no se lo pido mas
	next.ifError(request.hasSessionError());
	next.ifError(request.params.validationError({
		required: ['name', 'description', 'price', 'type', 'images'],
		properties: {
			name: {type: 'string', minLength: 4},
			description: {type: 'string', minLength: 2},
			price: {type: 'number', minimum: 0},
			type: {
				"enum" : [ "product" , "service" , "professional-service"]
			},
			images: {
				type: 'array',
				minLength: 1
			}
		}
	}));

	const nameLowerCase = request.params.name.toLowerCase();
	const query = `INSERT into products (name, description, price, type, images_length) VALUES(
		'${nameLowerCase}','${request.params.description}','${request.params.price}','${request.params.type}', ${request.params.images.length}
	) RETURNING id as PRODUCT_ID`;

	request.db.doQuery(query)
		.then( queryResult => {
			if(queryResult.rows.length < 0)
				return Promise.reject('Db Error');

			const product_id = queryResult.rows[0].product_id;

			let returnValue = {
				...request.params,
				product_id
			};

			delete returnValue['validationError'];
			response.json(200,returnValue);

			/*return*/ Promise.all(request.params.images.map(img => {
				const sql = `INSERT into product_images (id_product, image) VALUES (${product_id}, '${img}')`;
				return request.db.doQuery(sql);
			}))
		})
		.catch(err => response.send(new ApiError(500 , err)))
		.then( () => next());
}


// Dado un id devuelve un producto
// Ej: 
// localhost:8080/api/product/5
// Devuelve : 
//	{
//		"id": 5,
//		"name": "correa",
//		"description": "correa para ropes copada",
//		"price": 50030,
//		"type": "product"
//	}
export function get(request, response, next){
	next.ifError(request.params.validationError({
		required : ['id'],
		properties: {
			product_id: {type : 'integer'}
		}
	}));

	const requestedSearch = request.params.id.toLowerCase();
	const query = `SELECT * FROM products where id = '${request.params.id}'`;

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

export function getProductImage(req, res, next) {
	next.ifError(req.params.validationError({
		required : ['id', 'i'],
		properties: {
			id: {},
			i: {}
		}
	}));

	const sql = `select * from product_images where id_product = ${req.params.id} order by id ASC LIMIT 1 OFFSET ${req.params.i}`;

	return req.db.doQuery(sql)
		.then(result => {
			if(!result.rows.length)
				return res.send(404, '');

			const image = result.rows[0].image.replace(/^data:image\/(png|gif|jpe?g);base64,/,'');
			const buffer = new Buffer(image, 'base64');

			res.writeHead(200, {
				'Content-Length': buffer.length,
				'Content-Type': 'image/png'
			});

			res.write(buffer);
			res.end();
		})
		.catch(err => res.send(new ApiError(500, err)))
		.then(() => next());
}

// Busca todos los productos con los nombres que tengan substring el name pasado
// Es decir si tengo 3 productos : alimento canino, alimenento gatuno , alimento
// Y buscan alimento, va a devolver los 3.
export function getWithName(request,response,next){
	next.ifError(request.params.validationError({
		required : [ 'name' ],
		properties : {
			name: { type : 'string', minLength: 0}
		}
	}));

	const nameLowerCase = request.params.name.toLowerCase();
	const query = `SELECT * FROM products WHERE name ~ '${nameLowerCase}'`;
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

// Remueve el producto de la base de datos, para una venta por ejemplo
export function deleteProduct(request, response, next){
	next.ifError(request.params.validationError({
		required : ['id'],
		properties: {
			product_id: {type : 'integer'}
		}
	}));

	const query = `DELETE FROM products where id = '${request.params.id}' RETURNING id as PRODUCT_ID`;

	console.log("SERVER QUERY :" ,query);
	request.db.doQuery(query)
	.then(queryResult => {

		console.log("QUERY RESULT :::" ,queryResult);
		if (queryResult.rows.length >0){
			const product_id = queryResult.rows[0].product_id;
			return response.json (200, {deleted: product_id});
		}else{
			return response.json (404, {status: "Not Found"});
		}
	})
	.catch(err => res.send(new ApiError(500, err)))
	.then( () => next());
}

export function post(request, response, next){
	next.ifError(request.params.validationError({
		// Tiene que devolver un id del producto
		// TODO: validar token
		// TODO: agregar fotos
		required: ['token', 'name', 'description', 'price','type'],
		properties: {
			token: {type: 'string'},
			name: {type: 'string', minLength: 5},
			description: {type: 'string', minLength: 10},
			price: {type: 'number'},
			type: {
				"enum" : [ "producto" , "servicio" , "servicio-profesional"]
			}
		}
	}));

	response.json(200,{sucess:true});
	next();

}

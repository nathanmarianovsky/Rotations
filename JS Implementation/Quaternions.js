// Computes the dot product of two vectors
exports.dot_product = function(u,v) {
	var product = 0;
	for(var i = 0; i < u.length; i++) {
		product += u[i] * v[i];
	}
	return product;
};


// Computes the cross product of two vectors in three dimensional space
exports.cross_product = function(u,v) {
	var product = [
		(u[1] * v[2]) - (u[2] * v[1]),
		(u[2] * v[0]) - (u[0] * v[2]),
		(u[0] * v[1]) - (u[1] * v[0])
	];
	return product;
};


// Computes the product of two quaternions using the cross and dot products
exports.quaternion_multiplication = function(p,q) {
	var product = [],
		p_knot = p[0],
		q_knot = q[0],
		p_vector = p.splice(1),
		q_vector = q.splice(1); 
	product.push((p_knot * q_knot) - exports.dot_product(p_vector,q_vector));
	for(var i = 0; i < p_vector.length; i++) {
		p_vector[i] *= q_knot;
		q_vector[i] *= p_knot;
	}
	var cross = exports.cross_product(p_vector,q_vector);
	var vector = [];
	for(var i = 0; i < p_vector.length; i++) {
		vector.push(p_vector[i] + q_vector[i] + cross[i]);
	}
	return product.concat(vector);
};


// Normalizes the given axis of rotation
exports.normalize = function(obj) {
	var norm_squared = 0;
	for(var i = 0; i < obj["axis"].length; i++) {
		norm_squared += Math.pow(obj["axis"][i],2);
	}
	for(var j = 0; j < obj["axis"].length; j++) {
		obj["axis"][j] = obj["axis"][j] / Math.sqrt(norm_squared);
	}
	return obj;
};


// Transforms all inputs to numbers
exports.transform_type = function(obj) {
	obj["alpha"] = parseInt(obj["alpha"]);
	for(var i = 0; i < obj["axis"].length; i++) {
		obj["axis"][i] = parseInt(obj["axis"][i]);
	}
	for(var j = 0; j < obj["vector"].length; j++) {
		obj["vector"][j] = parseInt(obj["vector"][j]);
	}
	return obj;
};


// The quaternion rotation mapping which return the rotated vector
exports.mapping = function(obj) {
	var quaternion = [
			Math.cos(parseInt(obj["alpha"]) * (Math.PI / 360)), 
			obj["axis"][0] * Math.sin(obj["alpha"] * (Math.PI / 360)),
			obj["axis"][1] * Math.sin(obj["alpha"] * (Math.PI / 360)),
			obj["axis"][2] * Math.sin(obj["alpha"] * (Math.PI / 360))
		],
		quaternion_inverse = [
			Math.cos(parseInt(obj["alpha"]) * (Math.PI / 360)), 
			-obj["axis"][0] * Math.sin(obj["alpha"] * (Math.PI / 360)),
			-obj["axis"][1] * Math.sin(obj["alpha"] * (Math.PI / 360)),
			-obj["axis"][2] * Math.sin(obj["alpha"] * (Math.PI / 360))
		];
	var first_product = exports.quaternion_multiplication(obj["vector"], quaternion_inverse);
	return exports.quaternion_multiplication(quaternion, first_product);
};
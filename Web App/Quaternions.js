var exports = {},
	math = require("mathjs");

// Computes the product of two quaternions using the cross and dot products
exports.quaternion_multiplication = (p,q) => {
	var product = [],
		vector = [],
		p_knot = p[0],
		q_knot = q[0],
		p_vector = p.slice(1),
		q_vector = q.slice(1); 
	product.push((p_knot * q_knot) - math.dot(p_vector,q_vector));
	var cross = math.cross(p_vector,q_vector);
	for(var i = 0; i < p_vector.length; i++) { vector.push((q_knot * p_vector[i]) + (p_knot * q_vector[i]) + cross[i]); }
	return product.concat(vector);
};

// Normalizes the given axis of rotation
exports.normalize = axis => {
	var norm_squared = axis.reduce((left, right) => left + math.pow(right, 2));
	if(norm_squared != 1) { axis = axis.map(elem => elem / math.sqrt(norm_squared)); }
	return axis;
};

// Performs the quaternion rotation mapping which returns the rotated vector
exports.mapping = (alpha, axis, vector) => {
	var first_product = [],
		angle = alpha * (Math.PI / 180),
		vec = [];
	vec.push(0);
	vec = vec.concat(vector);
	var quaternion = [
			math.cos(angle / 2), 
			axis[0] * math.sin(angle / 2),
			axis[1] * math.sin(angle / 2),
			axis[2] * math.sin(angle / 2)
		],
		quaternion_inverse = [
			math.cos(angle / 2), 
			-axis[0] * math.sin(angle / 2),
			-axis[1] * math.sin(angle / 2),
			-axis[2] * math.sin(angle / 2)
		];
	first_product = exports.quaternion_multiplication(quaternion, vec);
	return (exports.quaternion_multiplication(first_product, quaternion_inverse)).map(elem => elem.toFixed(6)).splice(1);
};

module.exports = exports;
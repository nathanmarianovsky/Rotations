var readline = require('readline'),
	rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

var dot_product = function(u,v) {
	var product = 0;
	for(var i = 0; i < u.length; i++) {
		product += u[i] * v[i];
	}
	return product;
};

var cross_product = function(u,v) {
	var product = [
		(u[1] * v[2]) - (u[2] - v[1]),
		(u[2] * v[0]) - (u[0] * v[2]),
		(u[0] * v[1]) - (u[1] * v[0])
	];
	return product;
};

var quaternion_multiplication = function(p,q) {
	var product = [],
		p_vector = p.splice(0,1),
		q_vector = q.splice(0,1);
	product.push((p[0] * q[0]) - dot_product(p_vector,q_vector));
	for(var i = 0; i < p_vector.length; i++) {
		p_vector[i] *= q[0];
		q_vector[i] *= p[0];
	}
	var cross = cross_product(p_vector,q_vector);
	var vector = [];
	for(var i = 0; i < p_vector.length; i++) {
		vector.push(p_vector[i] + q_vector[i] + cross[i]);
	}
	product.concat(vector);
	return product;
};

var normalize = function(obj) {
	var norm_squared = 0;
	for(var i = 0; i < obj["axis"].length; i++) {
		norm_squared += Math.pow(parseInt(obj["axis"][i]),2);
	}
	for(var j = 0; j < obj["axis"].length; j++) {
		obj["axis"][j] = parseInt(obj["axis"][j]) / Math.sqrt(norm_squared);
	}
	return obj;
};

var mapping = function(obj) {
	var angle = parseInt(obj["alpha"]) * (Math.PI / 180),
		quaternion = [
			Math.cos(angle / 2), 
			parseInt(obj["axis"][0]) * Math.sin(angle / 2),
			parseInt(obj["axis"][1]) * Math.sin(angle / 2),
			parseInt(obj["axis"][2]) * Math.sin(angle / 2)
		],
		quaternion_inverse = [
			Math.cos(angle / 2), 
			-parseInt(obj["axis"][0]) * Math.sin(angle / 2),
			-parseInt(obj["axis"][1]) * Math.sin(angle / 2),
			-parseInt(obj["axis"][2]) * Math.sin(angle / 2)
		];
	var first_product = quaternion_multiplication(obj["vector"], quaternion_inverse);
	return quaternion_multiplication(quaternion, first_product);
};

var input = function() {
	rl.write("This code will perform a rotation on a vector in R^3, v, about an axis with an angle, alpha, according to the right hand rule by utilizing the quaternion mapping. In order to do this task I will need from you the following:\n");
	rl.write("For the angle since it is annoying to put everything in terms of radians, I ask that you just put the angle. For example, instead of somehow inputing PI/3, I want to see 60 as the input.\n");
	rl.question("Angle (alpha): ", function(answer) {
		var alpha = answer;
		rl.write("Now for the axis of rotation I leave it up to you whether you input a normalized vector or not. I will normalize it nonetheless since the only part needed is the direction. I only ask that for the input you separate each component by a single whitespace.\n")
		rl.question("Axis (u): ", function(answer) {
			var axis = answer.split(" ");
			rl.write("Same as before please separate each component by a single whitespace.\n");
			rl.question("Vector (v): ", function(answer) {
				var vector = answer.split(" ");
				rl.close();
				var obj = {
					"alpha": alpha,
					"axis": axis,
					"vector": [0].concat(vector)
				};
			});
		});
	});
};

var obj = {
	"alpha": 60,
	"axis": [1,2,3],
	"vector": [4,5,6]
};
normalize(obj);
console.log(mapping(obj));
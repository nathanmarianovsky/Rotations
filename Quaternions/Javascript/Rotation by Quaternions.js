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
		(u[1] * v[2]) - (u[2] * v[1]),
		(u[2] * v[0]) - (u[0] * v[2]),
		(u[0] * v[1]) - (u[1] * v[0])
	];
	return product;
};

var quaternion_multiplication = function(p,q) {
	// for(var i = 0; i < p.length; i++) {
	// 	p[i] = parseInt(p[i]);
	// 	q[i] = parseInt(q[i]);
	// }
	var product = [],
		p_knot = p[0],
		q_knot = q[0],
		p_vector = p.splice(1),
		q_vector = q.splice(1); 
	// var tmp = (p_knot * q_knot);
	// console.log(p_vector);
	// console.log(q_vector);
	// var	tmp2 = dot_product(p_vector,q_vector);
	// console.log(tmp);
	// console.log(tmp2);
	product.push((p_knot * q_knot) - dot_product(p_vector,q_vector));
	// console.log(product);
	for(var i = 0; i < p_vector.length; i++) {
		p_vector[i] *= q_knot;
		q_vector[i] *= p_knot;
	}
	var cross = cross_product(p_vector,q_vector);
	// console.log(cross);
	var vector = [];
	for(var i = 0; i < p_vector.length; i++) {
		// console.log(vector);
		vector.push(p_vector[i] + q_vector[i] + cross[i]);
	}
	// console.log(vector);
	return product.concat(vector);
};

var normalize = function(obj) {
	var norm_squared = 0;
	for(var i = 0; i < obj["axis"].length; i++) {
		norm_squared += Math.pow(obj["axis"][i],2);
	}
	for(var j = 0; j < obj["axis"].length; j++) {
		obj["axis"][j] = obj["axis"][j] / Math.sqrt(norm_squared);
	}
	return obj;
};

var transform_type = function(obj) {
	obj["alpha"] = parseInt(obj["alpha"]);
	for(var i = 0; i < obj["axis"].length; i++) {
		obj["axis"][i] = parseInt(obj["axis"][i]);
	}
	for(var j = 0; j < obj["vector"].length; j++) {
		obj["vector"][j] = parseInt(obj["vector"][j]);
	}
	return obj;
};

var mapping = function(obj) {
	// console.log(parseInt(obj["alpha"]));
	// console.log(Math.PI / 360);
	// console.log(obj["axis"]);
	// console.log(Math.sin(parseInt(obj["alpha"]) * (Math.PI / 360)));
	// console.log(obj["axis"][0]);
	// console.log(parseInt(obj["axis"][0]) * Math.sin(parseInt(obj["alpha"]) * (Math.PI / 360)));
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
	console.log(obj);
	console.log(quaternion);
	console.log(quaternion_inverse);
	var first_product = quaternion_multiplication(obj["vector"], quaternion_inverse);
	console.log(first_product);
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
	"alpha": 120,
	"axis": [1,2,3],
	"vector": [0,4,5,6]
};
transform_type(obj);
normalize(obj);
console.log(mapping(obj));

// console.log(Math.cos(60 * (Math.PI / 360)));

// var u = [2,1,1,1],
// 	v = [7,2,2,3];
// console.log(quaternion_multiplication(u,v));
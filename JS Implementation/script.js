// Necessary components
var readline = require("readline"),
	quaternions = require("./quaternions"),
	matrix_rotation = require("./matrix_rotation"),
	rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});


// Transforms all inputs to numbers
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


// Performs the rotation by utilizing quaternions
var quaternion_map = function(alpha, axis, vector) {
	var obj = {
		"alpha": alpha,
		"axis": axis,
		"vector": vector
	};
	transform_type(obj);
	quaternions.normalize(obj);
	rl.write("The rotated vector is given by:\n");
	console.log(quaternions.mapping(obj).splice(1));
	console.timeEnd("Time");
	process.exit();
};


// Performs the rotation by utilizing a rotation matrix
var matrix_map = function(alpha, axis, vector) {
	var obj = {
		"alpha": alpha,
		"axis": axis,
		"vector": vector
	};
	transform_type(obj);
	var normalized_axis = matrix_rotation.normalize(obj["axis"]);
	var matrix = matrix_rotation.matrix(normalized_axis, obj["alpha"]);
	rl.write("The rotated vector is given by:\n");
	console.log(matrix_rotation.mapping(matrix, obj["vector"]));
	console.timeEnd("Time");
	process.exit();
};


// Ask for the input and decide which rotation to use
rl.write("This code will perform a rotation on a vector in R^3, v, about an axis, u, with an angle, alpha, according to the right hand rule. To start I need the following:\n");
rl.write("For the angle provide me with a numerical value in units of degrees. For example, instead of somehow inputing PI/3, I want to see 60 as the input.\n");
rl.question("Angle (alpha): ", function(answer) {
	var alpha = answer;
	rl.write("Now for the axis of rotation I leave it up to you whether you input a normalized vector or not. I will normalize it nonetheless since the only part needed is the direction. I only ask that for the input you separate each component by a single whitespace.\n")
	rl.question("Axis (u): ", function(answer) {
		var axis = answer.split(" ");
		rl.write("For the vector you want to rotate, same as before please separate each component by a single whitespace.\n");
		rl.question("Vector (v): ", function(answer) {
			var vector = answer.split(" ");
			rl.question("Now the final question I have for you: How do you want to perform the rotation? Currently there are two choices, quaternions and matrix rotations. To use type 'Q' for quaternion and 'M' for matrix: ", function(answer) {
				console.time("Time");
				if(answer == "Q") {
					quaternion_map(alpha, axis, vector);
				}
				else if(answer == "M") {
					matrix_map(alpha, axis, vector);
				}
			});
		});
	});
});
var exports = {},
	math = require("mathjs"),
	normal = require("./normalize");

// Creates the matrix of rotation about an axis with some angle where each array in the matrix array represents a row vector
exports.matrix_creation = (axis_arr, angle) => {
	var alpha = angle * (Math.PI / 180);
	axis_arr = normal.normalize(axis_arr);
	var matrix = [
		[
			(Math.cos(alpha) * (1 - Math.pow(axis_arr[0],2))) + Math.pow(axis_arr[0],2),
			(axis_arr[0] * axis_arr[1] * (1 - Math.cos(alpha))) - (axis_arr[2] * Math.sin(alpha)),
			(axis_arr[0] * axis_arr[2] * (1 - Math.cos(alpha))) + (axis_arr[1] * Math.sin(alpha))
		],
		[
			(axis_arr[0] * axis_arr[1] * (1 - Math.cos(alpha))) + (axis_arr[2] * Math.sin(alpha)),
			(Math.cos(alpha) * (1 - Math.pow(axis_arr[1],2))) + Math.pow(axis_arr[1],2),
			(axis_arr[1] * axis_arr[2] * (1 - Math.cos(alpha))) - (axis_arr[0] * Math.sin(alpha))
		],
		[
			(axis_arr[0] * axis_arr[2] * (1 - Math.cos(alpha))) - (axis_arr[1] * Math.sin(alpha)),
			(axis_arr[1] * axis_arr[2] * (1 - Math.cos(alpha))) + (axis_arr[0] * Math.sin(alpha)),
			(Math.cos(alpha) * (1 - Math.pow(axis_arr[2],2))) + Math.pow(axis_arr[2],2)
		]
	];
	return matrix;
};

// Performs the matrix rotation mapping which returns the rotated vector
exports.mapping = (alpha, axis, vector) => { 
	var matrix = exports.matrix_creation(axis, alpha);
	return math.multiply(matrix, vector).map(elem => elem.toFixed(6)); 
};

module.exports = exports;
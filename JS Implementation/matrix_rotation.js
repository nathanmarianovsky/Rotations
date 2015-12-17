// Creates the matrix of rotation about an axis with some angle where each array in the matrix array represents a row vector
exports.matrix = function(axis_arr, angle) {
	var alpha = angle * (Math.PI / 180);
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


// Normalizes the given axis of rotation
exports.normalize = function(axis_arr) {
	var norm_squared = 0;
	for(var i = 0; i < axis_arr.length; i++) {
		norm_squared += Math.pow(axis_arr[i],2);
	}
	if(norm_squared != 1) {
		for(var j = 0; j < axis_arr.length; j++) {
			axis_arr[j] = axis_arr[j] / Math.sqrt(norm_squared);
		}
	}
	return axis_arr;
};


// Performs the matrix rotation mapping which returns the rotated vector
exports.mapping = function(matrix, vector) {
	var result = [];
	for(var i = 0; i < matrix.length; i++) {
		var sum = 0;
		for(var j = 0; j < matrix[i].length; j++) {
			sum += matrix[i][j] * vector[j];
		}
		result.push(sum);
	}
	return result;
};
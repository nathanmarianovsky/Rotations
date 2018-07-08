var product = require("./quaternions");
// To perform the rotation using a rotation matrix comment the line above and uncomment the one below:
var product = require("./matrix");

// Declare the inputs
var alpha = 90, // Enter any value 0 <= alpha <= 360
	axis = [0, 0, 1], // Any axis is valid (even a non-normalized one)
	vector = [1, 0, 0]; // Any vector is allowed

// Output the result
var output = product.mapping(alpha, axis, vector);
console.log("Rotating the vector, (" + vector[0] + "," + vector[1] + "," + 
	vector[2] + "), about the axis, (" + axis[0] + "," + axis[1] + "," + 
	axis[2] + "), with a " + alpha + " degree angle provides the result: (" + 
	output[0] + "," + output[1] + "," + output[2] + ").");
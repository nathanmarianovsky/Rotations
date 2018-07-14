// Declare the necessary variables
var fs = require("fs"),
	product = require("./quaternions");
// To perform the rotation using a rotation matrix comment the line above and uncomment the one below:
	// product = require("./matrix");

fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var rows = data.split("\n").map(elem => elem.split("\r")[0]),
		alpha = parseFloat(rows[1]),
		axis = rows[3].split(","),
		vector = rows[5].split(",");
	axis[0] = parseFloat(axis[0].split("[")[1]);
	axis[1] = parseFloat(axis[1]);
	axis[2] = parseFloat(axis[2].split("]")[0]);
	vector[0] = parseFloat(vector[0].split("[")[1]);
	vector[1] = parseFloat(vector[1]);
	vector[2] = parseFloat(vector[2].split("]")[0]);
	if(isNaN(alpha) || axis.some(elem => isNaN(elem)) || vector.some(elem => isNaN(elem))) {
		console.log("There was an issue parsing either the angle, axis of rotation, or vector!")
	}
	else {
		var output = product.mapping(alpha, axis, vector);
		console.log("Rotating the vector, (" + vector[0] + "," + vector[1] + "," + 
			vector[2] + "), about the axis, (" + axis[0] + "," + axis[1] + "," + 
			axis[2] + "), with a " + alpha + " degree angle provides the result: (" + 
			output[0] + "," + output[1] + "," + output[2] + ").");
	}
});
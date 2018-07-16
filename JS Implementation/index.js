// Declare the necessary variables
var fs = require("fs");

// Read and parse the input. Compute the rotated vector and output the result if there is one. 
fs.readFile("input.txt", "utf8", (err, data) => {
	if(err) { throw err; }
	var rows = data.split("\n").map(elem => elem.split("\r")[0]),
		alpha = parseFloat(rows[1]),
		axis = rows[3].split(","),
		vector = rows[5].split(","),
		product0 = undefined,
		product1 = undefined,
		method0 = "",
		method1 = "";
	if(process.argv.length > 3) {
		console.log("You have provided too many parameters!");
	}
	else if(process.argv.length == 2 || process.argv[2] == "-q" || process.argv[2] == "-m") {
		axis[0] = parseFloat(axis[0].split("[")[1]);
		axis[1] = parseFloat(axis[1]);
		axis[2] = parseFloat(axis[2].split("]")[0]);
		vector[0] = parseFloat(vector[0].split("[")[1]);
		vector[1] = parseFloat(vector[1]);
		vector[2] = parseFloat(vector[2].split("]")[0]);
		if(process.argv.length == 2) {
			product0 = require("./quaternions");
			product1 = require("./matrix");
			method0 = "quaternions";
			method1 = "rotation matrices";
		}
		else if(process.argv[2] == "-q") {
			product0 = require("./quaternions");
			method0 = "quaternions";
		}
		else if(process.argv[2] == "-m") {
			product0 = require("./matrix");
			method0 = "rotation matrices";
		}
		if(isNaN(alpha) || axis.some(elem => isNaN(elem)) || vector.some(elem => isNaN(elem))) {
			console.log("There was an issue parsing either the angle, axis of rotation, or vector!")
		}
		else {
			console.log("");
			console.log("-----------------------------------------------------------------------------");
			var	timer0 = process.hrtime(),
				output0 = product0.mapping(alpha, axis, vector);
			timer0 = process.hrtime(timer0).toString().split(",");
			console.log("Quaternions Method: " + timer0[0] + " seconds and " + timer0[1] + " nanoseconds");
			console.log("Rotating the vector, (" + vector[0] + "," + vector[1] + "," + 
				vector[2] + "), about the axis, (" + axis[0] + "," + axis[1] + "," + 
				axis[2] + "), with a " + alpha + " degree angle using the method of " + 
				method0 + " provides the result: (" + output0[0] + "," + output0[1] + "," + 
				output0[2] + ").");
			console.log("-----------------------------------------------------------------------------");
			if(product1 !== undefined) {
				var	timer1 = process.hrtime(),
					output1 = product1.mapping(alpha, axis, vector);
				timer1 = process.hrtime(timer1).toString().split(",");
				console.log("Rotation Matrices Method: " + timer1[0] + " seconds and " + timer1[1] + " nanoseconds");
				console.log("Rotating the vector, (" + vector[0] + "," + vector[1] + "," + 
					vector[2] + "), about the axis, (" + axis[0] + "," + axis[1] + "," + 
					axis[2] + "), with a " + alpha + " degree angle using the method of " + 
					method0 + " provides the result: (" + output1[0] + "," + output1[1] + "," + 
					output1[2] + ").");
				console.log("-----------------------------------------------------------------------------");
			}
			console.log("");
		}
	}
	else {
		console.log("The parameter provided is not one of the accepted values!");
	}
});
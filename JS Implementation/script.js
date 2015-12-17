var readline = require("readline"),
	quaternions = require("./quaternions"),
	matrix_rotation = require("./matrix_rotation"),
	rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

// var reading_angle = function() {
// 	rl.question("Angle (alpha): ", function(answer) {
// 		if(!isNaN(answer) && answer != "") {
// 			return answer;
// 		}
// 		reading_angle();
// 	});
// };

// var reading_axis = function() {
// 	rl.write("Now for the axis of rotation I leave it up to you whether you input a normalized vector or not. I will normalize it nonetheless since the only part needed is the direction. I only ask that for the input you separate each component by a single whitespace.\n");
// 	rl.question("Axis (u): ", function(answer) {
// 		var arr = answer.split(" ");
// 		if(answer.length == 3) {
// 			var i = 0;
// 			for(; i < answer.length; i++) {
// 				if(isNaN(answer[i]) || answer[i] == "") {
// 					break;
// 				}
// 			}
// 			if(i == answer.length) {
// 				return arr;
// 			}
// 		}
// 		reading_axis();
// 	});
// };

// var reading_vector = function() {
// 	rl.write("Same as before please separate each component by a single whitespace.\n");
// 	rl.question("Vector (v): ", function(answer) {
// 		var arr = answer.split(" ");
// 		if(answer.length == 3) {
// 			var i = 0;
// 			for(; i < answer.length; i++) {
// 				if(isNaN(answer[i]) || answer[i] == "") {
// 					break;
// 				}
// 			}
// 			if(i == answer.length) {
// 				return arr;
// 			}
// 		}
// 		reading_vector();
// 	});
// };

var quaternion_map = function() {
	rl.write("For the angle provide me with a numerical value in units of degrees. For example, instead of somehow inputing PI/3, I want to see 60 as the input.\n");
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
				quaternions.transform_type(obj);
				quaternions.normalize(obj);
				rl.write("The rotated vector is given by:\n");
				console.log(quaternions.mapping(obj).splice(1));
				process.exit();
			});
		});
	});
};

var matrix_map = function() {
	rl.write("For the angle provide me with a numerical value in units of degrees. For example, instead of somehow inputing PI/3, I want to see 60 as the input.\n");
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
					"vector": vector
				};
				quaternions.transform_type(obj);
				var normalized_axis = matrix_rotation.normalize(obj["axis"]);
				var matrix = matrix_rotation.matrix(normalized_axis, obj["alpha"]);
				console.log(matrix);
				rl.write("The rotated vector is given by:\n");
				console.log(matrix_rotation.mapping(matrix, obj["vector"]));
				process.exit();
			});
		});
	});
};

rl.write("This code will perform a rotation on a vector in R^3, v, about an axis, u, with an angle, alpha, according to the right hand rule. Currently there are two methods to obtain the rotated vector: Quaternion or Rotation Matrix.\n");
rl.question("If you want to use Quaternions, type 'Q', or for Rotation Matrix, type 'RM': ", function(answer) {
	if(answer == "Q") {
		quaternion_map();
	}
	else if(answer == "RM") {
		matrix_map();
	}
});
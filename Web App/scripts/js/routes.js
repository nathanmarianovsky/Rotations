var exports = {},
	matrix = require("../math/matrix"),
	quaternions = require("../math/quaternions");

// Adds all of the client routes
exports.add_routes = app => {
	// Default url will redirect to /client/about
	app.get("/", (request, response) => {
		// response.redirect("/client/about");
		response.sendFile("./client/template.html", { "root": "./" });
	});


	// All routes for computation
	app.get("/:method/:angle/:axis/:vector", (request, response) => {
		// response.sendFile("./client/dist/template-min.html", { "root": "./" });
		var angle = Number(request.params.angle),
			axis = (request.params.axis.split("_")).map(elem => Number(elem)),
			vector = (request.params.vector.split("_")).map(elem => Number(elem)),
			method = request.params.method;
		if(method == "quaternion") {
			result = quaternions.mapping(angle, axis, vector);
		}
		else if(method == "matrix") {
			result = matrix.mapping(angle, axis, vector);
		}
		response.send(result);
	});
};

module.exports = exports;
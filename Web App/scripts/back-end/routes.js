var exports = {},
	matrix = require("../math/matrix"),
	quaternions = require("../math/quaternions");

// Adds all of the client routes
exports.add_routes = app => {
	// Default url
	app.get("/", (request, response) => {
		response.sendFile("./client/template.html", { "root": "./" });
	});

	// Any such url will redirect to the default
	app.get("/:first", (request, response) => { response.redirect("/"); });

	// Any such url will redirect to the default
	app.get("/:first/:second", (request, response) => { response.redirect("/"); });

	// Any such url will redirect to the default
	app.get("/:first/:second/:third", (request, response) => { response.redirect("/"); });

	// Any such url will redirect to the default
	app.get("/:first/:second/:third/:fourth/:fifth", (request, response) => { 
		request.params.first == "rotation" ? response.sendFile("./client/template.html", { "root": "./" }) : response.redirect("/");
		// response.redirect("/"); 
	});

	// Any such url will redirect to the default
	app.get("/:first/:second/:third/:fourth/:fifth/*", (request, response) => { response.redirect("/"); });

	// All routes for computation
	app.get("/:method/:angle/:axis/:vector", (request, response) => {
		var angle = request.params.angle,
			axis = request.params.axis.split("-"),
			vector = request.params.vector.split("-"),
			method = request.params.method;
		if(!axis.some(elem => Number(elem) != elem || elem === "") && !vector.some(elem => Number(elem) != elem || elem === "") && Number(angle) == angle) {
			if(axis.length === 3 && vector.length === 3) {
				angle = Number(angle);
				axis = axis.map(elem => Number(elem));
				vector = vector.map(elem => Number(elem));
				if(method == "quaternion") {
					result = quaternions.mapping(angle, axis, vector);
				}
				else if(method == "matrix") {
					result = matrix.mapping(angle, axis, vector);
				}
				else {
					result = "There is no such method!";
				}
			}
			else {
				result = "Not enought components in either the axis or vector!";
			}
		}
		else {
			result = "One of the arguments is not a number!";
		}
		response.send(result);
	});
};

module.exports = exports;
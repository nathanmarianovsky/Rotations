define(["jquery", "materialize", "router5", "mathjax", "app/links", "app/routes", "three"], ($, Materialize, router5, MathJax, links, routes, THREE) => {
	$(function() {
		var router = new router5.Router5([
			new router5.RouteNode("def", "/"),
			new router5.RouteNode("method", "/rotation/:method", [
				new router5.RouteNode("angle", "/:angle", [
					new router5.RouteNode("axis", "/:axis", [
						new router5.RouteNode("output", "/:vector")
					])
				])
			])
		],{
			defaultRoute: "def"
		});
		routes.add_listeners(router);
		router.start();
	});
});
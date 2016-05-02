define(["jquery", "app/links"], ($, links) => {
	var exports = {};

	exports.add_listeners = router => {
		router.addRouteListener("def", (toState, fromState) => {
			$.get("/client/input.html").done(data => {
				$("body").empty();
				$("body").append(data);
				$('select').material_select();
				requirejs(["/node_modules/masonry-layout/dist/masonry.pkgd.js",], Masonry => {
				    new Masonry( '.grid', {
				        columnWidth: ".grid-sizer",
				        itemSelector: ".grid-item"
				    });
				});
				links.add_links(router);
			});
		});

		router.addRouteListener("method.angle.axis.output", (toState, fromState) => {
			var angle = toState.params.angle,
				axisArr = toState.params.axis.split("-"),
				vectorArr = toState.params.vector.split("-"),
				method = toState.params.method,
				axis = toState.params.axis,
				vector = toState.params.vector,
				text = [];
			$.get("/client/output.html").done(data => {
				$("body").empty();
				$("body").append(data);
				$.get("/" + method + "/" + angle + "/" + axis + "/" + vector).done(data => {
					$("#axis-form .input-field").append($("<div>").addClass("center").text("$\\eqalign{\\begin{pmatrix} " + Number(axisArr[0]).toFixed(6) + " \\\\ " + Number(axisArr[1]).toFixed(6) + " \\\\ " + Number(axisArr[2]).toFixed(6) + " \\end{pmatrix}}$"));
					$("#vector-form .input-field").append($("<div>").addClass("center").text("$\\eqalign{\\begin{pmatrix} " + Number(vectorArr[0]).toFixed(6) + " \\\\ " + Number(vectorArr[1]).toFixed(6) + " \\\\ " + Number(vectorArr[2]).toFixed(6) + " \\end{pmatrix}}$"));
					$("#angle-form .input-field").append($("<div>").addClass("center").text("$" + Number(angle).toFixed(6) + "^\\circ$"));
					method == "quaternion" ? $("#method-form .input-field").append($("<div>").addClass("center").text("Quaternions")) : $("#method-form .input-field").append($("<div>").addClass("center").text("Rotation Matrix"));
					$("#result-form .input-field").append($("<div>").addClass("center").text("$\\eqalign{\\begin{pmatrix} " + data[0] + " \\\\ " + data[1] + " \\\\ " + data[2] + " \\end{pmatrix}}$"));
					requirejs(["/node_modules/masonry-layout/dist/masonry.pkgd.js",], Masonry => {
					    new Masonry( '.grid', {
					        columnWidth: ".grid-sizer",
					        itemSelector: ".grid-item"
					    });
					});
					links.add_links(router);
					MathJax.Hub.Queue(["Typeset",MathJax.Hub,"main"]);
				});
			});
		});
	};

	return exports;
});
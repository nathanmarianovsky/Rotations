define(["jquery", "router5"], ($, router5) => {
	var exports = {};

	exports.check_input = input => { return Number(input) == input && input !== ""; };

	exports.add_links = router => {
		$("#clear").click(event => {
			event.preventDefault();
			var arr = ["angle-form", "axis-form", "vector-form", "method-form"];
			arr.forEach(iter => {
				$("#" + iter)[0].reset();
			});
		});
		$("#click").click(event => {
			event.preventDefault();
			var arr = ["angle-value", "axis-x", "axis-y", "axis-z", "vector-x", "vector-y", "vector-z"];
			if(arr.some(elem => exports.check_input($("#" + elem).val()) !== true)) { alert("Either you have not provided all of the necessary information or one of the values is not a number!"); }
			else {
				var method = "",
					angle = "",
					axis = "",
					vector = "",
					text = [],
					titleArr = [],
					grid = $("<div>").addClass("grid");
				$("#method").val() == 1 ? method = "quaternion" : method = "matrix";
				$("#angle-type").val() == 1 ? angle = $("#angle-value").val() : angle = Number($("#angle-value").val()) * (180 / Math.PI);
				axis = $("#axis-x").val() + "-" + $("#axis-y").val() + "-" + $("#axis-z").val();
				vector = $("#vector-x").val() + "-" + $("#vector-y").val() + "-" + $("#vector-z").val();
				router.navigate("method.angle.axis.output", {method: method, angle: angle, axis: axis, vector: vector});
			}
		});
		$("#input").click(event => {
			event.preventDefault();
			router.navigate("def");
		});
	};

	return exports;
});
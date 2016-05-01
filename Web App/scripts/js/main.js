define(["jquery", "materialize", "mathjax", "three"], ($, Materialize, MathJax, THREE) => {
	$(function() {

		var check_input = input => { return Number(input) == input && input !== ""; };

		$('select').material_select();

		$("#click").click(event => {
			event.preventDefault();
			var arr = ["angle-value", "axis-x", "axis-y", "axis-z", "vector-x", "vector-y", "vector-z"];
			if(arr.some(elem => check_input($("#" + elem).val()) !== true)) { alert("Either you have not provided all of the necessary information or one of the values is not a number!"); }
			else {
				var method = "",
					angle = "",
					axis = "",
					vector = "",
					text = "",
					gridItem = $("<div>").addClass("grid-item"),
					row1 = $("<div>").addClass("row"),
					form = $("<form>").addClass("col s12"),
					row2 = $("<div>").addClass("row"),
					title = $("<h4>").addClass("center").text("Rotated Vector"),
					inputField = $("<div>").addClass("input-field col s12 center");
				$("#method").val() == 1 ? method = "quaternion" : method = "matrix";
				$("#angle-type").val() == 1 ? angle = $("#angle-value").val() : angle = Number($("#angle-value").val()) * (180 / Math.PI);
				axis = $("#axis-x").val() + "-" + $("#axis-y").val() + "-" + $("#axis-z").val();
				vector = $("#vector-x").val() + "-" + $("#vector-y").val() + "-" + $("#vector-z").val();
				$.get("/" + method + "/" + angle + "/" + axis + "/" + vector).done(data => {
					text = "You provided the axis, $\\eqalign{\\begin{pmatrix} " + $("#axis-x").val() + " \\\\ " + $("#axis-y").val() + " \\\\ " + $("#axis-z").val() + " \\end{pmatrix}}$, wanting to rotate the vector, $\\eqalign{\\begin{pmatrix} " + $("#vector-x").val() + " \\\\ " + $("#vector-y").val() + " \\\\ " + $("#vector-z").val() + " \\end{pmatrix}}$, by " + angle + " degrees. With the use of the " + method + " method, the result is, $\\eqalign{\\begin{pmatrix} " + data[0] + " \\\\ " + data[1] + " \\\\ " + data[2] + " \\end{pmatrix}}$.";
					inputField.text(text);
					row2.append(title).append(inputField);
					form.append(row2);
					row1.append(form);
					gridItem.append(row1);
					$(".grid").append(gridItem);
					requirejs(["/node_modules/masonry-layout/dist/masonry.pkgd.js",], Masonry => {
					    new Masonry( '.grid', {
					        columnWidth: ".grid-sizer",
					        itemSelector: ".grid-item"
					    });
					});
					MathJax.Hub.Queue(["Typeset",MathJax.Hub,"main"]);
				});
			}
		});
	});
});
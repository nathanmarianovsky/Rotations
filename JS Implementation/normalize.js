var exports = {},
	math = require("mathjs");

// Normalizes the given axis of rotation
exports.normalize = axis => {
	var norm_squared = axis.reduce((left, right) => left + math.pow(right, 2));
	if(norm_squared != 1) { axis = axis.map(elem => elem / math.sqrt(norm_squared)); }
	return axis;
};

module.exports = exports;
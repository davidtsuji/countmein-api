module.exports = function (_length) {
	var length = typeof _length === 'number' ? Math.round(_lenght) : 8;
	return Math.random().toString(35).substr(2, length);
};
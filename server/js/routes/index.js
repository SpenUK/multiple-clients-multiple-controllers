'use strict';

exports.display = function(req, res){
	const stylesheets = [];

	const scripts = [
		'/socket.io/socket.io.js',
		'/js/display.bundle.js'
	];

	res.render('display', {
		title: 'Display',
		stylesheets: stylesheets,
		scripts: scripts
	});
};

exports.controller = function (req, res) {
	const token = req.params.id;

	const stylesheets = [];

	const scripts = [
		'/socket.io/socket.io.js',
		'/js/controller.bundle.js'
	];

	res.render('controller', {
		title: 'Controller',
		stylesheets: stylesheets,
		scripts: scripts,
		initialData: JSON.stringify({
			token: token
		})
	});
};

'use strict';

const exphbs = require('express-handlebars');

module.exports = function (app, viewsDir) {

	const hbs = exphbs.create({
		layoutsDir: viewsDir,
		defaultLayout: 'layout'
	});

	app.engine('handlebars', hbs.engine);
	app.set('view engine', 'handlebars');

	return app.engine;
};
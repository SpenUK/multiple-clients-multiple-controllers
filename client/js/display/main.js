'use strict';
/*jshint bitwise: false*/

require('backbone-super');
require('../../css/display.scss');

const $ = require('jquery');
const backbone = require('backbone');

const app = require('./app.js');

backbone.$.easing.easeInBack = function (x, t, b, c, d, s) {
	if (s === undefined) {
		s = 1.2;
	}
	return c * (t /= d) * t * ((s + 1) * t - s) + b;
};

$(document).on('ready', function(){
	const socket = window.io.connect();
	app.initialize(socket);
});
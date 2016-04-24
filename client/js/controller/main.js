'use strict';

require('../../css/controller.scss');
require('backbone-super');

const $ = require('jquery');
const app = require('./app.js');

$(document).on('ready', function(){
	const socket = window.io.connect();
	app.initialize(socket);
});
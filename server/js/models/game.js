'use strict';

const _ = require('underscore');
const tokenController = require('../controllers/tokens');
const DisplayModel = require('./display');

module.exports = class Game {

	constructor (options) {
		this.generateToken();

		this.displays = [];

		this.controller = options.controller;

		this.displayLimit = 4;
		this.controllerLimit = 4;

		this.sockets = {};
	}

	addDisplay (socket) {
		if (this.displays.length < this.displayLimit) {
			const display = new DisplayModel({
				game: this,
				socket: socket,
				controllerLimit: this.controllerLimit
			});

			socket.join(this.token);

			socket.on('disconnect', () => {
				this.removeDisplay(display);
			});

			this.displays.push(display);

			return display;
		}

		return false;
	}

	removeDisplay (display) {
		this.displays = _.without(this.displays, display);

		display.socket.to(this.token).emit('display:removed', {
			token: display.token
		});
	}

	generateToken () {
		this.token = tokenController.getUniqueId();
		tokenController.addToken(this.token);

		return this.token;
	}

	isFull () {
		return this.displays.length >= this.displayLimit;
	}

	serialize () {
		return {
			displays: _.map(this.displays, display => display.serialize())
		};
	}

};

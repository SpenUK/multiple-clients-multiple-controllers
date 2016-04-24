'use strict';

const _ = require('underscore');
const tokenController = require('../controllers/tokens');
const Controller = require('./controller');

module.exports = class Display {

	constructor (options) {
		this.token = tokenController.getUniqueId();
		tokenController.addToken(this.token);

		this.game = options.game;

		this.socket = options.socket;
		this.socket.token = this.token;

		this.socket.join(this.token);
		this.socket.join(this.game.token);

		this.socket.to(this.token).emit('d:joined', this.token);
		this.socket.to(this.game.token).emit('d:joined', this.token);

		this.controllerLimit = options.controllerLimit; // default

		this.controllers = this._createControllers();

		this.socket.emit('client:accepted', this.serialize());
		this.socket.to(this.game.token).emit('client:added', this.serialize());
		this.socket.emit('display:send-initial-data', this.game.serialize());
	}

	serialize () {
		return {
			token: this.token,
			controllerLimit: this.controllerLimit,
			controllers: this.getSerializedControllers()
		};
	}

	getSerializedControllers () {
		return this.controllers.map(controller => controller.serialize());
	}

	_createControllers () {
		const controllers = _.map(_.range(this.controllerLimit), () => this._createControllerModel());
		return controllers;
	}

	_createControllerModel () {
		const controller = new Controller({
			displayToken: this.token,
			display: this
		});

		this.game.controller.openControllerSlot(controller);

		return controller;
	}
}
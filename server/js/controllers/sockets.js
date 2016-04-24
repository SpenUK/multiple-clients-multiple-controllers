'use strict';

const gameController = require('./game');
const game = gameController.getGameModel();

const displayInitialize = function () {
	game.addDisplay(this);
};

const controllerInitialize = function (token) {
	const controllerModel = gameController.openControllerSlots[token];

	if (controllerModel) {
		controllerModel.assignSocket(this);
		delete gameController.openControllerSlots[token];
	} else {
		this.emit('controller:rejected');
	}
};

const onConnection = function (socket) {
	socket.on('display:initialize', displayInitialize.bind(socket));
	socket.on('controller:initialize', controllerInitialize.bind(socket));
}

module.exports = function (io) {
	io.on('connection', onConnection);
}
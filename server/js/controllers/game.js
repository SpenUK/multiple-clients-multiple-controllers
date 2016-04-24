'use strict';

const GameModel = require('../models/game');

module.exports = {

	openControllerSlots: {},

	getGameModel: function () {
		return this.gameModel || this.setGameModel.apply(this, arguments);
	},
	
	setGameModel: function () {
		this.gameModel = new GameModel({
			controller: this
		});
	
		return this.gameModel;
	},

	openControllerSlot (controllerModel) {
		const token = controllerModel.token;
		const match = this.openControllerSlots[token];

		if (!match) {
			this.openControllerSlots[token] = controllerModel;
		}
	}

};

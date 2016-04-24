'use strict';
const _ = require('underscore');
const tokenController = require('../controllers/tokens');
const colorChars = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];

function getRandomColor () {
	return '#' + _.map(_.range(6), () => _.sample(colorChars)).join('');
}

module.exports = class Controller {

	constructor (options) {
		this.token = tokenController.getUniqueId();
		this.display = options.display;
		this.display.socket.join(this.token);
		this.color = '#efefef';
	}

	assignSocket (socket) {
		this.socket = socket;

		// join display-to-all-controllers
		this.socket.join(this.display.token);

		// join display-to-this-controller
		this.socket.join(this.token);

		socket.on('disconnect', () => {
			this.unassignSocket();
		});

		// emit to both
		this.socket.to(this.token).emit('c:joined', this.token);
		this.socket.to(this.display.token).emit('c:joined', this.token);

		this.socket.on(this.token + ':change-color-request', () => {
			this.color = getRandomColor();

			this.socket.emit(this.token + ':change-color', this.color); // to controller
			this.socket.to(this.display.game.token).emit(this.token + ':change-color', this.color); // to all displays via 'game'
		});

	}

	unassignSocket () {
		this.socket = null;
		this.display.game.controller.openControllerSlot(this);
	}

	changeColor (color) {
		this.color = color;
		this.socket.emit('controller-' + this.token + ':changed-color', this.color);
	} 

	serialize () {
		return {
			token: this.token,
			color: this.color
		};
	}

};
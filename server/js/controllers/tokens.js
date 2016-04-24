'use strict';

const _ = require('underscore');

const tokenController = {

	ids: [],

	sockets: [],

	checkId: function (id) {
		return !id || _.contains(this.ids, id);
	},

	generateId: function () {
		return _.map(_.range(8), function () {
			return _.sample('ABCFEFGHIJKLMNOPQRSTUVWXYZ');
		}).join('');
	},

	getUniqueId: function () {
		let id;

		while (this.checkId(id)) {
			id = this.generateId();
		}

		return id;
	},

	addToken: function (token) {
		if (this.checkId(token)) {
			return false;
		} else {
			this.ids.push(token);
		}
	},

	removeToken: function (token) {
		this.ids = _.without(this.ids, token);
	}

}

module.exports = tokenController;
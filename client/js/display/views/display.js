'use strict';

const ViewExtension = require('../../extensions/view');
const Collection = require('../../extensions/collection');
const ClientsView = require('./clients');
const template = require('../templates/display.hbs');

const DisplayView = ViewExtension.extend({

	template: template,

	acceptedParams: ['socket'],

	initialize: function() {
		this._super.apply(this, arguments);

		this.clients = new Collection;
		this.clients.socket = this.socket;

		this.socket.emit('display:initialize');
	},

	views: function () {
		var views = {
			'.clients': {
				view: ClientsView,
				options: {
					socket: this.socket,
					collection: this.clients
				}
			}
		};
		return views;
	}

});

module.exports = DisplayView;

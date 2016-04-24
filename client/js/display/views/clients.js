'use strict';

const _ = require('underscore');
const CollectionViewExtension = require('../../extensions/collectionview');
const ClientView = require('./client');
const template = require('../templates/clients.hbs');

const ClientsView = CollectionViewExtension.extend({

	template: template,

	acceptedParams: ['socket'],

	itemView: function () {
		return ClientView;
	},

	initialize: function() {
		this._super.apply(this, arguments);

		window.clients = this.collection;

		_.bindAll(this, 'addClient');

		// THIS client
		this.socket.on('client:accepted', this.addClient.bind(this)); 
		// all other clients
		this.socket.on('client:added', this.addClient);

		this.socket.on('poop', (data) => {
			const model = this.collection.findWhere({
				token: data.token
			});

			this.collection.remove(model);
		});

		// Add existing clients
		this.socket.on('display:send-initial-data', data => {
			_.each(data.displays, this.addClient);
		});
	},

	addClient: function (data) {
		this.collection.add(data);
	}

});

module.exports = ClientsView;

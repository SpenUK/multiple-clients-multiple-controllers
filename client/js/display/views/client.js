'use strict';

const View = require('../../extensions/view');
const Collection = require('../../extensions/collection');
const ControllersView = require('./controllers');
const template = require('../templates/client.hbs');

const ClientView = View.extend({

	template: template,

	className: 'client',

	acceptedParams: ['socket'],

	initialize: function() {
		this.socket = this.model.collection.socket;
		
		this._super.apply(this, arguments);
		this.controllers = new Collection(this.model.get('controllers'));
		this.controllers.socket = this.socket;

		this.listenTo(this.model, 'remove', this.remove);
	},

	views: function () {
		return {
			'.controllers': {
				view: ControllersView,
				options: {
					socket: this.socket,
					collection: this.controllers
				}
			}
		};
	}

});

module.exports = ClientView;

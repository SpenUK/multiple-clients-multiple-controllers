'use strict';

const ViewExtension = require('../../extensions/view');
const template = require('../templates/controller.hbs');

const ControllerView = ViewExtension.extend({

		template: template,

		acceptedParams: ['socket'],

		className: 'controller',

		initialize: function() {
			this.socket = this.model.collection.socket;
			this._super.apply(this, arguments);
			
			this.socket.on(this.model.get('token') + ':change-color', this.onColorChange.bind(this));

			this.listenTo(this.model, 'change:color', this.render);
		},

		events: {
			'click': 'openController'
		},

		openController: function () {
			const url = '//localhost:3000/controller/' + this.model.get('token');
			window.open(url, 'controller', 'width=200, height=200, left=900, top=160, menubar=0, status=0, scrollbars=0, toolbar=0');	
		},

		onColorChange: function (color) {
			this.model.set('color', color);
		},

		render: function () {
			this._super.apply(this, arguments);
			if (this.$el) { // need to solve the double init issue
				this.$el.css('background-color', this.model.get('color'));
			}
		}

	});

module.exports = ControllerView;

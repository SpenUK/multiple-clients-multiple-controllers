'use strict';

const ViewExtension = require('../../extensions/view');
const template = require('../templates/controller.hbs');

const ControllerView = ViewExtension.extend({

		template: template,

		acceptedParams: ['socket'],

		initialize: function() {
			this._super.apply(this, arguments);

			this.disableViewPort();

			this.socket.on('controller:joined', this.onSocketJoined.bind(this));
			this.socket.on('controller:rejected', this.onSocketReject.bind(this));

			this.socket.on(this.model.get('token') + ':change-color', (data) => {
				this.$('.color').css('background-color', data);
			});
		
			this.listenTo(this.model, 'change:controllerState', this.render);
		},

		events: {
			'click .color': function () {
				this.socket.emit(this.model.get('token') + ':change-color-request');
			}
		},

		onSocketJoined: function () {
			this.render();
		},

		onSocketReject: function () {
			this.model.unset('token');
			this.render();
		},

		disableViewPort: function () {
			var viewport = document.querySelector('meta[name=viewport]'),
				content = viewport.content.replace(/user-scalable=(\w+)/, 'user-scalable=no');

			viewport.setAttribute('content', content);
		}

	});

module.exports = ControllerView;

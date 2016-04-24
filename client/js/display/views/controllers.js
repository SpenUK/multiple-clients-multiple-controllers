'use strict';

const CollectionViewExtension = require('../../extensions/collectionview');
const ControllerView = require('./controller');
const template = require('../templates/controllers.hbs');

const ControllersView = CollectionViewExtension.extend({

	template: template,

	acceptedParams: ['socket'],

	itemView: function () {
		return ControllerView;
	}

});

module.exports = ControllersView;

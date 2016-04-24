'use strict';
/*jshint bitwise: false*/
/*jshint -W087 */

var $ = require('jquery');
var _ = require('underscore'),
    CoreView = require('./view'),
	CoreCollection = require('../collections/collection'),

    /**
     *
     */
    CollectionView = CoreView.extend({

        /**
         * Set to true to allow updates to the collection without rendering
         */
        addSilently: false,

        collectionEl: null,

    	/**
    	 * Initialises as a collection
    	 */
    	renderedItems: null,

    	/**
    	 *
    	 */
    	initialize: function(options) {
    		options = options || {};
    		this.renderedItems = new CoreCollection();
            if (!this.collection) {
                this.collection = new CoreCollection();
            } else if (_.isArray(this.collection)) {
                this.collection = new CoreCollection(this.collection);
            }
            this._super.apply(this, arguments);
    	},

        _setAcceptedParams: function (options) {
            var self = this, params;
            if (!_.isArray(this.acceptedParams) || !options) {
                return false;
            }

            params = _.union([],this._coreParams, this.acceptedParams);

            _.each(params, function(param){
              if (options[param] !== undefined) {
                self[param] = options[param];
              }
            });
        },

        render: function () {
            this.$el.html(this.template ? this.template(this.serialize()) : '');

            this.collectionEl = this.collectionEl ? this.collectionEl : this.el;
            this.$collectionEl = $(this.collectionEl);
            this.renderAll();

            this.stopListening(this.collection, 'add');
            this.stopListening(this.collection, 'remove');

            this.listenTo(this.collection, 'add', this.renderOne);
            this.listenTo(this.collection, 'remove', this.removeOne);

            return this;
        },

        renderAll: function () {
            return this._renderAll.apply(this, arguments);
        },

        renderSelection: function () {
            return this._renderSelection.apply(this, arguments);
        },

        renderOne: function () {
            return this._renderOne.apply(this, arguments);
        },

        renderCurrent: function () {
            this._removeAll();
            this._renderSelection(this.collection.position, 1);
        },

    	/**
    	 *
    	 */
    	_renderAll: function () {
            return this._renderSelection(0, this.collection.length);
    	},

        /**
         *
         */
        _renderSelection: function (offset, limit) {
            let ItemView = _.result(this, 'itemView'), // not ideal, since a view is a func
                buffer = this.buffer = this.buffer || document.createDocumentFragment(),
                range = _.range(offset, offset + limit);

                this._removeAll();

            _.each(range, (i) => {
                let model = this.collection.at(i);

                if (model) {
                    let itemView = new ItemView({
                        model: model
                    }),
                    el = itemView.render().el;

                    // if (!el) {
                    //     debugger;
                    // }

                    buffer.appendChild(el);
                    this.renderedItems.add({view: itemView});
                }

            }, this);

            $(this.collectionEl).html(buffer);
        },

    	/**
    	 *
    	 */
    	// _renderOne: function (model, options) {
     //        options = options || {};
     //        var insertionMethod = options.prepend ? 'prepend' : 'append';

     //        if (this.itemView) {
     //            var itemView = new this.itemView({
     //                model: model
     //            });

     //            this[insertionMethod](itemView.render().el);
     //            this.renderedItems.add({view: itemView});

     //            return itemView;
     //        }
     //        return false;
     //    },

        _renderOne: function (model, options) {
    		options = options || {};
            let insertionMethod = this.prepend ? '_prepend' : '_append';

    		if (this.itemView) {
                let ItemView = _.result(this, 'itemView'),
                    itemView = new ItemView({
    			 	   model: model
                    });

    			this[insertionMethod](itemView.render().el);
                this.renderedItems.add({view: itemView});

    			return itemView;
    		}
    		return false;
    	},

        _append: function (html) {
            this.$collectionEl.append(html);
        },

        _prepend: function (html) {
            this.$collectionEl.prepend(html);
        },

    	/**
    	 *
    	 */
    	_removeOne: function (model) {
            console.log('remove one');
    		this.renderedItems.find(model).remove();
    	},

    	/**
    	 *
    	 */
    	_removeAll: function () {
    		this.renderedItems.each(function (item) {
    			item.get('view').remove();
    		});
    	}

    });

module.exports = CollectionView;
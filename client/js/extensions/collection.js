'use strict';
/*jshint -W087 */

const _ = require('underscore');
const core = require('../core/core');

const Collection = core.Collection.extend({

    totalRecords: 0,

    isLoading: false,

    parse: function(response){
        this.totalRecords = response.length;
        return response;
    },

    setCurrentModel: function (model) {
        let oldCurrentModel;
        if (model && this.currentModel === model) {
            return this.currentModel;
        }

        oldCurrentModel = this.currentModel;
        this.currentModel = this.contains(model) ? model : this.currentModel || this.first();
        this.position = this.indexOf(this.currentModel);
        this.trigger('updatedCurrent');

        if (oldCurrentModel) {
            oldCurrentModel.trigger('deselected');
        }

        this.currentModel.trigger('selected');

        return this.currentModel;
    },

    getCurrentModel: function(){
        return this.at(this.position) || this.setCurrentModel();
    },

    getLatest: function(){
        return this.at(0);
    },

    getNextModel: function(){
        return this.at((this.position + 1 > this.length -1)?  false : this.position + 1);
    },

    getPrevModel: function(){
        return this.at((this.position -1 < 0) ? false : this.position - 1);
    },

    incrementPosition: function () {
        const nextModel = this.getNextModel();
        if (nextModel) {
            this.setCurrentModel(nextModel);
        }
    },

    decrementPosition: function () {
        const prevModel = this.getPrevModel();
        if (prevModel) {
            this.setCurrentModel(prevModel);
        }
    }

});

module.exports = Collection;
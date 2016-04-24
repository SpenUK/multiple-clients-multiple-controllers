'use strict';

const ControllerView = require('./views/controller');
const ControllerModel = require('./models/controller');

const App = {

    initialize: function(socket){
        this.socket = socket;

        this.view = new ControllerView({
            el: '.controller',
            socket: this.socket,
            model: this.getControllerModel()
        });
        
        this.view.render();
    },

    getControllerModel: function () {
        return this.controllerModel || this.setControllerModel();
    },

    setControllerModel: function () {
        this.initialData = window.initialData;

        this.controllerModel = new ControllerModel({
            token: this.initialData.token,
            socket: this.socket
        });

        return this.controllerModel;
    }

};

module.exports = App;
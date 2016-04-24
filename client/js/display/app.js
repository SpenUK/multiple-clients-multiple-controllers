'use strict';

const DisplayView = require('./views/display');

const App = {

    initialize: function(socket){

        this.view = new DisplayView({
            el: '.display',
            socket: socket
        });

        this.view.render();
    }

};

module.exports = App;
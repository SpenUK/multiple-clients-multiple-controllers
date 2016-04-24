'use strict';

const socketio = require('socket.io');
const express = require('express');
const http = require('http');

const routes = require('./routes');
const setViewEngine = require('./config/views/handlebars');

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const router = new express.Router();

const socketController = require('./controllers/sockets');

router.get('/', routes.display);
router.get('/controller/:id?', routes.controller);

const viewDir = __dirname + '/views';

setViewEngine(app, viewDir);

app.use(express.static('public'));
app.set('views', viewDir);

app.use(router);

socketController(io);

server.listen(port);

console.log('http server running node ' + process.version + ', listening on %d', port);


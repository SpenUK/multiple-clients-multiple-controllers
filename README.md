# Multiple Clients, Multiple Controllers w/ socketio

The aim of this experiment was to structure a number of sockets in such a way that mutliple 'clients' could have multiple 'controllers' connected to them.

A client could be a representation of anything - most likely a web page but really any thing that is some how controllable (an arduino for instance).

A controller, again could be anything that has the means of controlling a client, though the intention here is to use a web page on a mobile device.

All clients sit under one entity, in this case I've just called this a game, since this project was a tangent from another that I'm working on, again the idea here is that there might multiple games/apps/sessions each holding multiple clients (holding multiple controllers).

Here, the number of controllers per client is set to 4 and the number of clients per game is also set to 4 - these numbers are configurable.

### Have a go...

Feel free to clone this repo and play around with it.

### Installation

    $ npm install 
    $ npm start

    http://localhost:3000/
    
### What the heck do I do now?

You should see a black box, followed by 4 white boxes.  
The black box represents the client, showing it's unique id  
The white boxes represent each controller of that client, each will show it's unique id and current color (white by default).

Clicking one of the controllers will open a new window, using that unique id to pair the controller to the client.
In this controller page, click 'Change color' and a new color will be generated randomly, with the changes being made to the client in real time.

Opening another tab at http://localhost:3000/ (a client) will show the state of other clients, and any future color changes will be updated through all clients.

It takes some imagination but hopefully this all makes some sense!

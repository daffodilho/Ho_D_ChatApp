var express = require('express');
var app = express();

// import the socket.io library
const io = require('socket.io')(); 
// instantiate the socket.io library right away with the () method -> makes it run

const port = process.env.PORT || 3031;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

let user = 0;

// this is all of our socket.io messaging functionality

// attach socket.io
io.attach(server);

io.on('connection', function(socket) {
    console.log('user connected');
    ++user;
    console.log(user + ' user(s) online');
    // io.emit('notification', { update: user });
    socket.emit('connected', { sID: `${socket.id}`, message: `${user} user(s) online`});

    // listen for an incoming message from a user (socket refers to an individual user)
    // msg is the incoming message from that user
    socket.on('chat_message', function(msg) {
        console.log(msg);

        // when we get a new message, send it to everyone so they see it
        // io is the switchboard operator, making sure everyone who's connected 
        // gets the messages
        io.emit('new_message', { id: socket.id, message: msg })
    })

    // listen for a disconnect event
    socket.on('disconnect', function() {
        console.log('a user disconnected');
        --user;
        console.log(user + ' user(s) online');
        // io.emit('notification', user);

        message = `${socket.id} has left the chat! ${user} user(s) online`;
        io.emit('user_disconnect', message);
    })
});
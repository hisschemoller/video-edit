var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    fs = require('fs');

server.listen(3000);

app.get('web/', function (req, res) {
    res.sendFile(__dirname + 'index.html');
});

app.use(express.static('web'));

io.sockets.on('connection', function (socket) {
    socket.on('render-frame', function (data) {
        // Get rid of the data:image/png;base64 at the beginning of the file data
        data.file = data.file.split(',')[1]; 
        var buffer = new Buffer(data.file, 'base64');
        fs.writeFile(__dirname + '/tmp/frame-' + data.frame + '.png', 
            buffer.toString('binary'), 'binary', 
            (err) => {
                if (err) {
                    console.log('An error occurred: ', err);
                    throw err;
                }
            });
    });
});

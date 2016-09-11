module.exports = function(app){
    var io = require('socket.io')(app);
    
    io.on('connection', function (socket) {
      socket.emit('init', { hello: 'world' });
      socket.on('inited', function (data) {
        console.log(data);
      });
    });
}
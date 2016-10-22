import io from 'socket.io';


var SocketIOUtils = {
    socket: null,
    init: function(){
        this.socket = io.connect('http://localhost:3000');
        this.socket.on('init', function (data) {
            console.log(data);
            socket.emit('inited', { my: 'data' });
        });
    }
}

module.exports = SocketIOUtils;
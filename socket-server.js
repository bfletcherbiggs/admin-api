const socketCtrl = require('./controllers/socketCtrl');

module.exports = io=>{
    io.on('connection', socket => {
        socket.on('authenticated', function(data){
            socket.emit('socketid',socket.id)
            socket.join(data)
            socketCtrl.fetchAllMessages(data)
            .then(response=>{
                socket.emit('messagesfetched',response)
            })
        })
        socket.on('newmessage', function(data){
            socketCtrl.insertMessage(data)
            .then(response=>{
                socket.emit('messagereceived', response)
            })
        })
        socket.on('fetchmessages',function(data){
            socketCtrl.fetchAllMessages(data)
            .then(response=>{
                socket.emit('messagesfetched',response)
            })
        })
        socket.on('chatread',function(data){
            socketCtrl.updateChat(data)
            .then(()=>{
                socketCtrl.fetchAllMessages(data.adminid)
                .then(response=>{
                    socket.emit('messagesfetched',response)
                })
            })
        })
    })
}

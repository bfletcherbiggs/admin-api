const socketCtrl = require( './controllers/socketCtrl' );

module.exports = io => {
    io.on( 'connection', socket => {
        const socketObj = socket.server.sockets.connected;
        socket.on( 'authenticated', data => {
            socket.admin_id = data
            socket.emit( 'socketid', socket.id )
            socketCtrl.fetchAllMessages( data )
            .then( response => {
                for (let chats in response){
                    socket.join( parseInt( chats ) )
                }
                socket.emit( 'messagesfetched', response )
            })
        })
        socket.on( 'newmessage', data => {
            socketCtrl.insertMessage( data )
            .then( response => {
                io.to( 'servercomm' ).emit( 'newmessageadmin', data )
                socket.emit( 'messagereceived', response )
            })
        })
        socket.on( 'fetchmessages', data => {
            socketCtrl.fetchAllMessages( data )
            .then( response => {
                socket.emit( 'messagesfetched', response )
            })
        })
        socket.on( 'chatread', data => {
            socketCtrl.updateChat( data )
            .then( () => {
                socketCtrl.fetchAllMessages( data.adminid )
                .then( response => {
                    socket.emit( 'messagesfetched', response )
                })
            })
        })
        socket.on( 'newclientmessage', data => {
            socketCtrl.fetchAllMessages( data.admin_id )
            .then( response => {
                io.to( data.id ).emit( 'newclientmessage', response )
            })
        })
        socket.on( 'node2connected', () => {
            socket.join( 'servercomm' )
        })
    })
}

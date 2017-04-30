const db = require( '../db' ),
      userFunc = require( '../functions.js' ),
      passport = require( 'passport' );

module.exports = {
    fetchAllMessages: data => {
        return db( 'chats' )
            .where( 'chats.admin_id', data )
            .join( 'messages','chats.user_id','messages.user_id' )
            .join( 'users', 'users.id', 'messages.user_id' )
            .select( 'chats.id as chat_id','chats.user_id as user_id','chats.admin_id as admin_id', 'messages.created_at as timestamp','messages.message as message','messages.type as type','users.firstname as firstname','users.lastname as lastname','messages.read as read' )
            .orderBy( 'messages.id' )
            .then( response => {
                return userFunc.groupMessages( response )
            })
    },
    insertMessage: data => {
        let messageObj = {
            chat_id:data.index,
            message:data.message,
            user_id:data.userid,
            type:'admin'
        }
        return db( 'messages' )
            .returning( [ 'chat_id','user_id','created_at as timestamp','message','type','read' ] )
            .insert( messageObj )
            .then( response => {
                response[ 0 ].admin_id = data.adminid
                return userFunc.flatten( response )
            })
    },
    updateChat: data => {
        return db( 'messages' )
            .where( 'chat_id', data.key )
            .andWhere( 'type','user' )
            .andWhere( 'read',false )
            .update( { read: true, updated_at: new Date() } )
            .returning()
            .then( () => {
                return
            })
    }
}

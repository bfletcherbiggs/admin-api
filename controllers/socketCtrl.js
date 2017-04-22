const db = require('../db'),
      userFunc = require('../functions.js'),
      passport = require('passport');
//TODO change req.body back to req.user.id
module.exports = {
    fetchAllMessages: (data =>{
        return db('chats')
            .where('chats.admin_id',data)
            .join('messages','chats.user_id','messages.user_id')
            .join('users', 'users.id', 'messages.user_id')
            .select('chats.id as chat_id','chats.user_id as user_id','chats.admin_id as admin_id', 'messages.created_at as timestamp','messages.message as message','messages.type as type','users.firstname as firstname','users.lastname as lastname')
            .orderBy('timestamp')
            .then(response=>{
                return userFunc.groupMessages(response)
            })
    })
}

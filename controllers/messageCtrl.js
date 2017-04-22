const db = require('../db'),
      userFunc = require('../functions.js'),
      passport = require('passport');
//TODO change req.body back to req.user.id
module.exports = {
    readMessages: (req, res) =>{
        let user_id
        if (req.query){
          user_id = req.query.id
        }
        else {
          user_id = req.body.id
        }
        db('messages').returning('*').where('user_id',user_id)
        .then((response)=>{
            return userFunc.handleResponse(res,200,'messages',response)
        })
        .catch((err)=>{
            return userFunc.handleResponse(res,500,'error',err)
        })
    },
    createMessages: (req,res) =>{
        let user_id
        let type
        if (req.query.user_id){
          user_id = parseInt(req.query.user_id)
          type='admin'
        }
        else {
          user_id = parseInt(req.body.id)
          type='client'
        }
        const message = {
            user_id,
            message:req.body.message,
            type
        }
        db('messages').returning('*').insert(message)
        .then((response)=>{
            return userFunc.handleResponse(res,200,'message',response)
        })
        .catch((err)=>{
            return userFunc.handleResponse(res,500,'error',err)
        })
    },
    destroyMessages: (req,res) =>{

    }

}

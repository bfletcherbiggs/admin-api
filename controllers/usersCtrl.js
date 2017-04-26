const db = require('../db'),
      bcrypt = require('bcryptjs'),
      passport = require("../passport.js"),
      _ = require('lodash'),
      userFunc = require('../functions.js');

function hash(given) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(given, salt)
}

//TODO fix passing the admin_id
module.exports = {
    createUser: (req, res, next) => {
        const userInfo = {
            email: req.body.email.toLowerCase(),
            password_hash: hash(req.body.password),
            firstname: req.body.firstname.toLowerCase(),
            lastname: req.body.lastname.toLowerCase(),
            company: req.body.company.toLowerCase(),
            admin_id: 1
        }
        db('users').returning('*').insert(userInfo)
        .then ( response => {
            userFunc.handleResponse(res,200, 'success',response)
        })
        .catch( err => {
            return userFunc.handleResponse(res,500,'error',err)
        })
    },
    readUser: function(req, res) {
        if (!req.user) {
        }
        delete req.user.password
        userFunc.handleResponse(res,200, 'success',userFunc.returnUser(req.user))
    }
}

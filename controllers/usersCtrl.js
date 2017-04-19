const db = require('../db'),
      bcrypt = require('bcryptjs'),
      passport = require("../passport.js"),
      _ = require('lodash'),
      userFunc = require('../functions.js');

function hash(given) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(given, salt)
}


module.exports = {
    create: (req, res, next) => {
      const userInfo = {
        email: req.body.email.toLowerCase(),
        password_hash: hash(req.body.password),
        firstname: req.body.firstname.toLowerCase(),
        lastname: req.body.lastname.toLowerCase(),
        company: req.body.company.toLowerCase()
      }
      db('users').returning('*').insert(userInfo)
      .then ((response) =>{
        passport.authenticate('local', (err, user, info) => {
          if(err){return next(err);}
          if(!user) { return res.status(403).json(info)}
          req.logIn(user, err => {
            if (err) {return next(err)}
            return res.redirect('/user/currentuser');
          });
        })(req, res, next)
      })
      .catch((err)=>{
        console.log('create:', err)
        return userFunc.handleResponse(res,500,'error',err);});
    },
    getUser: function(req, res) {
      console.log(req.headers)
        console.log(req.user)
      if (!req.user) {

      }
      // delete req.user.password
      userFunc.handleResponse(res,200, 'success',userFunc.returnUser(req.user))
    }
}

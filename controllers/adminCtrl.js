const db = require('../db'),
      bcrypt = require('bcryptjs'),
      passport = require("../passport.js"),
      _ = require('lodash'),
      userFunc = require('../functions.js'),
      config = require('../config');

function hash(given) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(given, salt)
}

//TODO fix passing the admin_id
module.exports = {
    createAdmin: (req, res, next) => {
        if( req.body.token === config.adminSecret ) {
              const adminInfo = {
                email: req.body.email.toLowerCase(),
                password_hash: hash(req.body.password),
                firstname: req.body.firstname.toLowerCase(),
                lastname: req.body.lastname.toLowerCase(),
                company: req.body.company.toLowerCase(),
              }
              db('admins').returning('*').insert(adminInfo)
              .then ((response) =>{
                console.log(response)
                passport.authenticate('local', (err, user, info) => {
                  if(err){return next(err);}
                  if(!user) { return res.status(403).json(info)}
                  req.logIn(user, err => {
                    if (err) {return next(err)}
                    return res.redirect('/api/admin');
                  });
                })(req, res, next)
              })
              .catch((err)=>{
                console.log('create:', err)
                return userFunc.handleResponse(res,500,'error',err);
                });
        }
        else { return userFunc.handleResponse(res,401,'error') }
    },
    readAdmin: function(req, res) {
      if (!req.user) {
      }
      delete req.user.password
      userFunc.handleResponse(res,200, 'success',userFunc.returnUser(req.user))
    }
}

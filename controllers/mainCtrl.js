const db = require('../db'),
      userFunc = require('../functions.js'),
      passport = require('passport');

module.exports = {
    destroySession: (req,res)=>{
      req.logout();
      userFunc.handleResponse(res,200,'success')
    },
    createSession: (req, res, next) => {
      console.log("Request Body: ", req.body)
      passport.authenticate('local',
      (err, user, info) => {
      if(err){
          return next(err);
      }
      if(!user) {
          return res.status(403).json(info)
      }
          req.logIn(user, err => {
              console.log("User: ", user, "Err: ", err)
            if (err) {return next(err)}
            return res.redirect('/api/admin');
          });
      })(req, res, next)
    }
}

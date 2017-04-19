const db = require('../db'),
      userFunc = require('../functions.js'),
      passport = require('passport');

module.exports = {
    home: (req, res) =>{
      userFunc.handleResponse(res,200,'Welcome Home')
    },
    authfailed:(req, res)=> {
        res.status(400).send("oops")
    },
    logout: (req,res)=>{
      req.logout();
      userFunc.handleResponse(res,200,'success')
    },
    login: (req, res, next) => {
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
            return res.redirect('/user/currentuser');
          });
      })(req, res, next)
    }
}

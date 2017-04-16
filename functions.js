const _ = require('lodash');

module.exports={
  handleResponse: (res, code, statusMsg,data) =>{
    return res.status(code).json(data);
  },
  returnUser: (userObj) =>{
    return _.omit(userObj,['password_hash','created_at','updated_at']);
  }
}

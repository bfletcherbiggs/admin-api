const express = require('express'),
      usersCtrl = require('../controllers/usersCtrl'),
      router = express.Router();

router.get('/',usersCtrl.readUser)
router.post('/', usersCtrl.createUser)


module.exports=router

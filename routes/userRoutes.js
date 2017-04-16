const express = require('express'),
      usersCtrl = require('../controllers/usersCtrl'),
      router = express.Router();

router.get('/currentuser',usersCtrl.getUser)
router.post('/create', usersCtrl.create)


module.exports=router

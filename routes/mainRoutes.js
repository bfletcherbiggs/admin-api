const express = require('express'),
      mainCtrl = require('../controllers/mainCtrl'),
      router = express.Router();

router.get('/', mainCtrl.home);
router.get('/authfailed', mainCtrl.authfailed);
router.get('/logout', mainCtrl.logout);
router.post('/login', mainCtrl.login)

module.exports=router

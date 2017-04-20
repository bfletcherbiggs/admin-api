const express = require('express'),
      adminCtrl = require('../controllers/adminCtrl'),
      router = express.Router();

router.get('/',adminCtrl.readAdmin)
router.post('/', adminCtrl.createAdmin)


module.exports=router

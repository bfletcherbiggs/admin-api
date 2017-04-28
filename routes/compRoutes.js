const express = require('express'),
      compCtrl = require('../controllers/compCtrl'),
      router = express.Router();

router.get('/',compCtrl.readComps)
router.put('/', compCtrl.updateComps)
router.post('/', compCtrl.createComps)

module.exports=router

const express = require('express'),
      messageCtrl = require('../controllers/messageCtrl'),
      router = express.Router();

router.use(function(req, res, next) {
      next()
})
router.get('/', messageCtrl.readMessages);
router.post('/', messageCtrl.createMessages);
// router.del('/', messageCtrl.destroyMessages);


module.exports=router

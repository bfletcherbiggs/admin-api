const express = require( 'express' ),
      inputCtrl = require( '../controllers/inputCtrl' ),
      router = express.Router();

router.get( '/',inputCtrl.readInputs )
router.put( '/', inputCtrl.updateInputs )
router.get( '/upload', inputCtrl.uploadFile )

module.exports = router;

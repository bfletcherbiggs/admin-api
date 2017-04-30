const express = require( 'express' ),
      mainCtrl = require( '../controllers/mainCtrl' ),
      router = express.Router();

router.get( '/logout', mainCtrl.destroySession )
router.post( '/login', mainCtrl.createSession )

module.exports = router;

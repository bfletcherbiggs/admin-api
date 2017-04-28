const db = require( '../db.js' ),
passport = require("../passport.js"),
dropboxkey = require( '../dropboxConfig.js' );
module.exports = {
    readInputs: ( req, res, next ) => {
      //TODO change id to req.session.passport.user

        let user_id = 2
        db( 'intakegs' )
        .returning( '*' )
        .from( 'userdata' )
        .where( 'user_id', user_id )
        .then( results => {
            return res.status( 200 ).json( results )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    },
    updateInputs: ( req, res, next ) => {
      //TODO change id to req.session.passport.user
        user_id = 2
        db( 'userdata' )
        .where( 'user_id', user_id )
        .update( req.body,'*' )
        .then( results => {
            return res.status( 200 ).json( results )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    },
    uploadFile: ( req, res, next ) => {
      //TODO change to req.session
        let user_id = 2
        db( 'users' )
        .returning( '*' )
        .where( 'id', user_id )
        .then( results => {
            let uploadInfo = {
                dropboxkey: dropboxkey,
                company: results[0].company
            }
            return res.status( 200 ).json( uploadInfo )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    }

  }

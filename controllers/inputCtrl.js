const db = require( '../db.js' ),
      config = require( '../config.json' );

//TODO USER_ID
module.exports = {
    readInputs: ( req, res, next ) => {
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
        user_id = 2
        db( 'userdata' )
        .where( 'user_id', user_id )
        .update( req.body, '*' )
        .then( results => {
            return res.status( 200 ).json( results )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    },
    uploadFile: ( req, res, next ) => {
        let user_id = 2
        db( 'users' )
        .returning( '*' )
        .where( 'id', user_id )
        .then( results => {
            let uploadInfo = {
                dropboxkey: config.dropboxKey,
                company: results[ 0 ].company
            }
            return res.status( 200 ).json( uploadInfo )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    }
}

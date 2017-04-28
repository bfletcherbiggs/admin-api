const db = require( '../db.js' ),
passport = require("../passport.js")

module.exports = {
    readComps: ( req, res, next ) => {
      //TODO change id to req.session.passport.user
        let user_id = 2
        db( 'components' )
        .select( 'id', 'user_id', 'compName', 'statusName', 'completed' )
        .where( 'user_id', user_id )
        .then( results => {
            return res.status( 200 ).json( results )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    },
    createComps: ( req, res, next ) => {
        db( 'components' )
        .returning( '*' )
        .insert( req.body[0] )
        .then( results => {
            return res.status( 200 ).json( results )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    },
    updateComps: ( req, res, next ) => {
        let compComplete = {
            completed:req.body.completed
        }
        db( 'components' )
        //TODO change user id
        .where( 'user_id',2 )
        .andWhere( 'compName',req.body.component )
        .update( compComplete,'*' )
        .then( results => {
            return res.status( 200 ).json( results )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    }
}

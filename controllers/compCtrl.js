const db = require( '../db.js' );

module.exports = {
    readComps: ( req, res, next ) => {
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
    //TODO change user_id
        let user_id = 2
        db( 'components' )
        .returning( '*' )
        .insert( req.body )
        .then( response => {
            return db( 'components' )
            .select( 'id', 'user_id', 'compName', 'statusName', 'completed' )
            .where( 'user_id', user_id )
            .then( results => {
                return res.status( 200 ).json( results )
            })
            .catch( err => {
                return res.status( 500 ).json( err )
            })
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    },
    destroyComps: ( req, res, next ) => {
    //TODO change user_id
        let user_id = 2
        db( 'components' )
        .where( 'user_id', user_id )
        .andWhere( 'compName', req.query.compName )
        .del()
        .then( response => {
            return db( 'components' )
            .select( 'id', 'user_id', 'compName', 'statusName', 'completed' )
            .where( 'user_id', user_id )
            .then( results => {
                return res.status( 200 ).json( results )
            })
            .catch( err => {
                return res.status( 500 ).json( err )
            })
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    },
    updateComps: ( req, res, next ) => {
        let compComplete = {
            completed: req.body.completed
        }
        db( 'components' )
        //TODO change user id
        .where( 'user_id', 2 )
        .andWhere( 'compName', req.body.component )
        .update( compComplete, '*' )
        .then( results => {
            return res.status( 200 ).json( results )
        })
        .catch( err => {
            return res.status( 500 ).json( err )
        })
    }
}

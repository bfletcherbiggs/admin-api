const db = require( '../db' ),
      bcrypt = require( 'bcryptjs' ),
      passport = require( '../passport.js' ),
      _ = require( 'lodash' ),
      userFunc = require( '../functions.js' ),
      sendinBlue = require( '../sendinBlue' ),
      socketCtrl = require( './socketCtrl' ),
      io = require( 'socket.io' );

const hash = given => {
    const salt = bcrypt.genSaltSync( 10 );
    return bcrypt.hashSync( given, salt )
}

module.exports = {
    createUser: ( req, res, next ) => {
        const userInfo = {
            email: req.body.email.toLowerCase(),
            password_hash: hash( req.body.password ),
            firstname: req.body.firstname.toLowerCase(),
            lastname: req.body.lastname.toLowerCase(),
            company: req.body.company.toLowerCase(),
            admin_id: req.user.id
        }
        const input = {
            "to" : { "bfletcherbiggs@gmail.com":"to whom!" },
            "from" : [ "toby@goldsage.co", "from email!" ],
            "subject": "New Account Created",
            "html": `<p>Hello, ${ req.body.firstname } ${ req.body.lastname } welcome to Goldsage!</p>
                    <p>Your account has been created.  Please login with the following password. ${ req.body.password }</p>`
        }

        return db( 'users' )
        .returning( 'id' )
        .insert( userInfo )
        .then ( response => {
            return db( 'chats' )
            .returning( '*' )
            .insert( {
                user_id:response[ 0 ],
                admin_id:req.user.id
            })
            .then( response => {
                return db( 'messages' )
                .returning( '*' )
                .insert( {
                    user_id:response[ 0 ].user_id,
                    chat_id:response[ 0 ].id,
                    message:"Welcome to Goldsage!",
                    type:'admin'
                })
                .then( response => {
                    sendinBlue.send_email( input, response => {
                        return userFunc.handleResponse( res, 200, 'success', response )
                    })
                })
            })
        })
        .catch( err => {
            return userFunc.handleResponse( res, 500, 'error', err )
        })
    },
    readUser: ( req, res ) => {
        if ( !req.user ) {}
        delete req.user.password
        userFunc.handleResponse( res, 200, 'success', userFunc.returnUser( req.user ) )
    }
}

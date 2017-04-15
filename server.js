const   express = require('express')
 				, cors = require('cors')
 				, bodyParser = require('body-parser')
 				, port = 3001
 				, app = express()
        , session = require("express-session")
        , passport = require('./passport')
//				, serverConfig = require("./serverConfig")

// app.use(session(serverConfig.session) );
app.use(cors())
app.use(bodyParser.json())
app.use("/", express.static('../admin/public'));



app.listen(port, function() {
  console.log('Server listening on port', port)
})

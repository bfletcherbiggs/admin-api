const express = require('express'),
			cors = require('cors'),
			bodyParser = require('body-parser'),
			port = 3001,
      session = require("express-session"),
      passport = require('./passport'),
      config = require('./config.js'),
      userRoutes = require('./routes/userRoutes.js'),
      mainRoutes = require('./routes/mainRoutes.js'),
      router=express.Router(),
      corsOptions = {origin:`http://localserver:${port}`},
      app = express();


app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../admin/public'));
app.use(session({ secret: config.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session())
app.use(router)

app.use('/', mainRoutes);
app.use('/user', userRoutes);

app.listen(port, function() {
  console.log('Server listening on port', port)
})

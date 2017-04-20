const express = require('express'),
			cors = require('cors'),
			bodyParser = require('body-parser'),
			port = 3001,
      session = require("express-session"),
      passport = require('./passport'),
      config = require('./config.js'),
      userRoutes = require('./routes/userRoutes.js'),
      mainRoutes = require('./routes/mainRoutes.js'),
      adminRoutes = require('./routes/adminRoutes.js'),
      messageRoutes = require('./routes/messageRoutes.js'),
      router=express.Router(),
      corsOptions = {
        origin:[`http://localhost:3000`, `http://localhost:3001`],
        credentials: true
      },
      app = express(),
			server = require('http').createServer(app),
			io = require('socket.io')(server);

      io.on('connection', socket => {
        console.log(`Socket ${socket.id} connected`)
        // io.emit('newConnection', "Somebody connected")
        //socket.to(socket.id).emit

			  socket.on('authenticated', data =>{
        // make db call
          socket.emit("messages", data)
          socket.join(data)
			  })


      })
app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../admin/public'));
app.use(session({ secret: config.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session())
app.use(router)

app.use('/api', mainRoutes);
app.use('/api/user', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/admin', adminRoutes)


server.listen(port, function() {
  console.log('Server listening on port', port)
})

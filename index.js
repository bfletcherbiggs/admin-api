const express = require('express'),
			cors = require('cors'),
			bodyParser = require('body-parser'),
			port = 3001,
      session = require("express-session"),
      passport = require('./passport'),
      config = require('./config.json'),
      userRoutes = require('./routes/userRoutes.js'),
      mainRoutes = require('./routes/mainRoutes.js'),
      adminRoutes = require('./routes/adminRoutes.js'),
      messageRoutes = require('./routes/messageRoutes.js'),
      socketCtrl = require('./controllers/socketCtrl'),
      router=express.Router(),
      corsOptions = {
          origin:[`http://localhost:3000`, `http://localhost:3001`],
          credentials: true
      },
      app = express(),
			server = require('http').createServer(app),
			io = require('socket.io')(server);



io.on('connection', socket => {
    socket.on('authenticated', function(data){
        socket.emit('socketid',socket.id)
        socket.join(data)
        socketCtrl.fetchAllMessages(data)
        .then(response=>{
            socket.emit('messagesfetched',response)
        })
    })
    socket.on('newmessage', function(data){
        socketCtrl.insertMessage(data)
        .then(response=>{
            socket.emit('messagereceived', response)
        })
    })
    socket.on('chatread',function(data){
        socketCtrl.updateChat(data)
        .then(()=>{
            socketCtrl.fetchAllMessages(data.adminid)
            .then(response=>{
                socket.emit('messagesfetched',response)
            })
        })
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

'use strict'
const getProjectMetrics = require("./sonarqube.js");
const app = require("express")()
const server=require("./src/server.js")
const http = require("http");
const socketIo = require('socket.io');
const httpserver = http.createServer(app);
const io = socketIo(httpserver);
const { spawn } = require('child_process');
app.use(server.morgan)
app.use(server.cors)
app.use(server.urlEncoded)
app.use(server.json)
app.use(server.cookie)

app.get('/', function(req,res){
  res.send('<h1>Hello world</h1>');
  // res.json("conucle.io mongo server!")
})
getProjectMetrics();
const mongoose = require('mongoose');

// Get MongoDB connection string from environment variable
const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;
console.log(mongoConnectionString,'.................................-------------mongoConnectionString')
// console.log(process.env)
// Connect to MongoDB

// mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// Continue with your application logic...










const connection = require("./src/db/connections")("connection1");

connection.once('open', () => {
  console.log(`Connected to database successfully!`);

});

connection.on('error', (error) => {
  console.error(`Error connecting to  database:`, error);
});

io.on('connection', (socket) => {
  console.log('Client connected');

  // Handle CRUD commands from the client
  socket.on('crud', (data) => {
    console.log('Received CRUD command:', data);

    // Execute MongoDB command in the Docker container
    const dockerExec = spawn('docker', ['exec', '-i', 'servermongo', 'mongo']);
    
    // Send CRUD command to MongoDB shell inside the container
    dockerExec.stdin.write(`${data}\n`);
    dockerExec.stdin.end();

    // Capture MongoDB shell output and send it back to the client
    dockerExec.stdout.on('data', (output) => {
      console.log(output.toString(),'..............shell ooutput console in backend')
      socket.emit('response', output.toString());
    });

    // Handle errors
    dockerExec.stderr.on('data', (error) => {
      console.error('Error executing MongoDB command:', error.toString());
      socket.emit('error', 'Error executing MongoDB command: ' + error.toString());
    });

    // Handle process exit
    dockerExec.on('close', (code) => {
      console.log('MongoDB command execution completed with code', code);
    });
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


// Error handling for Socket.IO server
io.on('error', (error) => {
  console.error('Socket.IO server error:', error);
});



// Error handling for incoming HTTP requests targeting /socket.io/
app.use((req, res, next) => {
  if (req.url.startsWith('/socket.io/')) {
    console.error('Incoming request to Socket.IO endpoint:', req.url);
    return res.status(404).send('Socket.IO endpoint not found');
  }
  next();
});






// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});





// searchProductByIndex()
// httpserver.listen(server.port, server.host, server.message)
const PORT=9006
httpserver.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})















// const { spawn } = require('child_process');

// // Spawn a new process for MongoDB
// const child = spawn('mongo', ['--host', 'certs.crwa1op.mongodb.net', '--username', 'certsManager', '--password', 'REEEEEEEC212112SDSDSD22_', '--authenticationDatabase', 'certsManager']);

// // Handle stdout
// child.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// // Handle stderr
// child.stderr.on('data', (data) => {
//   console.error(`stderr: ${data}`);
// });

// // Handle process exit
// child.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });

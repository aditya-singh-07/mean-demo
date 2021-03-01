const http = require('http');
const debug= require('debug')('node-angular')
const app=require('./backend/app')
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
app.set('port',port);
const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

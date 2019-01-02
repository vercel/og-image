const { createServer } = require('http');
const PORT = 3000;
const handleServer = require('./card');
const handleListen = () => console.log(`Listening on ${PORT}...`);
createServer(handleServer).listen(PORT, handleListen);
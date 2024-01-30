// frontend/server.js

const express = require('express');
const path = require('path');
const app = express();


console.log('server.js is running...');
console.log(`Current directory: ${__dirname}`);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back the index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log(`Frontend listening on ${port}`);

const express = require('express');
const port = +process.argv[2] || 8080;
const app = express();

console.log('Starting server on port: ' + port);

app.get('/', (request, response) => {
    response.end('Hello World!');
});

app.listen(port);

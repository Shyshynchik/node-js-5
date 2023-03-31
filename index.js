const http = require('http');
const { resolveAction } = require('./controller');

const hostname = '172.25.0.2';
const port = 3000;

const server = http.createServer((req, res) => {
    resolveAction(req, res)
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Server running at http://localhost:8080/`);
});


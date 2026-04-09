const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    console.log(`Received ${req.method} request for: ${req.url}`);
    res.write('<h1>Hello! This is Parth.</h1>');
    res.write('<p>This response was sent without using any external frameworks.</p>');
    res.end();
});

server.listen(PORT, () => {
    console.log(`---------------------------------------------`);
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Press Ctrl+C to stop the server.`);
    console.log(`---------------------------------------------`);
});
//creation and initialization of web server using node js
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' })
    res.write("<h1>Hello Friends</h1>")
    res.end();
})
server.listen(3000, () => {
    console.log("server is running at http://localhost:3000")
})
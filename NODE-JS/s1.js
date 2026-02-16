const http = require('http')
const fs = require('fs')
const xml2js = require('xml2js')
const parser = new xml2js.Parser({ explicitArray: false })
const server = http.createServer((req, res) => {
    if (req.url === '/')
    {
        fs.readFile("data.xml", (err, data) => {
            if (err)
            {
                res.writeHead(500, { 'Content-type': 'text/plain' })
                res.end("error in reading the file");
                return;
            }
            parser.parseString(data, (error, result) => {
                if (error)
                {
                    res.writeHead(500, { 'Content-type': 'text/plain' })
                    res.end("error in parsing the data")
                    return;
                }
                const parse = JSON.stringify(result, null, 2)
                res.writeHead(200, { 'Content-type': 'application/json' })
                res.end(parse);
            })
        })
    }
    else {
        res.writeHead(400, { 'Content-type': 'text/plain' })
        res.end();
    }
})
server.listen(3000, () => {
    console.log("server is running at http://localhost:3000")
})
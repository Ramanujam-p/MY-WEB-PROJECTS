const http = require('http');
const fs = require('fs')
const xml2js = require('xml2js')
const parser = new xml2js.Parser();
const a=http.createServer((req, res) => {
    if (req.url === '/')
    {
        fs.readFile("data.xml", (err, data) =>{
            if (err)
            {
                res.writeHead(500, { 'content-type': 'text/plain' })
                res.end("error in reading file")
            }
            parser.parseString(data, (error, result) => {
                if (error)
                {
                    res.writeHead(500, { 'content-type': 'plain/text' })
                    res.end("error in parsing the data")
                }
                const parse = JSON.stringify(result, null, 2);
                res.writeHead(200, { 'content-type': 'application/json' })
                res.end(parse);
            })
        })

    }
    else {
        res.writeHead(400, { 'content-type': 'text/plain' })
        res.end("error")
    }
})
a.listen(3000, () =>
{
    console.log(`server is running on http://localhost:3000`)
})
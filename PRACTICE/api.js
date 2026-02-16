const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end("Server is running");
    }
    if (req.url === '/products' && req.method === 'GET') {

        fs.readFile("data.json",(err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end("Error loading file");
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(data);
        });
    }
    else if (req.url === '/products' && req.method === 'POST') {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const pro = JSON.parse(body);

                if (!pro.id || !pro.name || !pro.price) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    return res.end("Missing fields");
                }

                fs.readFile("data.json",(err, data) => {

                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        return res.end("Error reading file");
                    }

                    const products = JSON.parse(data);

                    products.push(pro);

                    // WRITE AFTER READ COMPLETES
                    fs.writeFile("data.json", JSON.stringify(products, null, 2), err => {

                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            return res.end("Error writing file");
                        }

                        res.writeHead(201, { 'Content-Type': 'text/plain' });
                        return res.end("Successfully added");
                    });

                });

            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                return res.end("Invalid JSON");
            }
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end("Route not found");
    }

});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

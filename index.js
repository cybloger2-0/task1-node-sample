const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");

const PORT = 8080;

const server = http.createServer((req, res) => {
    const filepath = path.join(
        __dirname,
        req.url == "/" ? "index.html" : req.url,
    );
    console.log(filepath);
    fs.readFile(filepath, (error, data) => {
        res.writeHead(500, { "Content-type": "text/html" });
        if (!error) {
            res.write(data);
            res.end();
        } else {
            console.log(error);
            fs.readFile("404.html", "utf-8", (err, errorPage) => {
                console.log(filepath);
                res.end(errorPage);
            });
        }
    });
});

server.listen(PORT, (err) => console.log("listening to port", PORT));

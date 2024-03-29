const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

// Storing the files types for the project
const mimeTypes = {
  html: "text/html",
  css: "text/css",
  js: "text/javascript",
  jpg: "image/jpg",
  jpeg: "image/jpeg",
  png: "image/png"
};

// Creating server
http
  .createServer((req, res) => {
    var uri = url.parse(req.url).pathname;
    var fileName = path.join(process.cwd(), unescape(uri));
    console.log(`Loading ` + uri);
    var stats;

    try {
      stats = fs.lstatSync(fileName);
    } catch (e) {
      res.writeHead(404, { "Content-type": "text/plain" });
      res.write("404 not found\n");
      res.end();
      return;
    }

    if (stats.isFile()) {
      var mimeType =
        mimeTypes[
          path
            .extname(fileName)
            .split(".")
            .reverse()[0]
        ];
      res.writeHead(200, { "Content-type": mimeType });

      var fileStream = fs.createReadStream(fileName);
      fileStream.pipe(res);
    } else if (stats.isDirectory()) {
      res.writeHead(302, { Location: "index.html" });
      res.end();
    } else {
      res.writeHead(200, { "Content-type": "text/plain" });
      res.write("500 Internal Error\n");
      res.end();
    }
  })
  .listen(1337);

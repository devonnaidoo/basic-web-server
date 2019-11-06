const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

// Storing the files types for the project
const fileTypes = {
  html: "text/html",
  css: "text/css",
  js: "text/javascript",
  jpg: "image/jpg",
  jpeg: "image/jpeg",
  png: "image/png"
};

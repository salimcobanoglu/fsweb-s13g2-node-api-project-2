// server için gerekli olanları burada ayarlayın

// posts router'ını buraya require edin ve bağlayın

const express = require("express");
const server = express();

server.get("/", (req, res) => {
  res.send("Server is up and running!!!...");
});

module.exports = server;

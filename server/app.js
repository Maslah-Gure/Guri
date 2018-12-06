const port = process.env.PORT || 3000;
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const express = require("express");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
//My files
const sites = require(path.join(__dirname, "/functions/sites/siteData.js"));
//set
app.set("view engine", "hbs");
//midleware
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../data")));
io.on("connection", socket => {
  console.log("client connected");
  let allSites = sites.fetchSites();
  socket.on("anySites", () => {
    if (allSites.length !== 0) {
      socket.emit("allSavedSites", {
        allSites
      });
    }
  });
  socket.on("addWeb", site => {
    let added = sites.addSite(site);
    if (added) {
      socket.emit("addedSite", {
        site
      });
    } else console.log("site not added");
  });
  socket.on("disconnect", () => {
    console.log("a client disconnected");
  });
});

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});

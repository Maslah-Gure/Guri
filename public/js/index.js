const formSite = document.getElementById("formSite");
formSite.addEventListener("submit", addSite);
//sockets
let socket = io();
window.onload = function() {
  renderSites();
};
socket.on("connect", function() {
  console.log("connected to the server");
});
socket.on("disconnect", function() {
  console.log("disconnected from server");
});
function addSite(e) {
  let webName = document.getElementById("webName").value,
    webUrl = document.getElementById("webUrl").value;
  if (webName !== "" && webUrl !== "") {
    socket.emit("addWeb", {
      webName,
      webUrl
    });
    document.getElementById("webName").value = document.getElementById(
      "webUrl"
    ).value = "";
  }
  socket.on("addedSite", function(addedSite) {
    let saveSpot = document.getElementById("saveSpot");
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `<a href="${addedSite.site.webUrl}">${
      addedSite.site.webName
    }</a>`;
    let deleteDiv = document.createElement("div");
    saveSpot.appendChild(li);
    saveSpot.appendChild(deleteDiv);
  });
  e.preventDefault();
}

function renderSites() {
  socket.emit("anySites");
  socket.on("allSavedSites", function(sites) {
    sites.allSites.forEach(element => {
      let saveSpot = document.getElementById("saveSpot");
      let li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `<a href="${element.webUrl}">${element.webName}</a>`;
      let deleteDiv = document.createElement("div");
      saveSpot.appendChild(li);
      saveSpot.appendChild(deleteDiv);
    });
  });
}

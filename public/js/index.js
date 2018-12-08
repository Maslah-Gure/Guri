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
    console.log("firing");
    let saveSpot = document.getElementById("saveSpot");
    //gernerate the Li
    let li = document.createElement("li");
    li.className = "list-group-item weblink";
    li.innerHTML = `<a href="${addedSite.site.webUrl}">${
      addedSite.site.webName
    }</a>
      <a href=""><i class="fas fa-trash"></i></a>
      `;
    saveSpot.appendChild(li);
  });
  e.preventDefault();
}

function renderSites() {
  console.log("it fired");
  socket.emit("anySites");
  socket.on("allSavedSites", function(sites) {
    sites.allSites.forEach(element => {
      let saveSpot = document.getElementById("saveSpot");
      //gernerate the Li
      let li = document.createElement("li");
      li.className = "list-group-item weblink";
      li.innerHTML = `<a href="${element.webUrl}">${element.webName}</a>
      <a href=""><i class="fas fa-trash"></i></a>
      `;
      saveSpot.appendChild(li);
    });
  });
}
//Deleting the Site
document.querySelector("#saveSpot").addEventListener("click", deleteSite);
function deleteSite(e) {
  if (e.target.classList.contains("fa-trash")) {
    let webName = e.target.parentElement.parentElement.innerText,
      webUrl = e.target.parentElement.parentElement.firstChild.getAttribute(
        "href"
      );
    socket.emit("deleteSite", {
      webName: webName.substring(0, webName.length - 1),
      webUrl
    });
    socket.on("siteRemoved", () => {
      e.target.parentElement.parentElement.remove();
    });
  }
  e.preventDefault();
}

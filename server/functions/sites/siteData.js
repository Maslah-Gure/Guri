const path = require("path");
const fs = require("fs");

function saveSites(sites) {
  fs.writeFileSync(path.join("./sites.json"), JSON.stringify(sites));
}
function fetchSites() {
  try {
    return JSON.parse(fs.readFileSync(path.join("./sites.json")));
  } catch {
    return [];
  }
}
function addSite(site) {
  let sites = fetchSites();
  let duplicate = sites.filter(element => element.webName === site.webName);
  if (duplicate.length === 0) {
    sites.push(site);
    saveSites(sites);
    return site;
  } else return false;
}
function removeSite(site, callback) {
  sites = fetchSites();
  sites.forEach((element, index) => {
    if (element.webName === site.webName) {
      sites.splice(index, 1);
      saveSites(sites);
      callback(true);
    }
  });
}
module.exports = {
  saveSites,
  fetchSites,
  addSite,
  removeSite
};

///app/data/sites.json

const path = require("path");
const fs = require("fs");

function saveSites(sites) {
  fs.writeFileSync(path.join("data/sites.json"), JSON.stringify(sites));
}
function fetchSites() {
  try {
    return JSON.parse(fs.readFileSync(path.join("data/sites.json")));
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
function test(a, b) {
  return a + b;
}
module.exports = {
  saveSites,
  fetchSites,
  addSite,
  test
};

///app/data/sites.json
// __dirname, "../../../data/sites.json")

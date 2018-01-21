const fs = require('fs');
const packageJSON = JSON.parse(fs.readFileSync("./package.json"));
const dtsPackageJSON = JSON.parse(fs.readFileSync("./d.ts/package.json"));
dtsPackageJSON.version = packageJSON.version;
fs.writeFileSync("./d.ts/package.json", JSON.stringify(dtsPackageJSON, null, "  "));
console.log("version: " + dtsPackageJSON.version);
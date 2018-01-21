const fs = require("fs");
const rootDir = "./src";
const tsconfig = JSON.parse(fs.readFileSync("./tsconfig.json"));
tsconfig.compilerOptions.paths = {};
fs.readdirSync(rootDir).forEach((dirName) => {
    const dirPath = `${rootDir}/${dirName}`;
    if (fs.statSync(dirPath).isDirectory()) {
        tsconfig.compilerOptions.paths[`@${dirName}*`] = [
            dirPath + "*",
            dirPath
        ];
    }
});
const json = JSON.stringify(tsconfig, null, 2);
console.log("paths updated");
fs.writeFileSync("./tsconfig.json", json);
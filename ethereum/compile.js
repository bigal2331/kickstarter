const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
//delete build directory
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");

const source = fs.readFileSync(campaignPath, "utf8");

const output = solc.compile(source, 1).contracts;

//recreate build directory
fs.ensureDirSync(buildPath);

for (let contract in output) {
  //outputJsonSync(path, data)
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}

const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const isIp = require('is-ip');
const fileStream = fs.createReadStream('CWA.txt');


const readConfig = (input, tunnelConfig) => {
    const rl = readline.createInterface({ input });
    const line_counter = ((i = 0) => () => ++i)();
    rl.on("line", (line, lineno = line_counter()) => {

    });
    const results = new Promise(ikevResults => {
        rl.on("close", () => {
            result = {};
            for (let tunnelGroupHash of tunnelConfig) {
                for (let ipaddress in tunnelGroupHash) {
                    if (!(ipaddress in result)) {
                        result[ipaddress] = [];
                        console.log(result);
                        process.exit(0);
                    }
                    result[ipaddress].push(tunnelGroupHash[ipaddress]);
                }
            }
            return ikevResults(result);
        })
    });
    return results
};


const startBuilding = async (file) => {
    const input = fs.createReadStream(file);
    const tunnelConfig = [];
    const results = await readConfig(input, tunnelConfig);
    console.log(results);
};
startBuilding("./CWA.txt")

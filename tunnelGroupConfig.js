const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const isIp = require('is-ip');
const readConfig = (input, tunnelConfig) => {
    const rl = readline.createInterface({ input });
    const line_counter = ((i = 0) => () => ++i)();
    let ikev1Line = 1;
    let ikev2Line_1 = 1;
    let ikev2Line_2;
    let currentIp;
    let result;
    rl.on("line", (lineText, currentLineNumber = line_counter()) => {
        /* First we  want to make sure that there is only one space between words and no spaces before first
        or after last one in any given line
        */
        lineText = lineText.replace(/^\s+|\s+$/g, "");
        /* We use regex (/\s+/) to split on one or more spaces, When just splitting on (" ") it will break and not properly
        split if there is more then one space between the commands 
        */
        const splitLineText = lineText.split(/\s+/);
        /* Using object deconstructing we can avoid the need for having to use an index position 
        as well as declaring our consts at the same time for the values we want to access.
        */
        const [,ipAddress,] = splitLineText;
        const includesValidIP = isIp(ipAddress);
        if (lineText.includes("ipsec-attributes") && includesValidIP) {
            currentIp = ipAddress;
            ikev1Line = currentLineNumber + 1;
            ikev2Line_1 = currentLineNumber + 1;
            ikev2Line_2 = ikev2Line_1 + 1;
        }
        if (lineText.includes("ikev1") && currentLineNumber == ikev1Line) {
            const [, authenticationType, preSharedKey] = splitLineText;
            const ikevJson = buildIkevJson(tunnelConfig, currentIp, authenticationType, preSharedKey);
            // tunnelConfig.push(ikevJson);
        } 
        if (lineText.includes("ikev2") && currentLineNumber == ikev2Line_1 ||  lineText.includes("ikev2") && currentLineNumber == ikev2Line_2) {
            const [, authenticationType, , preSharedKey] = splitLineText;
            const ikevJson = buildIkevJson(tunnelConfig, currentIp, authenticationType, preSharedKey);
            //   tunnelConfig.push(ikevJson)
        }
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
}
const buildIkevJson = (tunnelConfig, currentIp, authenticationType, preSharedKey) => {
    const ikevJson = {
        [currentIp]: {
            [authenticationType]: preSharedKey
        }
    };
    tunnelConfig.push(ikevJson);
    return tunnelConfig
};
const startBuilding = async (file) => {
    const input = fs.createReadStream(file);
    const tunnelConfig = [];
    const results = await readConfig(input, tunnelConfig);
    console.log(results);
};
startBuilding("./CWA.txt")


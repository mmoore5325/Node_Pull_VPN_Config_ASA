const fs = require('fs');
const readline = require('readline');
const fileStream = fs.createReadStream('CWA.txt');
const map = []
const vpnmap = { 'crypto map': {} }
const vpnTunnelGroup = {};

const cryptoMapConfig = async () => {
    const readCryptoMap = readline.createInterface({
        input: fileStream
    });

    for await (const line of readCryptoMap) {
        if (line.includes("crypto map")) {
            const cryptomap = line.split(" ");
            const cryptomapName = cryptomap[2];
            const cryptomapNumber = cryptomap[3];
            let cryptoCommand = cryptomap[4];
            let cryptoVariable = cryptomap[5];
            // const cryptoVariable2 = cryptomap[6];
            if (cryptoCommand == "match") {
                cryptoCommand = "match address";
                cryptoVariable = cryptomap[6];
                // cryptomap.pop;
            } else if (cryptoCommand == "set" && cryptoVariable == "peer") {
                cryptoCommand = "set peer";
                cryptoVariable = cryptomap[6];
            } else if (cryptoCommand == "set" && cryptoVariable == "ikev1") {
                cryptoCommand = "set ikev1 transform-set";
                cryptoVariable = cryptomap[7];
            } else if (cryptoCommand == "set" && cryptoVariable == "ikev2") {
                cryptoCommand = "set ikev2 ipsec-proposal";
                cryptoVariable = cryptomap[7];
            } else if (cryptoCommand == "set" && cryptoVariable == "security-association") {
                cryptoCommand = "set security-association lifetime";
                cryptoVariable = cryptomap[7];
            } else if (cryptoCommand == "set" && cryptoVariable == "pfs") {
                cryptoCommand;
                cryptoVariable;
            }
            const thejson = {
                "crypto map": {
                    [cryptomapName]: {
                        [cryptomapNumber]: {
                            [cryptoCommand]: cryptoVariable
                        }
                    }
                }
            };
            console.log(JSON.stringify(thejson));
        }
    }
}

// cryptoMapConfig();

const validateIpAddress = (ipaddress) => {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return true
    }
    return false
}

const tunnelGroupConfig = async () => {
    var regex = new RegExp(/^(?=.*[^\.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){4}$/g);
    const readCryptoMap = readline.createInterface({
        input: fileStream
    });
    for await (const line of readCryptoMap) {
        if (line.includes("tunnel-group") && (regex.test(line.split(" ")[1]))) {
            console.log(line);
        } else {
            // console.log(line.split(" ")[6])
        }
    };
};

tunnelGroupConfig();


























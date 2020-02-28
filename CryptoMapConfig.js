const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const fileStream = fs.createReadStream('CWA.txt');
const map = []
const vpnmap = { 'crypto map': {} }
const vpnTunnelGroup = {};
const cryptoMapConfig = async () => {
    const readCryptoMap = readline.createInterface({
        input: fileStream
    });
    for await (let line of readCryptoMap) {
        if (line.includes("crypto map")) {
            line = line.replace(/^\s+|\s+$/g, "");
            const cryptomap = line.split(/\s+/);
            const [,,cryptomapName,cryptomapNumber] = line.split(/\s+/);
            let [,,,,cryptoCommand,cryptoVariable,cryptoVariable2,encryptionMethod] = line.split(/\s+/);
            const isSetCommand = cryptoCommand == "set"
            if (cryptoCommand == "match") {
                cryptoCommand = "match address";
                cryptoVariable = cryptoVariable2;
            };
            if (isSetCommand && cryptoVariable == "peer") {
                cryptoCommand = "set peer";
                cryptoVariable = cryptoVariable2;
            } else if (isSetCommand && cryptoVariable == "ikev1") {
                cryptoCommand = "set ikev1 transform-set";
                cryptoVariable = encryptionMethod;
            } else if (isSetCommand && cryptoVariable == "ikev2") {
                cryptoCommand = "set ikev2 ipsec-proposal";
                cryptoVariable = encryptionMethod;
            } else if (isSetCommand && cryptoVariable == "security-association") {
                cryptoCommand = "set security-association lifetime";
                cryptoVariable = encryptionMethod;
            } else if (isSetCommand && cryptoVariable == "pfs") {
                cryptoCommand = "set";
                cryptoVariable = "pfs";
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
    console.log('The file has been saved!');
}
cryptoMapConfig()



const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const isIp = require('is-ip');

function readLines(input) {
    const output = new stream.PassThrough({ objectMode: true });
    const rl = readline.createInterface({ input });
    const line_counter = ((i = 0) => () => ++i)();
    var ikev1line = 0;
    rl.on("line", (line, lineno = line_counter()) => {
        const ip = line.split(" ")[1]
        const checkip = isIp(ip)
        if (line.includes("ipsec-attributes") && checkip) {
         ikev1line=lineno+1;        
        }
        if (lineno == ikev1line) {
            if (line.includes('ikev1')){
                var ikev1psk = line.split(" ");
                console.log(ikev1psk[3]);
            }
        }
    });
    rl.on("close", () => {
        output.push(null);
    });
    return output;
}
const input = fs.createReadStream("./CWA.txt");
(async () => {
    let hey = []
    for await (const line of readLines(input)) {
    }
})();
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const fileStream = fs.createReadStream('CWA.txt');
const map = []

// This code rights crypto map to file perfectly.
//
// const readit = async () => {
//     const rl = readline.createInterface({
//         input: fileStream
//       });
//       for await (const line of rl) { 
//           if (line.includes("crypto map")){
//             fs.appendFileSync('cryptomap.txt', line + "\n", (err) => {
//                 if (err) throw err;
//                 console.log('error thrown');
//             });
//           }
//       }   
//       console.log('The file has been saved!');
// }
// readit();\
// function cryptoSetOrMatch{
//     if(cryptoCommand=="match"){
//         cryptoCommand="match address";
//     };
// }
const vpnmap = {'crypto map': {}}
const vpnTunnelGroup = {};

const cryptoMapConfig = async () => {
    const readCryptoMap = readline.createInterface({
        input: fileStream
      });
      for await (const line of readCryptoMap) { 
          if (line.includes("crypto map")){
            var cryptomap  = line.split(" ");
            var cryptomapName = cryptomap[2];
            var cryptomapNumber = cryptomap[3];
            var cryptoCommand = cryptomap[4];
            var cryptoVariable = cryptomap[5];
            var cryptoVariable2 = cryptomap[6];
            // var crypto
            if(cryptoCommand=="match"){
                cryptoCommand = "match address";
                cryptoVariable = cryptomap[6];
                cryptomap.pop;
            }else if(cryptoCommand=="set" && cryptoVariable=="peer"){
                cryptoCommand = "set peer";
                cryptoVariable = cryptomap[6];
            }else if(cryptoCommand=="set" && cryptoVariable=="ikev1"){
                cryptoCommand = "set ikev1 transform-set";
                cryptoVariable = cryptomap[7];
            }else if(cryptoCommand=="set" && cryptoVariable=="ikev2"){
                cryptoCommand = "set ikev2 ipsec-proposal";
                cryptoVariable = cryptomap[7];
            }else if(cryptoCommand=="set" && cryptoVariable=="security-association"){
                cryptoCommand = "set security-association lifetime";
                cryptoVariable = cryptomap[7];
            }else if(cryptoCommand== "set" && cryptoVariable=="pfs"){
                cryptoCommand="set";
                cryptoVariable="pfs";
            }
            const thejson = {"crypto map": {
                [cryptomapName]:{
                    [cryptomapNumber]: {
                        [cryptoCommand]: cryptoVariable
                    }
                }
            }
        };
            // console.log(cryptoVariable2)
            console.log(JSON.stringify(thejson));
          }
      }   
      console.log('The file has been saved!');
}
// function cryptoJson 

// cryptoMapConfig();

// const runit = async () => {
//   const readit = await readit()  
//   cryptoJson
// }
function ValidateIPaddress(ipaddress) {  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
      return (true)  
    }  
    alert("You have entered an invalid IP address!")  
    return (false)  
  }  

tempArray = []
i=0;
const tunnelGroupConfig = async () => {
    var regex = new RegExp(/^(?=.*[^\.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){4}$/g);
    const readCryptoMap = readline.createInterface({
        input: fileStream
    });
    for await (const line of readCryptoMap) {
        if (line.includes("tunnel-group") && (regex.test(line.split(" ")[1]))) {
            temp = line.split(" ");
            tempArray[i] = temp[1];
            console.log(tempArray);
        } else {
            // console.log(line.split(" ")[6])
        }
    };
};


    tunnelGroupConfig();

          






































// Read File 
// var data 
// try {  
//     data = fs.readFileSync('CWA.txt', 'utf8');
//     // console.log(data.toString());    
// } catch(e) {
//     console.log('Error:', e.stack);
// }
// console.log(data);
// var cryptoMap = [];
// const readInterface = readline.createInterface({
//     input: fs.createReadStream('./CWA.txt'),
//     output: process.stdout,
//     console: false
// });
/*
readInterface.on('line', function(line){
//    var x = line;
    if(line.includes("crypto map")){
        cryptoMap.push(line)
        // console.log(line);
    }
    // console.log(typeof x);
    // console.log(line);
});
console.log(cryptoMap);
*/

// var last = data;

// process.stdin.on('data', function(chunk) {
//     var lines, i;

//     lines = (last+chunk).split("\n");
//     for(const indvLine of lines) {
//         // console.log("line: " + indvLine);
//         if(indvLine.includes("crypto map")){
//             cryptoMap.push(indvLine);
//             fs.appendFile('file.txt', indvLine, (err) => {
//                 if (err) throw err;
//                 console.log('The file has been saved!');
//               });
//         };
//         // console.log(cryptoMap);
//     }
// });

// process.stdin.on('end', function() {

//     process.exit(0)
// });

// process.stdin.resume();
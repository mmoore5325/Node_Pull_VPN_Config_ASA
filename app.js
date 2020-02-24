const fs = require('fs');
const readline = require('readline');
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
const readit = async () => {
    const rl = readline.createInterface({
        input: fileStream
      });
      for await (const line of rl) { 
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
                cryptoVariable = cryptomap[8];
            }else if(cryptoCommand=="set" && cryptoVariable=="security-association" && cryptoVariable2=="lifetime"){
                cryptoCommand = "set security-association lifetime";
                cryptoVariable = cryptomap[8];
            }
            const thejson = {"crypto map": {
                cryptomapName:{
                    cryptomapNumber: {
                        cryptoCommand: cryptoVariable
                    }
                }
            }
        };
            console.log(cryptoCommand);
          }
      }   
      console.log('The file has been saved!');
}
readit();











































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
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const isIp = require('is-ip');



const readConfig = (input, objectConfig) => {
    const rl = readline.createInterface({ input });
    const line_counter = ((i = 0) => () => ++i)();
    let objectName;
    let objectLine = 0;
    let objectLine2 = 0;
    let objectmapJson 
    rl.on("line", (line, lineNum = line_counter()) => {
        //Remove space from begin and end of lines, split lines into array.
        line = line.replace(/^\s+|\s+$/g, "");
        const splitLineText = line.split(/\s+/);
        if(line.includes("object network") || line.includes("object-group") && splitLineText[0] == "object-group"){
            objectLine = lineNum + 1;
            objectName = splitLineText[2];
         
        }
        if(lineNum == objectLine){
            if(splitLineText[0]=="subnet" || splitLineText[0]=="host"){
                networkType = splitLineText[0];
                if(splitLineText[0]=="host"){
                    ipAddress=splitLineText[1];
                }else if(splitLineText[0]=="subnet" && isIp(splitLineText[1])){
                    ipAddress=splitLineText[1] + " " + splitLineText[2];
                }
                objectJson = {
                    [objectName]:
                    {
                        [networkType]: ipAddress
                    }
                }
                objectConfig.push(objectJson);
            }
            if(splitLineText[0]== "network-object" || splitLineText[0]=="group-object"){
                objectLine = lineNum + 1;
                // const 
                if(splitLineText)
                if(splitLineText[0]=="network-object" && isIp(splitLineText[1])){
                    groupObjectKey = splitLineText[0];
                    groupObjectVariable=splitLineText[1] + " " + splitLineText[2];
                }else if(splitLineText[0]=="group-object"){
                    groupObjectKey = splitLineText[0];
                    groupObjectVariable=splitLineText[1];
                }else if(splitLineText[1]=="object"){
                    groupObjectKey = "network-object object";
                    groupObjectVariable=splitLineText[2];
                }
                groupObjectJson =  {
                    [objectName]:
                        {  
                           "object-group":
                            {
                               [groupObjectKey]: groupObjectVariable,
                            }
                        }
                    }
                    objectConfig.push(groupObjectJson);
            }
        }

    });
    const results = new Promise(objectResults => {
        rl.on("close", () => {
            result = {};
            for (let objectGroupHash of objectConfig) {
                for (let ipaddress in objectGroupHash) {
                    if (!(ipaddress in result)) {
                        result[ipaddress] = [];
                    }
                    result[ipaddress].push(objectGroupHash[ipaddress]);
                }
            }
            return objectResults(result);
        })
    });
    return results;
};

const startBuilding = async (file) => {
    const input = fs.createReadStream(file);
    const tunnelConfig = [];
    const results = await readConfig(input, tunnelConfig);
    result = {};
    let boom =  Object.keys(results)
    console.log(results)
    boom.forEach(element => {
        // console.log(results[element])
        result = {};
        for (let tunnelGroupHash of results[element]) {
            
            for (let ipaddress in tunnelGroupHash) {
                if (!(ipaddress in result)) {
                    result[ipaddress] = [];
                }
                result[ipaddress].push(tunnelGroupHash[ipaddress]);
            }
        }
        // console.log(result)
    });
};
startBuilding("./CWA.txt")

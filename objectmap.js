const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const isIp = require('is-ip');



const readConfig = (input, tunnelConfig) => {
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
                    // console.log(ipAddress);
                }
                objectJson = {
                    [objectName]:
                    {
                        [networkType]: ipAddress
                    }
                }
                // console.log(objectJson);
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
                    groupObjectKey = splitLineText[0];
                    groupObjectVariable=splitLineText[2];
                }
                groupObjectJson =  {
                    [objectName]:
                        {  
                           "object-group":
                            {
                               [groupObjectKey]: groupObjectVariable,
                                // "group-object":[
                                // {
                                //     "CAULT-L2L-DST":
                                //      {[   
                                //         "network-object": "192.168.26.0 255.255.255.0",
                                //     ]},
                                //     "REMOTE_TEST_NETWORK":
                                //     {   
                                //         "network-object": "192.168.1.0 255.255.255.0",
                                //         "network-object": "192.168.125.0 255.255.255.0",
                                //         "network-object": "192.168.254.0 255.255.255.0"
                                //     }

                                // }]
                            }
                        }
                    }
        
                    console.log(groupObjectJson)
            }
            if(splitLineText[0]=="group-object"){
                //Find data of network object splitLineText[1];
                //splitLineText[1] should be the key with the IP being the value of
                // a previously created hash.
               
                // console.log(line);
                // console.log(splitLineText[1])
            }
        }

    });
};

const startBuilding = async (file) => {
    const input = fs.createReadStream(file);
    const tunnelConfig = [];
    const results = await readConfig(input, tunnelConfig);
    // console.log(results);
};
startBuilding("./CWA.txt")

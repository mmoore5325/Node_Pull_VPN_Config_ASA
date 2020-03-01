/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */


const fs = require('fs');
const readline = require('readline');
const isIp = require('is-ip');

const readConfig = (input, tunnelConfig) => {
  const rl = readline.createInterface({ input });

  const lineCounter = ((i = 0) => () => i++)();
  let objectName;
  let objectLine = 0;

  rl.on('line', (line, lineNum = lineCounter()) => {
    // Remove space from begin and end of lines
    const formattedLine = line.replace(/^\s+|\s+$/g, '');
    const splitLineText = formattedLine.split(/\s+/);
    const [networkType] = splitLineText;
    let [, ipAddress] = splitLineText;
    let groupObjectKey;
    let groupObjectVariable;
    if (
      line.includes('object network')
      || (line.includes('object-group') && networkType === 'object-group')
    ) {
      objectLine = lineNum + 1;
      [, , objectName] = splitLineText;
    }

    if (lineNum === objectLine) {
      if (networkType === 'subnet' || splitLineText[0] === 'host') {
        if (splitLineText[0] === 'subnet' && isIp(ipAddress)) {
          const [, ip1, ip2] = splitLineText;
          ipAddress = `${ip1} ${ip2}`;
        }

        const objectJson = {
          [objectName]: {
            [networkType]: ipAddress,
          },
        };
        tunnelConfig.push(objectJson);
      }

      if (networkType === 'network-object' || networkType === 'group-object') {
        objectLine = lineNum + 1;
        [groupObjectKey, groupObjectVariable] = splitLineText;

        if (networkType === 'network-object' && isIp(ipAddress)) {
          const [, ip1, ip2] = splitLineText;
          groupObjectVariable = `${ip1} ${ip2}`;
        } else if (networkType === 'group-object') {
          [, groupObjectVariable] = splitLineText;
        } else if (splitLineText[1] === 'object') {
          [groupObjectKey, , groupObjectVariable] = splitLineText;
        }

        const groupObjectJson = {
          [objectName]: {
            'object-group': {
              [groupObjectKey]: groupObjectVariable,
            },
          },
        };
        tunnelConfig.push(groupObjectJson);
      }
    }
  });

  const results = new Promise((ikevResults) => {
    rl.on('close', () => {
      const result = {};

      for (const tunnelGroupHash of tunnelConfig) {
        for (const ipaddress in tunnelGroupHash) {
          if (!(ipaddress in result)) {
            result[ipaddress] = [];
          }
          result[ipaddress].push(tunnelGroupHash[ipaddress]);
        }
      }
      return ikevResults(result);
    });
  });
  return results;
};

const cleanup = (results) => {
  const cleanedResults = [];
  const keys = Object.keys(results);
  keys.forEach((element) => {
    const result = {};
    results[element].forEach((tunnelGroupHash) => {
      for (const ipaddress in tunnelGroupHash) {
        if (!(ipaddress in result)) {
          result[ipaddress] = [];
        }
        result[ipaddress].push(tunnelGroupHash[ipaddress]);
      }
    });
    const newResult = { [element]: result };
    cleanedResults.push(newResult);
  });
  return cleanedResults;
};

const startBuilding = async (file) => {
  const input = fs.createReadStream(file);
  const tunnelConfig = [];
  const results = await readConfig(input, tunnelConfig);
  const cleanedResults = cleanup(results);
  console.log(JSON.stringify(cleanedResults, null, 2));
};
startBuilding('./CWA.txt');

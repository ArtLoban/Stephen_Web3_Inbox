const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

// console.log(output);
// return false;

module.exports.interface = output.contracts['Inbox.sol']['Inbox'].abi;
module.exports.bytecode = output.contracts['Inbox.sol']['Inbox'].evm.bytecode.object;

// module.exports = output.contracts['Inbox.sol'].Inbox;

// module.exports = solc.compile(source, 1).contracts[':Inbox'];

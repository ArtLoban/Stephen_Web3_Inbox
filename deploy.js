const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider({
  mnemonic: 'soup ranch crop square fat buddy throw cluster change elegant wheel curtain',
  providerOrUrl: 'https://rinkeby.infura.io/v3/7c8b60c92b9a46588473751160780ff6',
});

const web3 = new Web3(provider);

/* Create function to be able to use async await feature, life easier */
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account: ', accounts[0]);

  // const result = await new web3.eth.Contract(JSON.parse(interface))
  // .deploy({ data: bytecode, arguments: ['Hi there from Art!'] })
  // .send({ from: accounts[0], gas: '20000000' });

  const contract = await new web3.eth.Contract(JSON.parse(interface));
  const deployTx = contract.deploy({ data: bytecode, arguments: ['Hi there from Art!'] });
  const estimatedGas = await deployTx.estimateGas();
  console.log('Estimated Gas: ', estimatedGas);
  const deployedContract = await deployTx.send({ from: accounts[0], gas: estimatedGas });

  console.log('Contract deployed to (Address): ', deployedContract.options.address);
  // Contract deployed to (Address):  0x4afF1912376eE4F3c70BEfB759afb0AB3b8a35cB

  provider.engine.stop();
};

deploy();
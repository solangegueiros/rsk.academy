const fs = require('fs');
const path = require('path');

const HDWalletProvider = require('@truffle/hdwallet-provider');

// adjust these as fit to get faster transaction speeds
// minimum value is 1.0, adjust higher to incentivise miners
const TESTNET_GAS_MULT = 1.1;
const MAINNET_GAS_MULT = 1.0;

const testnetPrivateKeys = process.env.RSK_TESTNET_PRIVATE_KEY || ['']
const mainnetPrivateKeys = [process.env.RSK_MAINNET_PRIVATE_KEY] || [''];

const gasPriceTestnetRaw = fs
  .readFileSync('.testnet.gas-price.json')
  .toString()
  .trim();
const gasPriceTestnet = parseInt(JSON.parse(gasPriceTestnetRaw).result, 16);
if (typeof gasPriceTestnet !== 'number' || isNaN(gasPriceTestnet)) {
  throw new Error('unable to retrieve testnet gas price from .testnet.gas-price.json');
}

const gasPriceMainnetRaw = fs
  .readFileSync('.mainnet.gas-price.json')
  .toString()
  .trim();
const gasPriceMainnet = parseInt(JSON.parse(gasPriceMainnetRaw).result, 16);
if (typeof gasPriceMainnet !== 'number' || isNaN(gasPriceMainnet)) {
  throw new Error('unable to retrieve mainnet gas price from .mainnet.gas-price.json');
}

module.exports = {
  networks: {
    regtest: {
      host: '127.0.0.1',
      port: 4444,
      network_id: 33,
      networkCheckTimeout: 1e3,
    },
    testnet: {
      provider: () => new HDWalletProvider(
        testnetPrivateKeys,
        'https://public-node.testnet.rsk.co/2.1.0/',
      ),
      // Ref: http://developers.rsk.co/rsk/architecture/account-based/#chainid
      network_id: 31,
      gasPrice: Math.floor(gasPriceMainnet * TESTNET_GAS_MULT),
      networkCheckTimeout: 1e6,
    },
    localtestnet: {
      provider: () => new HDWalletProvider(
        mnemonic,
        'http://localhost:7777/',
      ),
      network_id: 31,
      gasPrice: Math.floor(gasPriceTestnet * TESTNET_GAS_MULT),
      networkCheckTimeout: 10e3,
    },
    mainnet: {
      // NOTE that this configuration is a template.
      // You should modify it according to your needs and security requirements.
      provider: () => new HDWalletProvider(
        mainnetPrivateKeys,
        'https://public-node.rsk.co/2.1.0/',
      ),
      // Ref: http://developers.rsk.co/rsk/architecture/account-based/#chainid
      network_id: 30,
      gasPrice: Math.floor(gasPriceMainnet * MAINNET_GAS_MULT),
      networkCheckTimeout: 1e6,
    },
    localmainnet: {
      // NOTE that this configuration is a template.
      // You should modify it according to your needs and security requirements.
      provider: () => new HDWalletProvider(
        mainnetPrivateKeys,
        'http://localhost:8888/',
      ),
      // Ref: http://developers.rsk.co/rsk/architecture/account-based/#chainid
      network_id: 30,
      gasPrice: Math.floor(gasPriceMainnet * MAINNET_GAS_MULT),
      networkCheckTimeout: 1e6,
    },
  },
  compilers: {
    solc: {
      version: '0.5.7',
    }
  },
  contracts_build_directory: path.join(__dirname, 'client/contracts'),
}

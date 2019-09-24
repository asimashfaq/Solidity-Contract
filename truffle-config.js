require("ts-node/register");
require('dotenv').config();
module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {

     development: {
      host: "192.168.1.18",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "5777",       // Any network (default: none)
     },

  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    useColors: true,
    reporter: 'mocha-multi-reporters',
    reporterOptions: {
      configFile: './mocha-smart-contracts-config.json',
    },
  },
  test_file_extension_regexp: /.*\.ts$/,

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.9"
    }
  }
}

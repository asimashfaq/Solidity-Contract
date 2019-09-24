import Web3  from "web3"
import EthCrypto, { Encrypted } from 'eth-crypto';

// Private key of the alice
const alicePrivkey = "0x9954f7586449616787f13492ea1cccd3c82c94313c093454190d3512b597b529"
// Host to connect to the eth netowrk
const NEWTORKHOST = "http://192.168.1.18:7545"
// Initalize the web3
const provider =  new Web3.providers.HttpProvider(NEWTORKHOST);
const web3 = new Web3(provider)

// Loading the application.json for the smart contract to get abi and address generated on the runtime.
// we can add address manually.
// This technique will automatically get the updated deployed address and abi.
const contractJson = require(`${__dirname}/../../build/contracts/Application.json`)
 const {abi,networks} = contractJson; 
 // 5777 is the network id define in the truffle-config.js
 const {address} = networks["5777"]
 // we create the default instance 
 const contractInstance = new web3.eth.Contract(abi,address)

const  DecryptScreateMessage = async (message:Encrypted)=>{
    const promise = await EthCrypto.decryptWithPrivateKey(
        alicePrivkey,
        message
    )
    return promise
}

 const run  = async ()=>{
     // Read the message from the contract
     var response = await  contractInstance.methods.getMessage().call()
     // need to parse the response from string to json
     var message = await DecryptScreateMessage(JSON.parse(response))
     // Print the message
     console.log(message)
}

// calling the function
run()
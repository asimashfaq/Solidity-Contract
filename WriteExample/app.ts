import Web3  from "web3"
import EthCrypto from 'eth-crypto';
// Sample message to encrypt and send message
const message = "ThisIsSampleProject";
// Public key of the alice
const alicePubkey = "03909e36178141697996fe67ceaec0833c760ae7d000171fb2d3f9885ba0fb803d"
const senderAddress = "0xdEDC8fa9Cb9B7BCbeB5190b2D0aA7302232142Cb"
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

const  GenerateSecreateMessage = async (message:string)=>{
    const promise = await EthCrypto.encryptWithPublicKey(
        alicePubkey,
        message
    )
    return promise
}

 const run  = async (_message:string)=>{
     // Now need to send this message to the contract
     const secreatMessage = JSON.stringify(await GenerateSecreateMessage(_message))
     const gas = await contractInstance.methods.setMessage(secreatMessage).estimateGas({from:senderAddress})
     var response = await  contractInstance.methods.setMessage(secreatMessage).send({from:senderAddress,"gas":gas})
     // Printing the response
     console.log(response)
}

// calling the function
run(message)
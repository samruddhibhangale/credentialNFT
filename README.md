# credentialNFT
CredentialNFT is a smart contract that tokenizes credentials as non-fungible tokens (NFTs) and stores the NFT metadata on IPFS. 
This project provides a sample implementation of the CredentialNFT contract using the Hardhat development environment.

Deployment
To deploy the CredentialNFT contract to the Goerli testnet, you will need to have an Ethereum wallet with some test Ether. You can get test Ether from a Goerli testnet faucet, such as https://faucet.goerli.mudit.blog/.

1. Clone the repository and install the required dependencies:
- git clone https://github.com/samruddhibhangale/credentialNFT.git
- cd CredentialNFT
- npm install

2. Create a new file named .env in the project root directory, and add your Ethereum wallet private key as follows:
- PRIVATE_KEY="your_private_key_here"

3. Compile the CredentialNFT contract:
- npx hardhat compile

4. Deploy the contract to the Goerli testnet:\
- npx hardhat run scripts/deploy.js --network goerli

Testing

The CredentialNFT project comes with a set of test cases that can be run using Hardhat.

Ensure that you have an IPFS daemon running locally on your computer. You can download and install IPFS from the official website: https://docs.ipfs.io/install/

Start the IPFS daemon by running the following command:
- ipfs daemon

Run the test cases:
- npx hardhat test

Interacting with the contract -

You can interact with the CredentialNFT contract using the Hardhat console or by writing custom scripts that use the contract's ABI. To open the Hardhat console, run the following command:

- npx hardhat console --network goerli

This will open the Hardhat console with the CredentialNFT contract instance available as the contract variable. You can use this variable to interact with the contract, for example:

- const credential = await contract.mintCredentialNFT("Pringles", "Bachelor's Degree in Computer Science", "2023-04-19", "https://gateway.ipfs.io/ipfs/Qm...")
This will mint a new NFT for Pringles's Bachelor's Degree in Computer Science with a date of April 19th, 2023 and the IPFS hash of the NFT metadata.


Assumptions-
- The contract is based on the ERC721 standard, which allows for the creation of non-fungible tokens (NFTs) that represent unique assets.
- The NFTs created by this contract represent credentials and include metadata stored on IPFS.
- The metadata includes information about the issuer, recipient, and the type of credential, as well as a hash of the actual credential data stored off-chain.
- The contract includes functions for minting new NFTs and retrieving their metadata.
- The metadata is stored on IPFS, which requires the use of an IPFS client library and a running IPFS node.

